terraform {
  required_version = ">= 1.10"
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.6"
    }
  }

  # Backend configuration moved to backend.hcl
  # Initialize with: terraform init -backend-config=backend.hcl
  backend "s3" {}
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

# Cloudflare Pages project for Next.js static site
resource "cloudflare_pages_project" "nextjs_site" {
  account_id        = var.cloudflare_account_id
  name              = var.project_name
  production_branch = "main"

  build_config {
    build_command   = "bun install && bun run build"
    destination_dir = "out"
    root_dir        = ""
  }

  source {
    type = "github"
    config {
      owner                         = var.github_owner
      repo_name                     = var.github_repo
      production_branch             = "main"
      pr_comments_enabled           = true
      deployments_enabled           = true
      production_deployment_enabled = true
      preview_deployment_setting    = "all"
    }
  }
}

# Custom subdomain for the blog
resource "cloudflare_pages_domain" "blog_subdomain" {
  account_id   = var.cloudflare_account_id
  project_name = cloudflare_pages_project.nextjs_site.name
  domain       = "blog.picloud.hu"
}

# DNS record for blog subdomain
resource "cloudflare_record" "blog_cname" {
  zone_id = var.cloudflare_zone_id
  name    = "blog"
  value   = cloudflare_pages_project.nextjs_site.subdomain
  type    = "CNAME"
  proxied = true
}

