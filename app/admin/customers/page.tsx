"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Filter, Eye, Mail, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"

// Clients simulés
const customers = [
  {
    id: "CUST-001",
    name: "Mohammed Ahmed",
    email: "mohammed.ahmed@example.com",
    phone: "+33 6 12 34 56 78",
    orders: 5,
    totalSpent: 245.95,
    lastOrder: "15/04/2023",
    status: "Actif",
  },
  {
    id: "CUST-002",
    name: "Fatima Benali",
    email: "fatima.benali@example.com",
    phone: "+33 6 23 45 67 89",
    orders: 3,
    totalSpent: 129.99,
    lastOrder: "12/04/2023",
    status: "Actif",
  },
  {
    id: "CUST-003",
    name: "Ahmed Chaoui",
    email: "ahmed.chaoui@example.com",
    phone: "+33 6 34 56 78 90",
    orders: 2,
    totalSpent: 89.5,
    lastOrder: "10/04/2023",
    status: "Actif",
  },
  {
    id: "CUST-004",
    name: "Aisha Daoudi",
    email: "aisha.daoudi@example.com",
    phone: "+33 6 45 67 89 01",
    orders: 1,
    totalSpent: 45.99,
    lastOrder: "08/04/2023",
    status: "Actif",
  },
  {
    id: "CUST-005",
    name: "Youssef El Mansouri",
    email: "youssef.elmansouri@example.com",
    phone: "+33 6 56 78 90 12",
    orders: 4,
    totalSpent: 189.99,
    lastOrder: "05/04/2023",
    status: "Actif",
  },
  {
    id: "CUST-006",
    name: "Leila Fassi",
    email: "leila.fassi@example.com",
    phone: "+33 6 67 89 01 23",
    orders: 0,
    totalSpent: 0,
    lastOrder: "-",
    status: "Inactif",
  },
  {
    id: "CUST-007",
    name: "Omar Ghali",
    email: "omar.ghali@example.com",
    phone: "+33 6 78 90 12 34",
    orders: 2,
    totalSpent: 112.5,
    lastOrder: "01/04/2023",
    status: "Actif",
  },
  {
    id: "CUST-008",
    name: "Samira Haddad",
    email: "samira.haddad@example.com",
    phone: "+33 6 89 01 23 45",
    orders: 1,
    totalSpent: 34.99,
    lastOrder: "28/03/2023",
    status: "Actif",
  },
  {
    id: "CUST-009",
    name: "Karim Idrissi",
    email: "karim.idrissi@example.com",
    phone: "+33 6 90 12 34 56",
    orders: 3,
    totalSpent: 149.99,
    lastOrder: "25/03/2023",
    status: "Actif",
  },
  {
    id: "CUST-010",
    name: "Nadia Jilali",
    email: "nadia.jilali@example.com",
    phone: "+33 6 01 23 45 67",
    orders: 0,
    totalSpent: 0,
    lastOrder: "-",
    status: "Inactif",
  },
]

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  // Filtrer les clients
  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery)

    const matchesStatus = statusFilter === "all" || customer.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Pagination
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage)
  const paginatedCustomers = filteredCustomers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleSendEmail = (email: string) => {
    toast({
      title: "Email envoyé",
      description: `Un email a été envoyé à ${email}.`,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Clients</h2>
        <Button asChild>
          <Link href="/admin/customers/new">Ajouter un client</Link>
        </Button>
      </div>

      {/* Filtres et recherche */}
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Rechercher un client..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex w-full items-center gap-2 md:w-auto">
          <Filter className="h-4 w-4 text-gray-500" />
          <select
            className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Tous les statuts</option>
            <option value="Actif">Actif</option>
            <option value="Inactif">Inactif</option>
          </select>
        </div>
      </div>

      {/* Tableau des clients */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Commandes</TableHead>
              <TableHead className="text-right">Total dépensé</TableHead>
              <TableHead>Dernière commande</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedCustomers.length > 0 ? (
              paginatedCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{customer.name}</div>
                      <div className="text-sm text-gray-500">{customer.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{customer.orders}</TableCell>
                  <TableCell className="text-right font-medium">{customer.totalSpent.toFixed(2)} €</TableCell>
                  <TableCell>{customer.lastOrder}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        customer.status === "Actif" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }
                    >
                      {customer.status}
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
                          <Link href={`/admin/customers/${customer.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            Voir les détails
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleSendEmail(customer.email)}>
                          <Mail className="mr-2 h-4 w-4" />
                          Envoyer un email
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Aucun client trouvé.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {filteredCustomers.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Affichage de {(currentPage - 1) * itemsPerPage + 1} à{" "}
            {Math.min(currentPage * itemsPerPage, filteredCustomers.length)} sur {filteredCustomers.length} clients
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
    </div>
  )
}

