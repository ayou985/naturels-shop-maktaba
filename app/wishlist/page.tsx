"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, Trash2, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

// Sample wishlist items
const initialWishlistItems = [
  {
    id: "2",
    name: "Les Plus Beaux Récits des Savants",
    price: 18.5,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-6.jpg-cXTne22uhGKDo7oox26p3dLssxcsUS.jpeg",
    category: "Livres",
  },
  {
    id: "4",
    name: "Huile de Nigelle Habachiya",
    price: 24.99,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-5.jpg-SlYm7iLSWFjS3nH45jitSe2FrieRe5.jpeg",
    category: "Huiles",
  },
  {
    id: "6",
    name: "Mon Nounours Sâlah",
    price: 29.99,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-1.jpg-9SCGHNtTTmLIipD4pqEBZIsUOlGqN6.jpeg",
    category: "Enfants",
  },
]

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems)

  const removeItem = (id: string) => {
    setWishlistItems((items) => items.filter((item) => item.id !== id))
    toast({
      title: "Produit retiré",
      description: "Le produit a été retiré de vos favoris.",
    })
  }

  const addToCart = (id: string) => {
    toast({
      title: "Produit ajouté au panier",
      description: "Le produit a été ajouté à votre panier.",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="mb-8 text-3xl font-bold text-emerald-800">Vos Favoris</h1>

        {wishlistItems.length === 0 ? (
          <div className="rounded-lg bg-white p-8 text-center shadow-sm">
            <Heart className="mx-auto h-16 w-16 text-gray-300" />
            <h2 className="mt-4 text-2xl font-semibold">Votre liste de favoris est vide</h2>
            <p className="mt-2 text-gray-600">Vous n'avez pas encore ajouté de produits à vos favoris.</p>
            <Link href="/boutique">
              <Button className="mt-6 bg-emerald-800 hover:bg-emerald-700">Découvrir nos produits</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="group overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:shadow-md"
              >
                <Link href={`/produits/${item.id}`} className="block">
                  <div className="relative aspect-square overflow-hidden">
                    <div className="absolute right-2 top-2 rounded-full bg-emerald-800 px-2 py-1 text-xs text-white">
                      {item.category}
                    </div>
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={300}
                      height={300}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                </Link>
                <div className="p-4">
                  <Link href={`/produits/${item.id}`} className="block">
                    <h3 className="mb-2 text-lg font-medium hover:text-emerald-800">{item.name}</h3>
                  </Link>
                  <div className="mb-4 text-lg font-bold text-emerald-800">{item.price.toFixed(2)} €</div>
                  <div className="flex gap-2">
                    <Button onClick={() => addToCart(item.id)} className="flex-1 bg-emerald-800 hover:bg-emerald-700">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Ajouter au panier
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

