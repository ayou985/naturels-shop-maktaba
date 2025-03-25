"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

// Définir le type pour l'utilisateur
interface User {
  id: string
  name: string
  email: string
  role: "user" | "admin"
}

// Définir le type pour le contexte d'authentification
interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  register: (userData: any) => Promise<boolean>
}

// Créer le contexte d'authentification
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Hook personnalisé pour utiliser le contexte d'authentification
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

// Utilisateurs prédéfinis pour la démo
const DEMO_USERS = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    password: "password",
    role: "admin" as const,
  },
  {
    id: "2",
    name: "Regular User",
    email: "user@example.com",
    password: "password",
    role: "user" as const,
  },
]

// Composant fournisseur d'authentification
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Vérifier l'authentification au chargement
  useEffect(() => {
    // Simuler la vérification de l'authentification
    const checkAuth = async () => {
      try {
        // Dans une application réelle, vous feriez une requête API ici
        const storedUser = localStorage.getItem("user")

        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error("Error checking authentication:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Rediriger en fonction de l'authentification
  useEffect(() => {
    if (!isLoading) {
      // Protéger les routes admin
      if (pathname?.startsWith("/admin") && (!user || user.role !== "admin")) {
        router.push("/login?redirect=/admin")
        toast({
          title: "Accès refusé",
          description: "Vous devez être connecté en tant qu'administrateur pour accéder à cette page.",
          variant: "destructive",
        })
      }
    }
  }, [isLoading, user, pathname, router])

  // Fonction de connexion
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    try {
      // Simuler une requête API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Vérifier les identifiants
      const foundUser = DEMO_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password)

      if (foundUser) {
        // Créer l'objet utilisateur sans le mot de passe
        const userData: User = {
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email,
          role: foundUser.role,
        }

        setUser(userData)
        localStorage.setItem("user", JSON.stringify(userData))

        // Rediriger vers la page appropriée
        if (userData.role === "admin") {
          router.push("/admin")
        } else {
          router.push("/account")
        }

        return true
      }

      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  // Fonction de déconnexion
  const logout = () => {
    // Effacer l'utilisateur de l'état
    setUser(null)

    try {
      // Effacer toutes les données d'authentification du localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        localStorage.removeItem("auth")
        // Effacer tous les autres éléments potentiellement liés à l'authentification
        sessionStorage.clear()

        // Dans une application réelle, nous ferions également une requête API pour invalider le token
        console.log("Déconnexion de l'utilisateur et invalidation du token...")
      }
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error)
    }

    // Afficher un toast de confirmation
    toast({
      title: "Déconnexion réussie",
      description: "Vous avez été déconnecté avec succès.",
    })

    // Rediriger vers la page d'accueil
    router.push("/")
  }

  // Fonction d'inscription
  const register = async (userData: any): Promise<boolean> => {
    setIsLoading(true)

    try {
      // Simuler une requête API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Vérifier si l'email existe déjà
      const emailExists = DEMO_USERS.some((u) => u.email.toLowerCase() === userData.email.toLowerCase())

      if (emailExists) {
        toast({
          title: "Erreur d'inscription",
          description: "Cet email est déjà utilisé.",
          variant: "destructive",
        })
        return false
      }

      // Dans une application réelle, vous enverriez les données à votre API
      console.log("Registering user:", userData)

      // Simuler un utilisateur créé
      const newUser: User = {
        id: `user-${Date.now()}`,
        name: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        role: "user",
      }

      // Connecter automatiquement l'utilisateur après l'inscription
      setUser(newUser)
      localStorage.setItem("user", JSON.stringify(newUser))

      toast({
        title: "Inscription réussie",
        description: "Votre compte a été créé avec succès.",
      })

      router.push("/account")
      return true
    } catch (error) {
      console.error("Registration error:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  // Valeur du contexte
  const value = {
    user,
    isLoading,
    login,
    logout,
    register,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

