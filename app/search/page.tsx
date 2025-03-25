"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { products } from "@/lib/data"
import ProductCard from "@/components/product-card"

export default function SearchPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [searchQuery, setSearchQuery] = useState(query)
  const [searchResults, setSearchResults] = useState<any[]>([])

  // Effectuer la recherche lorsque la requête change
  useEffect(() => {
    if (query) {
      const results = products.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.description?.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase()),
      )
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }, [query])

  // Gérer la soumission du formulaire de recherche
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Utiliser le router pour la navigation au lieu de window.location
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="mb-8 text-3xl font-bold text-emerald-800">Résultats de recherche</h1>

        {/* Formulaire de recherche */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="flex max-w-lg gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                type="search"
                placeholder="Rechercher des produits..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit" className="bg-emerald-800 hover:bg-emerald-700">
              Rechercher
            </Button>
          </form>
        </div>

        {/* Afficher les résultats */}
        {query ? (
          <>
            <p className="mb-6 text-gray-600">
              {searchResults.length} résultat(s) pour &quot;{query}&quot;
            </p>

            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {searchResults.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="rounded-lg bg-white p-8 text-center shadow-sm">
                <Search className="mx-auto h-12 w-12 text-gray-300" />
                <h2 className="mt-4 text-2xl font-semibold">Aucun résultat trouvé</h2>
                <p className="mt-2 text-gray-600">
                  Nous n&apos;avons trouvé aucun produit correspondant à votre recherche.
                </p>
                <div className="mt-6">
                  <Link
                    href="/boutique"
                    className="rounded-md bg-emerald-800 px-4 py-2 text-white transition-colors hover:bg-emerald-700"
                  >
                    Voir tous les produits
                  </Link>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="rounded-lg bg-white p-8 text-center shadow-sm">
            <Search className="mx-auto h-12 w-12 text-gray-300" />
            <h2 className="mt-4 text-2xl font-semibold">Rechercher des produits</h2>
            <p className="mt-2 text-gray-600">Utilisez la barre de recherche ci-dessus pour trouver des produits.</p>
          </div>
        )}
      </div>
    </div>
  )
}

