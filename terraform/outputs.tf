output "pages_project_name" {
  description = "Name of the Cloudflare Pages project"
  value       = cloudflare_pages_project.nextjs_site.name
}

output "pages_project_subdomain" {
  description = "Default subdomain for the Pages project"
  value       = cloudflare_pages_project.nextjs_site.subdomain
}

output "blog_domain" {
  description = "Custom domain for the blog"
  value       = "blog.picloud.hu"
}

output "pages_project_id" {
  description = "ID of the Cloudflare Pages project"
  value       = cloudflare_pages_project.nextjs_site.id
}