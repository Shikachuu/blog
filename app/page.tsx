import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import {
  getPersonalInfo,
  getProfessionalInfo,
  getProjects,
  getSkills,
  getSocialLinks,
} from "@/lib/personal-config"

export default function HomePage() {
  const personalInfo = getPersonalInfo()
  const socialLinks = getSocialLinks()
  const skills = getSkills()
  const projects = getProjects()
  const professionalInfo = getProfessionalInfo()

  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-6xl font-black text-neutral-900 dark:text-neutral-50 leading-tight">
                  {professionalInfo.heroTitle}
                  <span className="text-primary animate-pulse-slow">
                    {" "}
                    {personalInfo.displayName}
                  </span>
                </h1>
                <p className="text-xl sm:text-2xl text-neutral-600 dark:text-neutral-300 font-medium">
                  {personalInfo.tagline}
                </p>
              </div>

              <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {personalInfo.bio}
              </p>

              <div className="flex flex-wrap gap-4">
                <Button
                  href="/blog"
                  variant="primary"
                  testId="hero-blog-button"
                  aria-label="Read my blog posts"
                >
                  Read My Blog
                </Button>

                <Button
                  href="#projects"
                  variant="secondary"
                  testId="hero-projects-button"
                  aria-label="View my projects"
                >
                  View Projects
                </Button>

                <Button
                  href={socialLinks.find(link => link.name === "Email")?.url || "#"}
                  variant="accent"
                  testId="hero-contact-button"
                  aria-label={
                    socialLinks.find(link => link.name === "Email")?.label || "Send me an email"
                  }
                >
                  Get In Touch
                </Button>
              </div>
            </div>

            {/* Profile Image Placeholder */}
            <div className="relative">
              <Card
                variant="primary"
                size="lg"
                className="bg-gradient-to-br from-primary to-accent animate-float"
                testId="hero-profile-card"
                aria-label="Profile illustration"
              >
                <div className="aspect-square bg-white dark:bg-neutral-900 rounded-full flex items-center justify-center">
                  <div className="text-8xl" role="img" aria-label="Developer emoji">
                    {personalInfo.profileEmoji}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8 bg-neutral-100 dark:bg-neutral-900"
        aria-labelledby="skills-heading"
      >
        <div className="max-w-6xl mx-auto">
          <h2
            id="skills-heading"
            className="text-3xl sm:text-4xl font-black text-center mb-12 text-neutral-900 dark:text-neutral-50"
          >
            {professionalInfo.skillsHeading}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map(skill => (
              <Card
                key={skill.name}
                variant="default"
                size="md"
                hoverEffect="lift"
                testId={`skill-${skill.name.toLowerCase().replace(".", "-")}-card`}
                aria-label={`${skill.name} skill level: ${skill.level} percent`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg text-neutral-900 dark:text-neutral-50">
                      {skill.name}
                    </h3>
                    <span className="font-mono text-sm font-bold text-neutral-600 dark:text-neutral-400">
                      {skill.level}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-neutral-200 dark:bg-neutral-700 h-4 border-2 border-black dark:border-white">
                    <div
                      className={`h-full ${skill.color} transition-all duration-1000 ease-out`}
                      style={{ width: `${skill.level}%` }}
                      role="progressbar"
                      aria-valuenow={skill.level}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${skill.name} proficiency: ${skill.level} percent`}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="py-20 px-4 sm:px-6 lg:px-8"
        aria-labelledby="projects-heading"
      >
        <div className="max-w-6xl mx-auto">
          <h2
            id="projects-heading"
            className="text-3xl sm:text-4xl font-black text-center mb-12 text-neutral-900 dark:text-neutral-50"
          >
            {professionalInfo.projectsHeading}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card
                key={project.title}
                as="article"
                variant={project.variant}
                size="md"
                hoverEffect="lift"
                testId={`project-${index}-card`}
                aria-label={`${project.title} project`}
              >
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-50">
                    {project.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-300">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map(tech => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-sm font-bold bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-50 border-2 border-black dark:border-white"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <Button
                    href={project.link}
                    variant="default"
                    size="sm"
                    className="mt-4"
                    testId={`project-${index}-button`}
                    aria-label={`View ${project.title} project details`}
                  >
                    View Project →
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8 bg-neutral-100 dark:bg-neutral-900"
        aria-labelledby="contact-heading"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2
            id="contact-heading"
            className="text-3xl sm:text-4xl font-black mb-8 text-neutral-900 dark:text-neutral-50"
          >
            {professionalInfo.contactHeading}
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-8 leading-relaxed">
            {professionalInfo.contactDescription}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button
              href={socialLinks.find(link => link.name === "Email")?.url || "#"}
              variant="primary"
              testId="contact-email-button"
              aria-label={
                socialLinks.find(link => link.name === "Email")?.label || "Send me an email"
              }
            >
              Email Me
            </Button>

            <Button
              href={socialLinks.find(link => link.name === "LinkedIn")?.url || "#"}
              variant="secondary"
              testId="contact-linkedin-button"
              aria-label={
                socialLinks.find(link => link.name === "LinkedIn")?.label ||
                "Visit my LinkedIn profile"
              }
            >
              LinkedIn
            </Button>

            <Button
              href={socialLinks.find(link => link.name === "GitHub")?.url || "#"}
              variant="accent"
              testId="contact-github-button"
              aria-label={
                socialLinks.find(link => link.name === "GitHub")?.label || "Visit my GitHub profile"
              }
            >
              GitHub
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
