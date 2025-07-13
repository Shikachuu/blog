"use client"

import Link from "next/link"
import type React from "react"

export type CardProps = {
  variant?: "default" | "primary" | "secondary" | "accent" | "orange"
  size?: "sm" | "md" | "lg"
  href?: string
  className?: string
  testId?: string
  hoverEffect?: "lift" | "shadow" | "none"
  as?: "article" | "div" | "section"
  children: React.ReactNode
  role?: string
  "aria-label"?: string
}

export const Card: React.FC<CardProps> = ({
  variant = "default",
  size = "md",
  href,
  className = "",
  testId,
  hoverEffect = "shadow",
  as: Element = "div",
  children,
  ...props
}) => {
  // Base classes with accessibility features
  const baseClasses = [
    // Core brutal card styling
    "bg-white dark:bg-neutral-900",
    "border-4 border-black dark:border-white",
    "transition-all duration-200 ease-in-out",

    // Accessibility
    "focus-within:ring-4 focus-within:ring-offset-2",
    "focus-within:ring-offset-white dark:focus-within:ring-offset-neutral-900",
  ].join(" ")

  // Size variants
  const sizeClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  }

  // Color variants with shadows
  const variantClasses = {
    default: ["shadow-brutal", "focus-within:ring-primary/50"].join(" "),

    primary: ["shadow-brutal-primary", "focus-within:ring-primary/50"].join(" "),

    secondary: ["shadow-brutal-secondary", "focus-within:ring-secondary/50"].join(" "),

    accent: ["shadow-brutal-accent", "focus-within:ring-accent/50"].join(" "),

    orange: ["shadow-brutal-orange", "focus-within:ring-orange/50"].join(" "),
  }

  // Hover effects
  const hoverEffectClasses = {
    lift: "hover:translate-x-1 hover:translate-y-1 hover:shadow-none",
    shadow: "hover:shadow-brutal-lg",
    none: "",
  }

  const combinedClasses = [
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    hoverEffectClasses[hoverEffect],
    className,
  ]
    .filter(Boolean)
    .join(" ")

  const commonProps = {
    className: combinedClasses,
    "data-testid": testId,
    ...props,
  }

  if (href) {
    return (
      <Link href={href} className="block" aria-label={props["aria-label"] || `Navigate to ${href}`}>
        <Element {...commonProps}>{children}</Element>
      </Link>
    )
  }

  return <Element {...commonProps}>{children}</Element>
}
