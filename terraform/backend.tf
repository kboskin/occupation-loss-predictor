terraform {
  backend "gcs" {
    bucket = "losses-prod-tf"
    prefix = "terraform/state"
  }
}
