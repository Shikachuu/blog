bucket = "terraform-state"
key    = "blog/state.tfstate"

# Use path-style URLs for R2 compatibility
region                      = "auto"
skip_credentials_validation = true
skip_metadata_api_check     = true
skip_region_validation      = true
skip_requesting_account_id  = true
skip_s3_checksum            = true
use_path_style              = true

# Native S3 locking (OpenTofu 1.10+)
use_lockfile = true

# Cloudflare R2 endpoint
endpoints = {
  s3 = "https://1844125a3fb50181c107d7d2df15f124.eu.r2.cloudflarestorage.com"
}