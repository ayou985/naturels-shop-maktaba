"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Search,
  Filter,
  Eye,
  Download,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Calendar,
  ArrowDownUp,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Commandes simulées
const orders = [
  {
    id: "ORD-12348",
    customer: "Mohammed A.",
    email: "mohammed.a@example.com",
    date: "15/04/2023",
    amount: 94.98,
    status: "Livré",
    items: 2,
    paymentMethod: "Carte bancaire",
  },
  {
    id: "ORD-12347",
    customer: "Fatima B.",
    email: "fatima.b@example.com",
    date: "12/04/2023",
    amount: 129.99,
    status: "En cours",
    items: 3,
    paymentMethod: "PayPal",
  },
  {
    id: "ORD-12346",
    customer: "Ahmed C.",
    email: "ahmed.c@example.com",
    date: "10/04/2023",
    amount: 75.5,
    status: "En attente",
    items: 1,
    paymentMethod: "Carte bancaire",
  },
  {
    id: "ORD-12345",
    customer: "Aisha D.",
    email: "aisha.d@example.com",
    date: "08/04/2023",
    amount: 45.99,
    status: "Livré",
    items: 1,
    paymentMethod: "Carte bancaire",
  },
  {
    id: "ORD-12344",
    customer: "Youssef E.",
    email: "youssef.e@example.com",
    date: "05/04/2023",
    amount: 189.99,
    status: "Livré",
    items: 4,
    paymentMethod: "PayPal",
  },
  {
    id: "ORD-12343",
    customer: "Leila F.",
    email: "leila.f@example.com",
    date: "03/04/2023",
    amount: 65.0,
    status: "Annulé",
    items: 1,
    paymentMethod: "Carte bancaire",
  },
  {
    id: "ORD-12342",
    customer: "Omar G.",
    email: "omar.g@example.com",
    date: "01/04/2023",
    amount: 112.5,
    status: "Livré",
    items: 2,
    paymentMethod: "Virement bancaire",
  },
  {
    id: "ORD-12341",
    customer: "Samira H.",
    email: "samira.h@example.com",
    date: "28/03/2023",
    amount: 34.99,
    status: "Livré",
    items: 1,
    paymentMethod: "Carte bancaire",
  },
  {
    id: "ORD-12340",
    customer: "Karim I.",
    email: "karim.i@example.com",
    date: "25/03/2023",
    amount: 149.99,
    status: "Livré",
    items: 3,
    paymentMethod: "PayPal",
  },
  {
    id: "ORD-12339",
    customer: "Nadia J.",
    email: "nadia.j@example.com",
    date: "22/03/2023",
    amount: 89.99,
    status: "Livré",
    items: 2,
    paymentMethod: "Carte bancaire",
  },
]

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")
  const [sortField, setSortField] = useState("date")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  // Filtrer les commandes
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || order.status === statusFilter

    // Filtrer par date
    let matchesDate = true
    const orderDate = new Date(order.date.split("/").reverse().join("-"))
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    const lastWeek = new Date(today)
    lastWeek.setDate(lastWeek.getDate() - 7)
    const lastMonth = new Date(today)
    lastMonth.setMonth(lastMonth.getMonth() - 1)

    if (dateFilter === "today") {
      matchesDate = orderDate.toDateString() === today.toDateString()
    } else if (dateFilter === "yesterday") {
      matchesDate = orderDate.toDateString() === yesterday.toDateString()
    } else if (dateFilter === "last7days") {
      matchesDate = orderDate >= lastWeek
    } else if (dateFilter === "last30days") {
      matchesDate = orderDate >= lastMonth
    }

    return matchesSearch && matchesStatus && matchesDate
  })

  // Trier les commandes
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortField === "date") {
      const dateA = new Date(a.date.split("/").reverse().join("-"))
      const dateB = new Date(b.date.split("/").reverse().join("-"))
      return sortDirection === "asc" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime()
    } else if (sortField === "amount") {
      return sortDirection === "asc" ? a.amount - b.amount : b.amount - a.amount
    } else if (sortField === "id") {
      const idA = Number.parseInt(a.id.replace("ORD-", ""))
      const idB = Number.parseInt(b.id.replace("ORD-", ""))
      return sortDirection === "asc" ? idA - idB : idB - idA
    }
    return 0
  })

  // Pagination
  const totalPages = Math.ceil(sortedOrders.length / itemsPerPage)
  const paginatedOrders = sortedOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Statuts uniques pour le filtre
  const statuses = ["all", ...new Set(orders.map((order) => order.status))]

  // Statistiques des commandes
  const orderStats = {
    total: orders.length,
    pending: orders.filter((order) => order.status === "En attente").length,
    processing: orders.filter((order) => order.status === "En cours").length,
    delivered: orders.filter((order) => order.status === "Livré").length,
    cancelled: orders.filter((order) => order.status === "Annulé").length,
    totalRevenue: orders.reduce((sum, order) => sum + order.amount, 0).toFixed(2),
  }

  const handleDownloadInvoice = (orderId: string) => {
    toast({
      title: "Facture téléchargée",
      description: `La facture pour la commande ${orderId} a été téléchargée.`,
    })
  }

  const handleExportOrders = () => {
    toast({
      title: "Export en cours",
      description: "Les commandes sont en cours d'exportation au format CSV.",
    })
  }

  const toggleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Commandes</h2>
        <Button variant="outline" onClick={handleExportOrders}>
          <Download className="mr-2 h-4 w-4" />
          Exporter les commandes
        </Button>
      </div>

      {/* Statistiques des commandes */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <div className="text-sm font-medium text-gray-500">Total des commandes</div>
            <div className="text-2xl font-bold">{orderStats.total}</div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <div className="text-sm font-medium text-gray-500">En attente</div>
            <div className="text-2xl font-bold text-yellow-600">{orderStats.pending}</div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <div className="text-sm font-medium text-gray-500">En cours</div>
            <div className="text-2xl font-bold text-blue-600">{orderStats.processing}</div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <div className="text-sm font-medium text-gray-500">Livrées</div>
            <div className="text-2xl font-bold text-green-600">{orderStats.delivered}</div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <div className="text-sm font-medium text-gray-500">Chiffre d'affaires</div>
            <div className="text-2xl font-bold text-emerald-800">{orderStats.totalRevenue} €</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Toutes les commandes</TabsTrigger>
          <TabsTrigger value="pending">En attente</TabsTrigger>
          <TabsTrigger value="processing">En cours</TabsTrigger>
          <TabsTrigger value="delivered">Livrées</TabsTrigger>
          <TabsTrigger value="cancelled">Annulées</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {/* Filtres et recherche */}
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Rechercher une commande..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex w-full items-center gap-2 md:w-auto">
              <Filter className="h-4 w-4 text-gray-500" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status === "all" ? "Tous les statuts" : status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-full items-center gap-2 md:w-auto">
              <Calendar className="h-4 w-4 text-gray-500" />
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Période" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les périodes</SelectItem>
                  <SelectItem value="today">Aujourd'hui</SelectItem>
                  <SelectItem value="yesterday">Hier</SelectItem>
                  <SelectItem value="last7days">7 derniers jours</SelectItem>
                  <SelectItem value="last30days">30 derniers jours</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tableau des commandes */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="cursor-pointer" onClick={() => toggleSort("id")}>
                    <div className="flex items-center">
                      Commande
                      {sortField === "id" && (
                        <ArrowDownUp className={`ml-1 h-4 w-4 ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                      )}
                    </div>
                  </TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => toggleSort("date")}>
                    <div className="flex items-center">
                      Date
                      {sortField === "date" && (
                        <ArrowDownUp className={`ml-1 h-4 w-4 ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                      )}
                    </div>
                  </TableHead>
                  <TableHead>Articles</TableHead>
                  <TableHead className="cursor-pointer text-right" onClick={() => toggleSort("amount")}>
                    <div className="flex items-center justify-end">
                      Montant
                      {sortField === "amount" && (
                        <ArrowDownUp className={`ml-1 h-4 w-4 ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                      )}
                    </div>
                  </TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedOrders.length > 0 ? (
                  paginatedOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{order.customer}</div>
                          <div className="text-sm text-gray-500">{order.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{order.items}</TableCell>
                      <TableCell className="text-right font-medium">{order.amount.toFixed(2)} €</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            order.status === "Livré"
                              ? "bg-green-100 text-green-800"
                              : order.status === "En cours"
                                ? "bg-blue-100 text-blue-800"
                                : order.status === "En attente"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                          }
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/orders/${order.id}`}>
                                <Eye className="mr-2 h-4 w-4" />
                                Voir les détails
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDownloadInvoice(order.id)}>
                              <Download className="mr-2 h-4 w-4" />
                              Télécharger la facture
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      Aucune commande trouvée.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {filteredOrders.length > 0 && (
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Affichage de {(currentPage - 1) * itemsPerPage + 1} à{" "}
                {Math.min(currentPage * itemsPerPage, filteredOrders.length)} sur {filteredOrders.length} commandes
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="text-sm">
                  Page {currentPage} sur {totalPages || 1}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages || totalPages === 0}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="pending">
          <div className="rounded-md border p-8 text-center">
            <h3 className="text-lg font-medium">Commandes en attente</h3>
            <p className="mt-2 text-gray-500">Affiche toutes les commandes en attente de traitement.</p>
          </div>
        </TabsContent>

        <TabsContent value="processing">
          <div className="rounded-md border p-8 text-center">
            <h3 className="text-lg font-medium">Commandes en cours</h3>
            <p className="mt-2 text-gray-500">Affiche toutes les commandes en cours de traitement.</p>
          </div>
        </TabsContent>

        <TabsContent value="delivered">
          <div className="rounded-md border p-8 text-center">
            <h3 className="text-lg font-medium">Commandes livrées</h3>
            <p className="mt-2 text-gray-500">Affiche toutes les commandes livrées avec succès.</p>
          </div>
        </TabsContent>

        <TabsContent value="cancelled">
          <div className="rounded-md border p-8 text-center">
            <h3 className="text-lg font-medium">Commandes annulées</h3>
            <p className="mt-2 text-gray-500">Affiche toutes les commandes qui ont été annulées.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

