resource "google_compute_instance" "app_vm" {
  name         = var.instance_name
  machine_type = var.machine_type
  zone         = var.instance_zone

  metadata = {
    ssh-keys = <<EOF
      ${var.ssh_user}:${file(var.ssh_pub_path)}
    EOF
  }

  boot_disk {
    initialize_params {
        size  = var.boot_disk_size
        image = var.instance_image
    }
  }

  network_interface {
    network    = "default"
    subnetwork = "default"
    access_config {
      nat_ip = var.external_ip // Ephemeral IP
    }
  }

  tags = var.network_tags

  metadata_startup_script = <<-EOF
    #!/bin/bash
    # Install Docker
    sudo apt-get update
    sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -
    add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
    sudo apt-get update
    sudo apt-get install -y docker-ce docker-ce-cli containerd.io

    # Install Docker Compose
    sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    sudo usermod -a -G docker $USER
    sudo chmod 666 /var/run/docker.sock

    # Prepare cert infrastructure
    sudo mkdir -p /etc/letsencrypt/live/combatlosses.com/
    sudo chmod 777 /etc/letsencrypt/live/combatlosses.com/

    # Prepare directories
    sudo mkdir -p /home/app
    sudo mkdir -p /home/app/configs/backend/statshub/docker
    sudo mkdir -p /home/app/configs/backend/statshub/initdb.d
    sudo mkdir -p /home/app/configs/frontend/docker

    # Read, Write, and Execute Permissions
    sudo chmod 777 /home/app/configs/backend/statshub/docker
    sudo chmod 777 /home/app/configs/backend/statshub/initdb.d
    sudo chmod 777 /home/app/configs/frontend/docker

    # Setting up app directory
    cat <<'EOF2' > /home/app/docker-compose.yml
    ${file("${path.module}/../docker-compose.yml")}
    EOF2

    cat <<'EOF3' > /home/app/nginx.conf
    ${file("${path.module}/../nginx.conf")}
    EOF3

    cat <<'EOF4' > /home/app/configs/backend/statshub/initdb.d/setup.sql
    ${file("${path.module}/../configs/backend/statshub/initdb.d/setup.sql")}
    EOF4

    cat <<'EOF5' > /etc/cron.daily
    #!/bin/bash
    docker system prune -af  --filter "until=$((1*24))h"
    EOF5

    sudo chmod +x /etc/cron.daily/docker-prune
  EOF

  service_account {
    scopes = ["https://www.googleapis.com/auth/cloud-platform"]
  }
}


// Optionally, include HTTPS and health check firewalls if needed
resource "google_compute_firewall" "https_firewall" {
  name    = "https-firewall"
  network = "default"

  allow {
    protocol = "tcp"
    ports    = ["443"]
  }

  source_ranges = ["0.0.0.0/0"]
  target_tags   = var.network_tags
}

resource "google_compute_firewall" "health_check" {
  name    = "lb-health-check"
  network = "default"

  allow {
    protocol = "tcp"
    ports    = ["80"]
  }

  // Google's IP ranges for health check
  source_ranges = ["130.211.0.0/22", "35.191.0.0/16"]
  target_tags   = var.network_tags
}

// allow ssh for terraform provisioned ssh keys
resource "google_compute_firewall" "ssh-rule" {
  name    = "tf-ssh-allow"
  network = "default"

  allow {
    protocol = "tcp"
    ports    = ["22"]
  }
  target_tags   = var.network_tags
  source_ranges = ["0.0.0.0/0"]
}