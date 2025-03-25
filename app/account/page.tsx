"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { User, Package, Heart, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { useAuth } from "@/components/auth-provider"
import { LogoutButton } from "@/components/logout-button"
import { Skeleton } from "@/components/ui/skeleton"

export default function AccountPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "+33 6 12 34 56 78",
    address: "123 Rue de l'Islam",
    city: "Paris",
    postalCode: "75001",
    country: "France",
  })

  const [isUpdating, setIsUpdating] = useState(false)

  // Vérifier l'authentification
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login?redirect=/account")
    } else if (user) {
      // Extraire le prénom et le nom
      const nameParts = user.name.split(" ")
      setUserData((prev) => ({
        ...prev,
        firstName: nameParts[0] || "",
        lastName: nameParts.slice(1).join(" ") || "",
        email: user.email || "",
      }))
    }
  }, [user, isLoading, router])

  // Afficher un écran de chargement pendant la vérification de l'authentification
  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <Skeleton className="h-10 w-48 mb-8" />
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            <Skeleton className="h-96 lg:col-span-1" />
            <div className="lg:col-span-3">
              <Skeleton className="h-96" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsUpdating(true)

    // Simulate API call
    setTimeout(() => {
      setIsUpdating(false)
      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été mises à jour avec succès.",
      })
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="mb-8 text-3xl font-bold text-emerald-800">Mon Compte</h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="mb-6 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                  <User className="h-10 w-10" />
                </div>
                <h2 className="mt-4 text-xl font-semibold">
                  {userData.firstName} {userData.lastName}
                </h2>
                <p className="text-gray-600">{userData.email}</p>
              </div>

              <nav className="space-y-1">
                <Link href="/account" className="flex items-center rounded-md bg-emerald-50 p-3 text-emerald-800">
                  <User className="mr-3 h-5 w-5" />
                  <span>Mon Profil</span>
                </Link>
                <Link
                  href="/account/orders"
                  className="flex items-center rounded-md p-3 text-gray-700 hover:bg-gray-50"
                >
                  <Package className="mr-3 h-5 w-5" />
                  <span>Mes Commandes</span>
                </Link>
                <Link href="/wishlist" className="flex items-center rounded-md p-3 text-gray-700 hover:bg-gray-50">
                  <Heart className="mr-3 h-5 w-5" />
                  <span>Mes Favoris</span>
                </Link>
                <Link
                  href="/account/settings"
                  className="flex items-center rounded-md p-3 text-gray-700 hover:bg-gray-50"
                >
                  <Settings className="mr-3 h-5 w-5" />
                  <span>Paramètres</span>
                </Link>
                <LogoutButton />
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <Tabs defaultValue="profile">
                <TabsList className="mb-6 grid w-full grid-cols-2">
                  <TabsTrigger value="profile">Informations Personnelles</TabsTrigger>
                  <TabsTrigger value="address">Adresse de Livraison</TabsTrigger>
                </TabsList>

                <TabsContent value="profile">
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="firstName" className="block font-medium">
                          Prénom
                        </label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={userData.firstName}
                          onChange={handleChange}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block font-medium">
                          Nom
                        </label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={userData.lastName}
                          onChange={handleChange}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block font-medium">
                          Email
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={userData.email}
                          onChange={handleChange}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block font-medium">
                          Téléphone
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          value={userData.phone}
                          onChange={handleChange}
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <Button type="submit" className="mt-6 bg-emerald-800 hover:bg-emerald-700" disabled={isUpdating}>
                      {isUpdating ? "Mise à jour..." : "Mettre à jour"}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="address">
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <label htmlFor="address" className="block font-medium">
                          Adresse
                        </label>
                        <Input
                          id="address"
                          name="address"
                          value={userData.address}
                          onChange={handleChange}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label htmlFor="city" className="block font-medium">
                          Ville
                        </label>
                        <Input id="city" name="city" value={userData.city} onChange={handleChange} className="mt-1" />
                      </div>
                      <div>
                        <label htmlFor="postalCode" className="block font-medium">
                          Code Postal
                        </label>
                        <Input
                          id="postalCode"
                          name="postalCode"
                          value={userData.postalCode}
                          onChange={handleChange}
                          className="mt-1"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label htmlFor="country" className="block font-medium">
                          Pays
                        </label>
                        <Input
                          id="country"
                          name="country"
                          value={userData.country}
                          onChange={handleChange}
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <Button type="submit" className="mt-6 bg-emerald-800 hover:bg-emerald-700" disabled={isUpdating}>
                      {isUpdating ? "Mise à jour..." : "Mettre à jour"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

