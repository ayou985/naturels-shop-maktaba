"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simuler l'envoi d'un email de réinitialisation
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
      toast({
        title: "Email envoyé",
        description: "Un email de réinitialisation a été envoyé à votre adresse email.",
      })
    }, 1500)
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
                <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">Mot de passe oublié</h2>
                <p className="mt-2 text-sm text-gray-600">
                  Entrez votre adresse email pour réinitialiser votre mot de passe
                </p>
              </div>

              <div className="mt-6">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <div className="mt-1">
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isLoading}>
                        {isLoading ? "Envoi en cours..." : "Réinitialiser le mot de passe"}
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="rounded-md bg-green-50 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-5 w-5 text-green-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-green-800">Email envoyé</h3>
                        <div className="mt-2 text-sm text-green-700">
                          <p>
                            Nous avons envoyé un email à {email} avec un lien pour réinitialiser votre mot de passe.
                          </p>
                        </div>
                        <div className="mt-4">
                          <div className="-mx-2 -my-1.5 flex">
                            <Button
                              variant="outline"
                              className="rounded-md bg-green-50 px-2 py-1.5 text-sm font-medium text-green-800 hover:bg-green-100"
                              onClick={() => router.push("/login")}
                            >
                              Retour à la connexion
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-6 flex items-center justify-center">
                  <div className="text-sm">
                    <Link
                      href="/login"
                      className="flex items-center font-medium text-emerald-600 hover:text-emerald-500"
                    >
                      <ArrowLeft className="mr-1 h-4 w-4" />
                      Retour à la connexion
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <div className="absolute inset-0">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-5.jpg-SlYm7iLSWFjS3nH45jitSe2FrieRe5.jpeg"
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

