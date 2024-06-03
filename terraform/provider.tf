provider "google" {
  credentials = file(var.credentials_file)
  project     = var.gcp_project
  region      = var.gcp_region
}
