"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, Heart, Minus, Plus, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"

// This would normally come from a database or API
const getProductById = (id: string) => {
  const products = [
    {
      id: "1",
      name: "Leçons de Tawhid",
      price: 15.99,
      description:
        "Un livre essentiel sur les fondements de la foi islamique, écrit par Shaykh Muhammad Al-Wusabi. Ce livre explique de manière claire et concise les principes du Tawhid (l'unicité d'Allah) et constitue une ressource précieuse pour tous les musulmans souhaitant approfondir leur compréhension de la religion.",
      images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-2.jpg-EqbiihwWs08cgsJ3in55mEK0BqBSiF.jpeg"],
      category: "books",
      stock: 15,
    },
    {
      id: "2",
      name: "Les Plus Beaux Récits des Savants",
      price: 18.5,
      description:
        "Une collection inspirante des histoires et enseignements des grands savants de l'Islam. Ce livre rassemble des récits édifiants tirés principalement de Siyar A'lam An-Nubala' de l'imam Adh-Dhahabi, offrant aux lecteurs des exemples de piété, de sagesse et de dévotion.",
      images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-6.jpg-cXTne22uhGKDo7oox26p3dLssxcsUS.jpeg"],
      category: "books",
      stock: 10,
    },
    {
      id: "3",
      name: "Absoluta Collection Prestige",
      price: 59.99,
      description:
        "Un parfum de luxe aux notes délicates et raffinées. Cette fragrance exclusive de la Collection Prestige Paris offre une expérience olfactive unique avec ses notes équilibrées et sa longue tenue. Idéal pour les occasions spéciales ou pour un usage quotidien élégant.",
      images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-8.jpg-dLIW1VYMD2rFQRQtcf1jGkg6uotGtX.jpeg"],
      category: "perfumes",
      stock: 8,
    },
    {
      id: "4",
      name: "Huile de Nigelle Habachiya",
      price: 24.99,
      description:
        "Une huile de nigelle (habba sawda) pure et de haute qualité, originaire d'Éthiopie. Certifiée de grade A et 100% pure, cette huile est connue pour ses nombreux bienfaits pour la santé selon la médecine prophétique. Extraction première pression à froid pour préserver toutes ses propriétés.",
      images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-5.jpg-SlYm7iLSWFjS3nH45jitSe2FrieRe5.jpeg"],
      category: "perfumes",
      stock: 20,
    },
    {
      id: "8",
      name: "Mon Nounours Sâlah",
      price: 29.99,
      description:
        "Un adorable ours en peluche éducatif qui aide les enfants à apprendre la prière (salah) de façon amusante. Ce compagnon interactif prononce des phrases et guide les enfants dans l'apprentissage des mouvements de la prière, rendant l'éducation religieuse ludique et accessible.",
      images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-1.jpg-9SCGHNtTTmLIipD4pqEBZIsUOlGqN6.jpeg"],
      category: "kids",
      stock: 12,
    },
  ]

  return products.find((product) => product.id === id)
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id)
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Produit non trouvé</h1>
        <p className="mb-6">Désolé, le produit que vous recherchez n'existe pas.</p>
        <Button asChild>
          <Link href="/products">Retour aux produits</Link>
        </Button>
      </div>
    )
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const addToCart = () => {
    toast({
      title: "Produit ajouté au panier",
      description: `${quantity} x ${product.name} a été ajouté à votre panier.`,
    })
  }

  const addToWishlist = () => {
    toast({
      title: "Produit ajouté aux favoris",
      description: `${product.name} a été ajouté à vos favoris.`,
    })
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <Link href="/products" className="inline-flex items-center text-sm font-medium mb-6 hover:text-primary">
        <ChevronLeft className="mr-1 h-4 w-4" />
        Retour aux produits
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg border">
            <Image
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              width={600}
              height={600}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-xl font-semibold mt-2">{product.price.toFixed(2)} €</p>
          </div>

          <p className="text-gray-600">{product.description}</p>

          <div className="space-y-2">
            <p className="font-medium">
              Catégorie: <span className="capitalize">{product.category}</span>
            </p>
            <p className="font-medium">
              Disponibilité:
              <span className={product.stock > 0 ? "text-green-600" : "text-red-600"}>
                {product.stock > 0 ? ` En stock (${product.stock})` : " Épuisé"}
              </span>
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center border rounded-md">
              <Button variant="ghost" size="icon" onClick={decreaseQuantity} disabled={quantity <= 1}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button variant="ghost" size="icon" onClick={increaseQuantity} disabled={quantity >= product.stock}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              className="flex-1 bg-green-600 hover:bg-green-700"
              onClick={addToCart}
              disabled={product.stock === 0}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Ajouter au panier
            </Button>
            <Button variant="outline" onClick={addToWishlist}>
              <Heart className="mr-2 h-5 w-5" />
              Ajouter aux favoris
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start border-b rounded-none">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="details">Détails</TabsTrigger>
            <TabsTrigger value="shipping">Livraison</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="py-4">
            <Card className="border-0 shadow-none">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Description du produit</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="details" className="py-4">
            <Card className="border-0 shadow-none">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Détails du produit</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Catégorie: {product.category}</li>
                  <li>Référence: PROD-{product.id}</li>
                  <li>Garantie: Satisfait ou remboursé pendant 14 jours</li>
                </ul>
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="shipping" className="py-4">
            <Card className="border-0 shadow-none">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Informations de livraison</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Livraison standard: 2-4 jours ouvrables (4.99€)</li>
                  <li>Livraison express: 24h (9.99€)</li>
                  <li>Livraison gratuite pour toute commande supérieure à 50€</li>
                </ul>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

