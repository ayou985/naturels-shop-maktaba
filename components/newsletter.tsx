"use client"

import type React from "react"

import { useState } from "react"
import { Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setEmail("")
      toast({
        title: "Inscription réussie",
        description: "Vous êtes maintenant inscrit à notre newsletter.",
      })
    }, 1000)
  }

  return (
    <section className="bg-emerald-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <Mail className="mx-auto h-12 w-12 text-emerald-800" />
          <h2 className="mt-4 text-3xl font-bold text-emerald-800">Inscrivez-vous à notre newsletter</h2>
          <p className="mt-2 text-lg text-gray-600">
            Recevez nos dernières offres et nouveautés directement dans votre boîte mail.
          </p>
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4 sm:flex-row sm:gap-0">
            <Input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 rounded-r-none sm:rounded-r-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button
              type="submit"
              className="bg-emerald-800 hover:bg-emerald-700 sm:rounded-l-none"
              disabled={isLoading}
            >
              {isLoading ? "Inscription..." : "S'inscrire"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}

