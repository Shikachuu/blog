"use client"

import Link from "next/link"
import type React from "react"
import { forwardRef } from "react"

export type NavButtonProps = {
  href?: string
  variant?: "primary" | "secondary" | "accent" | "orange" | "default"
  size?: "sm" | "md" | "lg"
  className?: string
  testId?: string
  children: React.ReactNode
  onClick?: () => void
  role?: string
  "aria-current"?: boolean | "time" | "false" | "true" | "page" | "step" | "location" | "date"
  title?: string
  tabIndex?: number
  "aria-label"?: string
  "aria-hidden"?: boolean
  "aria-checked"?: boolean
  onKeyDown?: (e: React.KeyboardEvent) => void
}

export const NavButton = forwardRef<HTMLAnchorElement | HTMLButtonElement, NavButtonProps>(
  (
    { href, variant = "default", size = "md", className = "", testId, children, onClick, ...props },
    ref,
  ) => {
    // Base classes with proper touch targets and accessibility
    const baseClasses = [
      // Layout and sizing
      "inline-flex items-center justify-center",
      "font-bold border-4 border-black dark:border-white",
      "transition-all duration-200 ease-in-out",

      // Accessibility - minimum touch target 44px
      "min-h-[44px] min-w-[44px]",

      // Focus states
      "focus:outline-none focus:ring-4 focus:ring-offset-2",
      "focus:ring-offset-white dark:focus:ring-offset-neutral-900",

      // Active states
      "active:translate-x-1 active:translate-y-1",

      // Disabled states
      "disabled:opacity-50 disabled:cursor-not-allowed",
      "disabled:active:transform-none",
    ].join(" ")

    // Size variants
    const sizeClasses = {
      sm: "px-3 py-2 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    }

    // Color variants with proper contrast ratios
    const variantClasses = {
      primary: ["text-white bg-primary", "hover:bg-primary-dark", "focus:ring-primary/50"].join(
        " ",
      ),

      secondary: [
        "text-black bg-secondary",
        "hover:bg-secondary-dark",
        "focus:ring-secondary/50",
      ].join(" "),

      accent: ["text-white bg-accent", "hover:bg-accent-dark", "focus:ring-accent/50"].join(" "),

      orange: ["text-white bg-orange", "hover:bg-orange-dark", "focus:ring-orange/50"].join(" "),

      default: [
        "text-neutral-900 dark:text-neutral-50",
        "bg-white dark:bg-neutral-800",
        "hover:bg-primary hover:text-white",
        "focus:ring-primary/50",
      ].join(" "),
    }

    const combinedClasses = [baseClasses, sizeClasses[size], variantClasses[variant], className]
      .filter(Boolean)
      .join(" ")

    const commonProps = {
      className: combinedClasses,
      "data-testid": testId,
      onClick,
      ...props,
    }

    if (href) {
      return (
        <Link href={href} {...commonProps} ref={ref as React.Ref<HTMLAnchorElement>}>
          {children}
        </Link>
      )
    }

    return (
      <button type="button" {...commonProps} ref={ref as React.Ref<HTMLButtonElement>}>
        {children}
      </button>
    )
  },
)

NavButton.displayName = "NavButton"
