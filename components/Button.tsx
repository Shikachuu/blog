"use client"

import Link from "next/link"
import type React from "react"

export type ButtonProps = {
  href?: string
  variant?: "primary" | "secondary" | "accent" | "orange" | "default"
  size?: "sm" | "md" | "lg"
  className?: string
  testId?: string
  disabled?: boolean
  type?: "button" | "submit" | "reset"
  children: React.ReactNode
  onClick?: () => void
  "aria-label"?: string
}

export const Button: React.FC<ButtonProps> = ({
  href,
  variant = "primary",
  size = "md",
  className = "",
  testId,
  disabled = false,
  type = "button",
  children,
  onClick,
  ...props
}) => {
  // Base classes with proper touch targets and accessibility
  const baseClasses = [
    // Layout and sizing
    "inline-flex items-center justify-center",
    "font-bold border-4 border-black dark:border-white",
    "transition-all duration-200 ease-in-out",

    // Accessibility - minimum touch target 44px
    "min-h-[44px] min-w-[44px]",

    // Focus states with high contrast
    "focus:outline-none focus:ring-4 focus:ring-offset-2",
    "focus:ring-offset-white dark:focus:ring-offset-neutral-900",

    // Active states
    "active:translate-x-1 active:translate-y-1",

    // Disabled states
    "disabled:opacity-50 disabled:cursor-not-allowed",
    "disabled:active:transform-none disabled:hover:shadow-none",
    "disabled:hover:translate-x-0 disabled:hover:translate-y-0",
  ].join(" ")

  // Size variants
  const sizeClasses = {
    sm: "px-4 py-2 text-sm gap-2",
    md: "px-6 py-3 text-base gap-3",
    lg: "px-8 py-4 text-lg gap-4",
  }

  // Color variants with proper contrast ratios and hover effects
  const variantClasses = {
    primary: [
      "text-white bg-primary shadow-brutal-primary",
      "hover:bg-primary-dark hover:shadow-none hover:translate-x-1 hover:translate-y-1",
      "focus:ring-primary/50",
    ].join(" "),

    secondary: [
      "text-black bg-secondary shadow-brutal-secondary",
      "hover:bg-secondary-dark hover:shadow-none hover:translate-x-1 hover:translate-y-1",
      "focus:ring-secondary/50",
    ].join(" "),

    accent: [
      "text-white bg-accent shadow-brutal-accent",
      "hover:bg-accent-dark hover:shadow-none hover:translate-x-1 hover:translate-y-1",
      "focus:ring-accent/50",
    ].join(" "),

    orange: [
      "text-white bg-orange shadow-brutal-orange",
      "hover:bg-orange-dark hover:shadow-none hover:translate-x-1 hover:translate-y-1",
      "focus:ring-orange/50",
    ].join(" "),

    default: [
      "text-neutral-900 dark:text-neutral-50",
      "bg-white dark:bg-neutral-800 shadow-brutal",
      "hover:bg-neutral-100 dark:hover:bg-neutral-700",
      "hover:shadow-none hover:translate-x-1 hover:translate-y-1",
      "focus:ring-primary/50",
    ].join(" "),
  }

  const combinedClasses = [baseClasses, sizeClasses[size], variantClasses[variant], className]
    .filter(Boolean)
    .join(" ")

  const commonProps = {
    className: combinedClasses,
    "data-testid": testId,
    disabled: disabled || undefined,
    onClick,
    ...props,
  }

  if (href && !disabled) {
    return (
      <Link href={href} {...commonProps} aria-disabled={disabled ? "true" : undefined}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} {...commonProps}>
      {children}
    </button>
  )
}
