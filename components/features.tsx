import { Book, ShoppingBag, Truck, CreditCard, LifeBuoy, ThumbsUp } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: Book,
    title: "Produits Authentiques",
    description: "Tous nos produits sont authentiques et conformes aux enseignements islamiques.",
  },
  {
    icon: ShoppingBag,
    title: "Large Sélection",
    description: "Découvrez notre vaste gamme de produits islamiques pour toute la famille.",
  },
  {
    icon: Truck,
    title: "Livraison Rapide",
    description: "Livraison rapide et sécurisée partout en France et en Europe.",
  },
  {
    icon: CreditCard,
    title: "Paiement Sécurisé",
    description: "Vos paiements sont 100% sécurisés avec nos partenaires de confiance.",
  },
  {
    icon: LifeBuoy,
    title: "Support Client",
    description: "Notre équipe est disponible pour répondre à toutes vos questions.",
  },
  {
    icon: ThumbsUp,
    title: "Satisfaction Garantie",
    description: "Nous garantissons votre satisfaction ou nous vous remboursons.",
  },
]

export function Features() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-center text-3xl font-bold text-emerald-800">Pourquoi nous choisir</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="border-emerald-100">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <feature.icon className="h-12 w-12 text-emerald-800" />
                <h3 className="mt-4 text-xl font-semibold">{feature.title}</h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

