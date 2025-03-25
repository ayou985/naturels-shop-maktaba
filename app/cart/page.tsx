"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"

// Sample cart items
const initialCartItems = [
  {
    id: "1",
    name: "Leçons de Tawhid",
    price: 15.99,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-2.jpg-EqbiihwWs08cgsJ3in55mEK0BqBSiF.jpeg",
    quantity: 1,
  },
  {
    id: "3",
    name: "Absoluta Collection Prestige",
    price: 59.99,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-8.jpg-dLIW1VYMD2rFQRQtcf1jGkg6uotGtX.jpeg",
    quantity: 1,
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems)
  const [couponCode, setCouponCode] = useState("")
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false)

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
    toast({
      title: "Produit retiré",
      description: "Le produit a été retiré de votre panier.",
    })
  }

  const applyCoupon = () => {
    if (!couponCode) return
    setIsApplyingCoupon(true)
    setTimeout(() => {
      setIsApplyingCoupon(false)
      toast({
        title: "Code promo invalide",
        description: "Le code promo que vous avez entré n'est pas valide.",
        variant: "destructive",
      })
      setCouponCode("")
    }, 1000)
  }

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal > 50 ? 0 : 4.99
  const total = subtotal + shipping

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="mb-8 text-3xl font-bold text-emerald-800">Votre Panier</h1>

        {cartItems.length === 0 ? (
          <div className="rounded-lg bg-white p-8 text-center shadow-sm">
            <ShoppingBag className="mx-auto h-16 w-16 text-gray-300" />
            <h2 className="mt-4 text-2xl font-semibold">Votre panier est vide</h2>
            <p className="mt-2 text-gray-600">Vous n'avez pas encore ajouté de produits à votre panier.</p>
            <Link href="/boutique">
              <Button className="mt-6 bg-emerald-800 hover:bg-emerald-700">Continuer vos achats</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <div className="mb-4 hidden border-b pb-4 sm:flex">
                  <div className="w-1/2 font-semibold">Produit</div>
                  <div className="w-1/6 text-center font-semibold">Prix</div>
                  <div className="w-1/6 text-center font-semibold">Quantité</div>
                  <div className="w-1/6 text-center font-semibold">Total</div>
                </div>

                {cartItems.map((item) => (
                  <div key={item.id} className="mb-4 border-b pb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      {/* Product */}
                      <div className="flex w-full items-center sm:w-1/2">
                        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="ml-4">
                          <h3 className="font-medium">{item.name}</h3>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="mt-1 flex items-center text-sm text-red-500"
                          >
                            <Trash2 className="mr-1 h-3 w-3" />
                            Supprimer
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="mt-4 flex items-center justify-between sm:mt-0 sm:w-1/6 sm:justify-center">
                        <span className="text-sm font-semibold sm:hidden">Prix:</span>
                        <span>{item.price.toFixed(2)} €</span>
                      </div>

                      {/* Quantity */}
                      <div className="mt-4 flex items-center justify-between sm:mt-0 sm:w-1/6 sm:justify-center">
                        <span className="text-sm font-semibold sm:hidden">Quantité:</span>
                        <div className="flex items-center">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      {/* Total */}
                      <div className="mt-4 flex items-center justify-between sm:mt-0 sm:w-1/6 sm:justify-center">
                        <span className="text-sm font-semibold sm:hidden">Total:</span>
                        <span className="font-semibold">{(item.price * item.quantity).toFixed(2)} €</span>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="mt-6 flex justify-between">
                  <Link href="/boutique">
                    <Button variant="outline" className="flex items-center">
                      <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
                      Continuer vos achats
                    </Button>
                  </Link>
                  <Button
                    onClick={() => setCartItems([])}
                    variant="outline"
                    className="text-red-500 hover:bg-red-50 hover:text-red-600"
                  >
                    Vider le panier
                  </Button>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold">Récapitulatif de la commande</h2>
                <div className="mt-6 space-y-4">
                  <div className="flex justify-between">
                    <span>Sous-total</span>
                    <span>{subtotal.toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Frais de livraison</span>
                    <span>{shipping === 0 ? "Gratuit" : `${shipping.toFixed(2)} €`}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>{total.toFixed(2)} €</span>
                  </div>
                </div>

                <div className="mt-6">
                  <label htmlFor="coupon" className="block font-medium">
                    Code promo
                  </label>
                  <div className="mt-1 flex">
                    <Input
                      id="coupon"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="rounded-r-none"
                    />
                    <Button
                      onClick={applyCoupon}
                      disabled={isApplyingCoupon || !couponCode}
                      className="rounded-l-none bg-emerald-800 hover:bg-emerald-700"
                    >
                      {isApplyingCoupon ? "..." : "Appliquer"}
                    </Button>
                  </div>
                </div>

                <Button className="mt-6 w-full bg-emerald-800 hover:bg-emerald-700">Procéder au paiement</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

