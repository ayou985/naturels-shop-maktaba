"use client"

import { useState } from "react"
import Link from "next/link"
import { Heart, Minus, Plus, ShoppingCart, Share2, Truck, Package, Shield, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { Breadcrumb } from "@/components/breadcrumb"
import { ProductGallery } from "@/components/product-gallery"
import { RelatedProducts } from "@/components/related-products"
import { products } from "@/lib/data"

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id.toString() === params.id)
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Produit non trouvé</h1>
        <p className="mb-6">Désolé, le produit que vous recherchez n'existe pas.</p>
        <Link
          href="/boutique"
          className="rounded-md bg-emerald-800 px-6 py-3 text-white transition-colors hover:bg-emerald-700"
        >
          Retour à la boutique
        </Link>
      </div>
    )
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
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

  const shareProduct = () => {
    if (navigator.share) {
      navigator
        .share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        })
        .catch((error) => console.log("Erreur de partage", error))
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Lien copié",
        description: "Le lien du produit a été copié dans le presse-papier.",
      })
    }
  }

  // Create breadcrumb items
  const breadcrumbItems = [
    { label: "Boutique", href: "/boutique" },
    { label: product.category, href: `/categories/${product.category.toLowerCase()}` },
    { label: product.name },
  ]

  // Create product images array (for demo, we'll duplicate the single image)
  const productImages = Array(4).fill(product.image)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Product Gallery */}
          <ProductGallery images={productImages} productName={product.name} />

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="mb-2 flex items-center">
                <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-800">
                  {product.category}
                </span>
                <div className="ml-4 flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-500">(4.0 - 12 avis)</span>
                </div>
              </div>

              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

              <div className="mt-4 flex items-center">
                <span className="text-3xl font-bold text-emerald-800">{product.price.toFixed(2)} €</span>
                <span className="ml-2 text-sm text-gray-500">TTC</span>

                {/* Stock Status */}
                <span className="ml-4 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                  En stock
                </span>
              </div>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-sm">
              <p className="text-gray-700">{product.description || "Description du produit non disponible."}</p>

              {/* Product Features */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center">
                  <Truck className="mr-3 h-5 w-5 text-emerald-800" />
                  <span>Livraison gratuite à partir de 50€ d'achat</span>
                </div>
                <div className="flex items-center">
                  <Package className="mr-3 h-5 w-5 text-emerald-800" />
                  <span>Expédition sous 24-48h</span>
                </div>
                <div className="flex items-center">
                  <Shield className="mr-3 h-5 w-5 text-emerald-800" />
                  <span>Garantie satisfait ou remboursé pendant 14 jours</span>
                </div>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <span className="font-medium">Quantité:</span>
              <div className="flex items-center border rounded-md">
                <Button variant="ghost" size="icon" onClick={decreaseQuantity} disabled={quantity <= 1}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button variant="ghost" size="icon" onClick={increaseQuantity}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700" onClick={addToCart} size="lg">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Ajouter au panier
              </Button>
              <Button variant="outline" size="icon" onClick={addToWishlist} className="h-12 w-12">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" onClick={shareProduct} className="h-12 w-12">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Secure Payment */}
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-center text-sm text-gray-600">
              <p>Paiement 100% sécurisé</p>
              <div className="mt-2 flex justify-center space-x-2">
                <div className="h-6 w-10 rounded bg-white"></div>
                <div className="h-6 w-10 rounded bg-white"></div>
                <div className="h-6 w-10 rounded bg-white"></div>
                <div className="h-6 w-10 rounded bg-white"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description">
            <TabsList className="w-full justify-start border-b rounded-none">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="details">Détails</TabsTrigger>
              <TabsTrigger value="reviews">Avis clients</TabsTrigger>
              <TabsTrigger value="shipping">Livraison</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="py-6">
              <Card className="border-0 shadow-none">
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Description du produit</h3>
                  <p className="text-gray-600">{product.description}</p>

                  {/* Additional Description Content */}
                  <div className="mt-6 space-y-4">
                    <p className="text-gray-600">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia,
                      nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies
                      lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
                    </p>
                    <p className="text-gray-600">
                      Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet
                      nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit
                      amet nisl.
                    </p>
                  </div>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="details" className="py-6">
              <Card className="border-0 shadow-none">
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Détails du produit</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="rounded-lg bg-gray-50 p-4">
                      <h4 className="font-medium">Caractéristiques</h4>
                      <ul className="mt-2 list-disc pl-5 space-y-1 text-gray-600">
                        <li>Catégorie: {product.category}</li>
                        <li>Référence: PROD-{product.id}</li>
                        <li>Marque: Naturel shop Maktaba</li>
                        <li>Origine: France</li>
                      </ul>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-4">
                      <h4 className="font-medium">Garanties</h4>
                      <ul className="mt-2 list-disc pl-5 space-y-1 text-gray-600">
                        <li>Garantie satisfait ou remboursé pendant 14 jours</li>
                        <li>Produit 100% authentique</li>
                        <li>Contrôle qualité rigoureux</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="reviews" className="py-6">
              <Card className="border-0 shadow-none">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Avis clients</h3>
                    <Button className="bg-emerald-800 hover:bg-emerald-700">Écrire un avis</Button>
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Review Summary */}
                    <div className="rounded-lg bg-gray-50 p-4">
                      <div className="flex items-center">
                        <div className="text-5xl font-bold text-emerald-800">4.0</div>
                        <div className="ml-4">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-5 w-5 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                          <p className="mt-1 text-sm text-gray-600">Basé sur 12 avis</p>
                        </div>
                      </div>

                      {/* Rating Breakdown */}
                      <div className="mt-4 space-y-2">
                        {[5, 4, 3, 2, 1].map((rating) => (
                          <div key={rating} className="flex items-center">
                            <span className="w-8 text-sm">{rating} ★</span>
                            <div className="mx-2 h-2 flex-1 rounded-full bg-gray-200">
                              <div
                                className="h-2 rounded-full bg-emerald-800"
                                style={{
                                  width: `${rating === 4 ? "50%" : rating === 5 ? "30%" : rating === 3 ? "15%" : "5%"}`,
                                }}
                              ></div>
                            </div>
                            <span className="w-8 text-right text-sm text-gray-600">
                              {rating === 4 ? "6" : rating === 5 ? "4" : rating === 3 ? "2" : "0"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Reviews List */}
                    <div className="space-y-4">
                      <div className="rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">Ahmed K.</h4>
                          <span className="text-sm text-gray-500">Il y a 2 semaines</span>
                        </div>
                        <div className="mt-1 flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < 5 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                        <p className="mt-2 text-sm text-gray-600">
                          Excellent produit, je suis très satisfait de mon achat. La qualité est au rendez-vous et la
                          livraison a été rapide.
                        </p>
                      </div>

                      <div className="rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">Fatima B.</h4>
                          <span className="text-sm text-gray-500">Il y a 1 mois</span>
                        </div>
                        <div className="mt-1 flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                        <p className="mt-2 text-sm text-gray-600">
                          Bon produit dans l'ensemble, mais la livraison a pris un peu plus de temps que prévu. Je
                          recommande quand même.
                        </p>
                      </div>

                      <Button variant="outline" className="w-full">
                        Voir tous les avis
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="shipping" className="py-6">
              <Card className="border-0 shadow-none">
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Informations de livraison</h3>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <Truck className="mr-4 h-6 w-6 text-emerald-800" />
                      <div>
                        <h4 className="font-medium">Livraison standard</h4>
                        <p className="mt-1 text-gray-600">2-4 jours ouvrables (4.99€)</p>
                        <p className="text-sm text-gray-500">Gratuite pour toute commande supérieure à 50€</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Package className="mr-4 h-6 w-6 text-emerald-800" />
                      <div>
                        <h4 className="font-medium">Livraison express</h4>
                        <p className="mt-1 text-gray-600">24h (9.99€)</p>
                        <p className="text-sm text-gray-500">
                          Pour les commandes passées avant 14h (jours ouvrables uniquement)
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Shield className="mr-4 h-6 w-6 text-emerald-800" />
                      <div>
                        <h4 className="font-medium">Retours</h4>
                        <p className="mt-1 text-gray-600">Retours gratuits sous 14 jours</p>
                        <p className="text-sm text-gray-500">
                          Les articles doivent être retournés dans leur état d'origine
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <RelatedProducts currentProductId={params.id} category={product.category} />
      </div>
    </div>
  )
}

