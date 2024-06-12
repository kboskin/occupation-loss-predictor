variable "gcp_project" {
  description = "The GCP project ID."
}

variable "gcp_region" {
  description = "The GCP region to deploy resources."
}

variable "credentials_file" {
  description = "Path to the Google Cloud credentials file."
}

variable "instance_zone" {
  description = "The zone where the instance is deployed."
}

variable "instance_name" {
  description = "Name of the instance."
}

variable "machine_type" {
  description = "The type of the instance."
}

variable "instance_image" {
  description = "The boot image for the instance."
}

variable "network_tags" {
  description = "Network tags for the instance."
  type        = list(string)
}

variable "external_ip" {
  description = "External IP address of the instance."
}

variable "gcs_bucket_name" {
  description = "The name of the GCS bucket to store Terraform state."
  type        = string
}

variable "ssh_user" {
  description = "SSH user for deployments"
  type        = string
}

variable "ssh_pub_path" {
  description = "SSH pub key path"
  type        = string
}

variable "boot_disk_size" {
  description = "SSH pub key path"
  type        = string
}