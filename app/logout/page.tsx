"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Loader2 } from "lucide-react"

import { toast } from "@/components/ui/use-toast"

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    // Simuler la déconnexion
    const logout = async () => {
      // Attendre un peu pour simuler le processus de déconnexion
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Afficher un toast de confirmation
      toast({
        title: "Déconnexion réussie",
        description: "Vous avez été déconnecté avec succès.",
      })

      // Rediriger vers la page d'accueil
      router.push("/")
    }

    logout()
  }, [router])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="flex justify-center">
          <div className="relative h-24 w-24">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-7.jpg-6sQBuVjPmDMnRoevNh6dmEF3jrCsSr.jpeg"
              alt="Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>
        <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">Déconnexion en cours...</h2>
        <div className="mt-4 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
        </div>
        <p className="mt-4 text-sm text-gray-600">Vous allez être redirigé vers la page d'accueil.</p>
      </div>
    </div>
  )
}

