variable "cloudflare_api_token" {
  description = "Cloudflare API token with Pages and DNS permissions"
  type        = string
  sensitive   = true
}

variable "cloudflare_account_id" {
  description = "Cloudflare account ID"
  type        = string
  default     = "1844125a3fb50181c107d7d2df15f124"
}

variable "cloudflare_zone_id" {
  description = "Cloudflare zone ID for picloud.hu domain"
  type        = string
  default     = "77c10ffe7071d65a41452d2d5ad7490b"
}

variable "project_name" {
  description = "Name of the Cloudflare Pages project"
  type        = string
  default     = "personal-blog"
}

variable "github_owner" {
  description = "GitHub repository owner"
  type        = string
  default     = "Shikachuu"
}

variable "github_repo" {
  description = "GitHub repository name"
  type        = string
  default     = "blog"
}

# R2 backend configuration uses variables
# Credentials are set via environment variables:
# AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY (use your Cloudflare R2 API keys)

