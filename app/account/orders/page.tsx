import Image from "next/image"
import Link from "next/link"
import { Package, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Sample orders
const orders = [
  {
    id: "ORD-12345",
    date: "15/03/2023",
    status: "Livré",
    total: 94.98,
    items: [
      {
        id: "1",
        name: "Leçons de Tawhid",
        price: 15.99,
        quantity: 1,
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-2.jpg-EqbiihwWs08cgsJ3in55mEK0BqBSiF.jpeg",
      },
      {
        id: "3",
        name: "Absoluta Collection Prestige",
        price: 59.99,
        quantity: 1,
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-8.jpg-dLIW1VYMD2rFQRQtcf1jGkg6uotGtX.jpeg",
      },
    ],
  },
  {
    id: "ORD-12346",
    date: "02/02/2023",
    status: "Livré",
    total: 24.99,
    items: [
      {
        id: "4",
        name: "Huile de Nigelle Habachiya",
        price: 24.99,
        quantity: 1,
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-5.jpg-SlYm7iLSWFjS3nH45jitSe2FrieRe5.jpeg",
      },
    ],
  },
]

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="mb-8 text-3xl font-bold text-emerald-800">Mes Commandes</h1>

        {orders.length === 0 ? (
          <div className="rounded-lg bg-white p-8 text-center shadow-sm">
            <Package className="mx-auto h-16 w-16 text-gray-300" />
            <h2 className="mt-4 text-2xl font-semibold">Aucune commande</h2>
            <p className="mt-2 text-gray-600">Vous n'avez pas encore passé de commande.</p>
            <Link href="/boutique">
              <Button className="mt-6 bg-emerald-800 hover:bg-emerald-700">Découvrir nos produits</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="overflow-hidden rounded-lg bg-white shadow-sm">
                <div className="border-b p-6">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center">
                        <h2 className="text-lg font-semibold">Commande {order.id}</h2>
                        <Badge
                          className={`ml-4 ${
                            order.status === "Livré"
                              ? "bg-green-100 text-green-800"
                              : order.status === "En cours"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.status}
                        </Badge>
                      </div>
                      <p className="mt-1 text-sm text-gray-600">Commandé le {order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Total</p>
                      <p className="text-lg font-bold text-emerald-800">{order.total.toFixed(2)} €</p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="mb-4 font-semibold">Produits</h3>
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center">
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="ml-4 flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-600">
                            {item.quantity} x {item.price.toFixed(2)} €
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{(item.quantity * item.price).toFixed(2)} €</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t bg-gray-50 p-4 text-right">
                  <Link href={`/account/orders/${order.id}`}>
                    <Button variant="outline" className="flex items-center">
                      Voir les détails
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

