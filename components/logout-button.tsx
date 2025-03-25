"use client"

import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"

interface LogoutButtonProps {
  className?: string
  variant?: "sidebar" | "link" | "button"
}

export function LogoutButton({ className, variant = "sidebar" }: LogoutButtonProps) {
  const router = useRouter()
  const { logout } = useAuth()

  const handleLogout = () => {
    // Appeler la fonction de déconnexion
    logout()
    // La redirection est gérée dans la fonction logout
  }

  if (variant === "link") {
    return (
      <button onClick={handleLogout} className={`text-red-500 hover:text-red-700 font-medium ${className}`}>
        Déconnexion
      </button>
    )
  }

  if (variant === "button") {
    return (
      <Button
        onClick={handleLogout}
        className={`flex items-center justify-center rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600 ${className}`}
      >
        <LogOut className="mr-2 h-4 w-4" />
        Déconnexion
      </Button>
    )
  }

  // Default sidebar variant
  return (
    <button
      onClick={handleLogout}
      className={`flex w-full items-center rounded-md p-3 text-red-500 hover:bg-red-50 ${className}`}
    >
      <LogOut className="mr-3 h-5 w-5" />
      <span>Déconnexion</span>
    </button>
  )
}

