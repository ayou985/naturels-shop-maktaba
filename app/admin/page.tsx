import Link from "next/link"
import { Package, ShoppingCart, Users, TrendingUp, DollarSign, ShoppingBag, Clock, ArrowUpRight } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { products } from "@/lib/data"

export default function AdminDashboard() {
  // Statistiques simulées
  const stats = [
    {
      name: "Ventes totales",
      value: "4,385.00 €",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
    },
    {
      name: "Commandes",
      value: "42",
      change: "+8.2%",
      trend: "up",
      icon: ShoppingBag,
    },
    {
      name: "Clients",
      value: "128",
      change: "+24.5%",
      trend: "up",
      icon: Users,
    },
    {
      name: "Taux de conversion",
      value: "3.2%",
      change: "-0.4%",
      trend: "down",
      icon: TrendingUp,
    },
  ]

  // Commandes récentes simulées
  const recentOrders = [
    {
      id: "ORD-12348",
      customer: "Mohammed A.",
      date: "15/04/2023",
      amount: "94.98 €",
      status: "Livré",
    },
    {
      id: "ORD-12347",
      customer: "Fatima B.",
      date: "12/04/2023",
      amount: "129.99 €",
      status: "En cours",
    },
    {
      id: "ORD-12346",
      customer: "Ahmed C.",
      date: "10/04/2023",
      amount: "75.50 €",
      status: "En attente",
    },
    {
      id: "ORD-12345",
      customer: "Aisha D.",
      date: "08/04/2023",
      amount: "45.99 €",
      status: "Livré",
    },
  ]

  // Produits à faible stock simulés
  const lowStockProducts = products.slice(0, 3).map((product, index) => ({
    ...product,
    stock: index === 0 ? 2 : index === 1 ? 3 : 5,
  }))

  // Produits les plus vendus
  const topSellingProducts = [
    {
      id: "3",
      name: "Absoluta Collection Prestige",
      sales: 28,
      revenue: "1,679.72 €",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-8.jpg-dLIW1VYMD2rFQRQtcf1jGkg6uotGtX.jpeg",
    },
    {
      id: "4",
      name: "Huile de Nigelle Habachiya",
      sales: 24,
      revenue: "599.76 €",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-5.jpg-SlYm7iLSWFjS3nH45jitSe2FrieRe5.jpeg",
    },
    {
      id: "1",
      name: "Leçons de Tawhid",
      sales: 19,
      revenue: "303.81 €",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-2.jpg-EqbiihwWs08cgsJ3in55mEK0BqBSiF.jpeg",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Tableau de bord</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Clock className="mr-2 h-4 w-4" />
            Dernière mise à jour: il y a 5 minutes
          </Button>
          <Button size="sm">Actualiser</Button>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name} className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
              <div className="rounded-full bg-emerald-100 p-2 text-emerald-800">
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center mt-1">
                <span
                  className={`text-xs ${stat.trend === "up" ? "text-green-600" : "text-red-600"} flex items-center`}
                >
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowUpRight className="h-3 w-3 mr-1 rotate-180" />
                  )}
                  {stat.change} par rapport au mois dernier
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Commandes récentes */}
        <Card className="md:col-span-2 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Commandes récentes</CardTitle>
              <Link href="/admin/orders">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-emerald-800 hover:text-emerald-900 hover:bg-emerald-50"
                >
                  Voir tout
                </Button>
              </Link>
            </div>
            <CardDescription>Vous avez reçu {recentOrders.length} commandes ce mois-ci</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-4 text-sm font-medium text-gray-500">
                <div>Commande</div>
                <div>Client</div>
                <div>Date</div>
                <div className="text-right">Statut</div>
              </div>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="grid grid-cols-4 items-center">
                    <div className="font-medium">{order.id}</div>
                    <div>{order.customer}</div>
                    <div>{order.date}</div>
                    <div className="text-right">
                      <Badge
                        className={
                          order.status === "Livré"
                            ? "bg-green-100 text-green-800"
                            : order.status === "En cours"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Produits à faible stock */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Produits à faible stock</CardTitle>
              <Link href="/admin/products">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-emerald-800 hover:text-emerald-900 hover:bg-emerald-50"
                >
                  Voir tout
                </Button>
              </Link>
            </div>
            <CardDescription>Produits nécessitant un réapprovisionnement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-4 h-10 w-10 overflow-hidden rounded-md bg-gray-100">
                      <div className="relative h-full w-full">
                        <img src={product.image || "/placeholder.svg"} alt={product.name} className="object-cover" />
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-500">Stock: {product.stock}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-red-50 text-red-800">
                    Faible
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Produits les plus vendus */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Produits les plus vendus</CardTitle>
            <Link href="/admin/analytics">
              <Button variant="ghost" size="sm" className="text-emerald-800 hover:text-emerald-900 hover:bg-emerald-50">
                Voir les analyses
              </Button>
            </Link>
          </div>
          <CardDescription>Performance des produits ce mois-ci</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topSellingProducts.map((product) => (
              <div key={product.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-4 h-12 w-12 overflow-hidden rounded-md bg-gray-100">
                    <div className="relative h-full w-full">
                      <img src={product.image || "/placeholder.svg"} alt={product.name} className="object-cover" />
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.sales} ventes</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-emerald-800">{product.revenue}</p>
                  <p className="text-sm text-gray-500">Revenu</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actions rapides */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="mr-2 h-5 w-5" />
              Produits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-gray-500">
              Gérez votre catalogue de produits, ajoutez de nouveaux produits ou modifiez les existants.
            </p>
            <Button className="w-full bg-emerald-800 hover:bg-emerald-700" asChild>
              <Link href="/admin/products">Gérer les produits</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Commandes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-gray-500">
              Consultez et gérez les commandes, mettez à jour les statuts et traitez les retours.
            </p>
            <Button className="w-full bg-emerald-800 hover:bg-emerald-700" asChild>
              <Link href="/admin/orders">Gérer les commandes</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Clients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-gray-500">
              Consultez la liste des clients, leurs informations et leur historique d'achat.
            </p>
            <Button className="w-full bg-emerald-800 hover:bg-emerald-700" asChild>
              <Link href="/admin/customers">Gérer les clients</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

