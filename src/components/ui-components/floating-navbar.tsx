import type React from "react"
import Link from "next/link"
import { Home, Archive, User } from "lucide-react"

import { cn } from "@/lib/utils"

interface FloatingNavbarProps extends React.HTMLAttributes<HTMLDivElement> {
  links?: {
    href: string
    label: string
    icon: React.ReactNode
    active?: boolean
  }[]
}

export default function FloatingNavbar({
  className,
  links = [
    {
      href: "/",
      label: "Home",
      icon: <Home className="h-4 w-4" />,
      active: true,
    },
    {
      href: "/Store",
      label: "store",
      icon: <Archive className="h-4 w-4" />,
    },
    {
      href: "/profile",
      label: "Profile",
      icon: <User className="h-4 w-4" />,
    },
  ],
  ...props
}: FloatingNavbarProps) {
  return (
    <div
      className={cn(
        "fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 transform items-center justify-center",
        className,
      )}
      {...props}
    >
      <nav className="flex items-center justify-center gap-1 rounded-full border bg-background/80 px-3 py-1.5 shadow-lg backdrop-blur-md">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center justify-center rounded-full px-4 py-2 text-xs transition-colors",
              link.active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {link.icon}
            <span className="ml-2">{link.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}