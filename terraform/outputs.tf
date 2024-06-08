output "instance_ip" {
  value       = google_compute_instance.app_vm.network_interface[0].access_config[0].nat_ip
  description = "The external IP address of the VM."
}
