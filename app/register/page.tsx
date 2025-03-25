"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"
import { useAuth } from "@/components/auth-provider"

export default function RegisterPage() {
  const router = useRouter()
  const { register, user } = useAuth()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)

  // Rediriger si déjà connecté
  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        router.push("/admin")
      } else {
        router.push("/account")
      }
    }
  }, [user, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation basique
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas.",
        variant: "destructive",
      })
      return
    }

    if (!acceptTerms) {
      toast({
        title: "Erreur",
        description: "Vous devez accepter les conditions d'utilisation.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const success = await register(formData)
      if (!success) {
        setIsLoading(false)
      }
      // La redirection est gérée dans la fonction register
    } catch (error) {
      console.error("Registration error:", error)
      toast({
        title: "Erreur d'inscription",
        description: "Une erreur est survenue lors de l'inscription.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div className="flex justify-center">
              <div className="relative h-20 w-20">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-7.jpg-6sQBuVjPmDMnRoevNh6dmEF3jrCsSr.jpeg"
                  alt="Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <div className="mt-8">
              <div className="text-center">
                <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">Créer un compte</h2>
                <p className="mt-2 text-sm text-gray-600">
                  Ou{" "}
                  <Link href="/login" className="font-medium text-emerald-600 hover:text-emerald-500">
                    connectez-vous à votre compte existant
                  </Link>
                </p>
              </div>

              <div className="mt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="firstName">Prénom</Label>
                      <div className="mt-1">
                        <Input
                          id="firstName"
                          name="firstName"
                          type="text"
                          autoComplete="given-name"
                          required
                          value={formData.firstName}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="lastName">Nom</Label>
                      <div className="mt-1">
                        <Input
                          id="lastName"
                          name="lastName"
                          type="text"
                          autoComplete="family-name"
                          required
                          value={formData.lastName}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <div className="mt-1">
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="password">Mot de passe</Label>
                    <div className="mt-1 relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                    <div className="mt-1">
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        required
                        value={formData.confirmPassword}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="terms"
                        checked={acceptTerms}
                        onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                      />
                      <label htmlFor="terms" className="text-sm text-gray-900">
                        J'accepte les{" "}
                        <Link href="/terms" className="font-medium text-emerald-600 hover:text-emerald-500">
                          conditions d'utilisation
                        </Link>{" "}
                        et la{" "}
                        <Link href="/privacy" className="font-medium text-emerald-600 hover:text-emerald-500">
                          politique de confidentialité
                        </Link>
                      </label>
                    </div>
                  </div>

                  <div>
                    <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isLoading}>
                      {isLoading ? "Création en cours..." : "Créer un compte"}
                    </Button>
                  </div>
                </form>

                {/* Espace supplémentaire en bas du formulaire */}
                <div className="mt-6"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <div className="absolute inset-0">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-4.jpg-RQ5xCE9eul9hdmhCDHiy2Tppg6uxeG.jpeg"
              alt="Background"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-emerald-900/30" />
          </div>
        </div>
      </div>
    </div>
  )
}

