export type Skill = {
  name: string
  level: number
  color: string
}

export type Project = {
  title: string
  description: string
  tech: string[]
  link: string
  variant: "primary" | "secondary" | "accent" | "default"
}

export type SocialLink = {
  name: string
  url: string
  label: string
}

export type ContactInfo = {
  email: string
  location?: string
}

export type PersonalConfig = {
  // Personal Information
  name: string
  displayName: string
  title: string
  tagline: string
  bio: string
  profileEmoji: string

  // Contact Information
  contact: ContactInfo

  // Social Links
  social: SocialLink[]

  // Skills & Expertise
  skills: Skill[]

  // Projects
  projects: Project[]

  // Site Metadata
  site: {
    title: string
    description: string
    keywords: string[]
    author: string
    locale: string
  }

  // Blog Configuration
  blog: {
    title: string
    description: string
    tagline: string
  }

  // Professional Information
  professional: {
    heroTitle: string
    heroDescription: string
    skillsHeading: string
    projectsHeading: string
    contactHeading: string
    contactDescription: string
  }
}

export const personalConfig: PersonalConfig = {
  // Personal Information
  name: "Máté Czékus",
  displayName: "Máté",
  title: "Senior Software Engineer",
  tagline: "Experienced Full Stack Engineer & Specialty Coffee Enthusiast",
  bio: "I craft solutions that blend cutting-edge technology with thoughtful design. Passionate about clean code, high-scale system architecture and container orchestration.",
  profileEmoji: "👨",

  // Contact Information
  contact: {
    email: "mate@picloud.hu",
    location: "Budapest, HU",
  },

  // Social Links
  social: [
    {
      name: "Email",
      url: "mailto:mate@picloud.hu",
      label: "Send me an email",
    },
    {
      name: "LinkedIn",
      url: "www.linkedin.com/in/máté-czékus-527073152",
      label: "Visit my LinkedIn profile",
    },
    {
      name: "GitHub",
      url: "https://github.com/Shikachuu",
      label: "Visit my GitHub profile",
    },
  ],

  // Skills & Expertise
  skills: [
    { name: "TypeScript", color: "bg-primary", level: 75 },
    { name: "React", color: "bg-secondary", level: 80 },
    { name: "Go", color: "bg-accent", level: 95 },
    { name: "Terraform", color: "bg-orange", level: 80 },
    { name: "AWS", color: "bg-primary", level: 75 },
    { name: "Kubernetes", color: "bg-secondary", level: 70 },
  ],

  // Projects
  projects: [
    {
      title: "Arkade",
      description:
        "I was a core contributor for years on an open source CLI that was meant to manage your k8s apps and CLIs.",
      tech: ["Go", "Shell", "Github Actions"],
      link: "https://github.com/alexellis/arkade",
      variant: "primary" as const,
    },
    {
      title: "One of the biggest global forex trading company",
      description:
        "Due to NDAs, I can't share my commercial work, but I wrote some of the most complex systems handling payments, using microfrontends in React and event-driven microservices in Go.",
      tech: ["Go", "React", "Terraform"],
      link: "#",
      variant: "secondary" as const,
    },
    {
      title: "Hungary's biggest fulfillment-as-a-service",
      description:
        "Due to NDAs, I can't share my commercial work, but i've built the entire backend infrastructure, from warehouse management to order processing, using a mix of Go and PHP.",
      tech: ["Go", "PHP", "Kubernetes"],
      link: "#",
      variant: "accent" as const,
    },
  ],

  // Site Metadata
  site: {
    title: "Máté Czékus - Full Stack Developer",
    description: "A personal website for a DevOps focused full-stack developer, called Máté.",
    keywords: [
      "software development",
      "technology",
      "programming",
      "blog",
      "go",
      "devops",
      "react",
      "typescript",
    ],
    author: "Máté Czékus",
    locale: "en_US",
  },

  // Blog Configuration
  blog: {
    title: "Blog - Yappin 'bout' Code, Coffees and learning new stuff",
    description:
      "Stuff about software development, timeless problems that I've encountered, and coffees that I've drank.",
    tagline:
      "Stuff about software development, timeless problems that I've encountered, and coffees that I've drank.",
  },

  // Professional Information
  professional: {
    heroTitle: "Hey, I'm",
    heroDescription:
      "I craft solutions that blend cutting-edge technology with thoughtful design. Passionate about clean code, high-scale system architecture and container orchestration.",
    skillsHeading: "Skills & Expertise",
    projectsHeading: "Featured Projects",
    contactHeading: "Let's Build Something Cool",
    contactDescription:
      "Have an interesting project or just want to chat about technology? I'm always down to collaborate on interesting stuff.",
  },
}

// Helper functions to get specific config sections
export const getPersonalInfo = () => ({
  name: personalConfig.name,
  displayName: personalConfig.displayName,
  title: personalConfig.title,
  tagline: personalConfig.tagline,
  bio: personalConfig.bio,
  profileEmoji: personalConfig.profileEmoji,
})

export const getContactInfo = () => personalConfig.contact

export const getSocialLinks = () => personalConfig.social

export const getSkills = () => personalConfig.skills

export const getProjects = () => personalConfig.projects

export const getSiteMetadata = () => personalConfig.site

export const getBlogConfig = () => personalConfig.blog

export const getProfessionalInfo = () => personalConfig.professional

// Helper to get social link by name
export const getSocialLink = (name: string) =>
  personalConfig.social.find(link => link.name.toLowerCase() === name.toLowerCase())

// Helper to get primary email
export const getPrimaryEmail = () => personalConfig.contact.email

// Helper to get email social link
export const getEmailLink = () => getSocialLink("Email")

// Helper to get LinkedIn link
export const getLinkedInLink = () => getSocialLink("LinkedIn")

// Helper to get GitHub link
export const getGitHubLink = () => getSocialLink("GitHub")
