"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart, Eye, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Product {
  id: number | string
  name: string
  price: number
  image: string
  category: string
  description?: string
  isNew?: boolean
  isOnSale?: boolean
  oldPrice?: number
  rating?: number
}

interface ProductCardProps {
  product: Product
  variant?: "default" | "compact"
}

export default function ProductCard({ product, variant = "default" }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const addToCart = () => {
    toast({
      title: "Produit ajouté au panier",
      description: `${product.name} a été ajouté à votre panier.`,
    })
  }

  const addToWishlist = () => {
    toast({
      title: "Produit ajouté aux favoris",
      description: `${product.name} a été ajouté à vos favoris.`,
    })
  }

  const quickView = () => {
    toast({
      title: "Aperçu rapide",
      description: `Aperçu rapide de ${product.name}.`,
    })
  }

  if (variant === "compact") {
    return (
      <div className="flex items-center gap-3 rounded-lg border p-2 transition-all hover:shadow-sm">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded">
          <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <Link href={`/produits/${product.id}`}>
            <h3 className="truncate font-medium hover:text-emerald-800">{product.name}</h3>
          </Link>
          <p className="text-sm font-bold text-emerald-800">{product.price.toFixed(2)} €</p>
        </div>
      </div>
    )
  }

  return (
    <Card
      className="overflow-hidden transition-all hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <Link href={`/produits/${product.id}`}>
          <div className="aspect-square overflow-hidden">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={300}
              height={300}
              className="h-full w-full object-cover transition-transform hover:scale-105"
            />
          </div>
        </Link>

        {/* Category Badge */}
        <div className="absolute right-2 top-2 rounded-full bg-emerald-800 px-2 py-1 text-xs text-white">
          {product.category}
        </div>

        {/* New or Sale Badge */}
        {product.isNew && (
          <div className="absolute left-2 top-2 rounded-full bg-blue-600 px-2 py-1 text-xs text-white">Nouveau</div>
        )}
        {product.isOnSale && (
          <div className="absolute left-2 top-2 rounded-full bg-red-600 px-2 py-1 text-xs text-white">Promo</div>
        )}

        {/* Quick Actions */}
        <div
          className={`absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="default"
                    size="icon"
                    className="h-9 w-9 rounded-full bg-white text-emerald-800 hover:bg-emerald-800 hover:text-white"
                    onClick={quickView}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Aperçu rapide</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="default"
                    size="icon"
                    className="h-9 w-9 rounded-full bg-white text-emerald-800 hover:bg-emerald-800 hover:text-white"
                    onClick={addToWishlist}
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Ajouter aux favoris</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="default"
                    size="icon"
                    className="h-9 w-9 rounded-full bg-white text-emerald-800 hover:bg-emerald-800 hover:text-white"
                    onClick={addToCart}
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Ajouter au panier</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        {/* Rating */}
        {product.rating && (
          <div className="mb-2 flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating!) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-1 text-xs text-gray-500">({product.rating})</span>
          </div>
        )}

        <Link href={`/produits/${product.id}`} className="block">
          <h3 className="font-medium line-clamp-1 hover:text-emerald-800">{product.name}</h3>
        </Link>

        {product.description && (
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{product.description}</p>
        )}

        <div className="mt-2 flex items-center">
          <span className="font-bold text-emerald-800">{product.price.toFixed(2)} €</span>
          {product.oldPrice && (
            <span className="ml-2 text-sm text-gray-500 line-through">{product.oldPrice.toFixed(2)} €</span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button variant="default" size="sm" className="w-full bg-emerald-600 hover:bg-emerald-700" onClick={addToCart}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Ajouter au panier
        </Button>
      </CardFooter>
    </Card>
  )
}

