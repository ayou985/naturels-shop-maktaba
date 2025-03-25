"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Download,
  Upload,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { products } from "@/lib/data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [view, setView] = useState<"list" | "grid">("list")
  const itemsPerPage = 10

  // Filtrer les produits
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || product.category.toLowerCase() === categoryFilter.toLowerCase()

    return matchesSearch && matchesCategory
  })

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Catégories uniques pour le filtre
  const categories = ["all", ...new Set(products.map((product) => product.category.toLowerCase()))]

  const handleDeleteProduct = (id: string | number) => {
    // Simuler la suppression
    toast({
      title: "Produit supprimé",
      description: `Le produit #${id} a été supprimé avec succès.`,
    })
  }

  const handleExportProducts = () => {
    toast({
      title: "Export en cours",
      description: "Les produits sont en cours d'exportation au format CSV.",
    })
  }

  const handleImportProducts = () => {
    toast({
      title: "Import",
      description: "Veuillez sélectionner un fichier CSV à importer.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Produits</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportProducts}>
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
          <Button variant="outline" onClick={handleImportProducts}>
            <Upload className="mr-2 h-4 w-4" />
            Importer
          </Button>
          <Button asChild className="bg-emerald-800 hover:bg-emerald-700">
            <Link href="/admin/products/new">
              <Plus className="mr-2 h-4 w-4" />
              Ajouter un produit
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">Tous les produits</TabsTrigger>
            <TabsTrigger value="active">Actifs</TabsTrigger>
            <TabsTrigger value="outOfStock">Rupture de stock</TabsTrigger>
            <TabsTrigger value="draft">Brouillons</TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            <Button
              variant={view === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setView("list")}
              className={view === "list" ? "bg-emerald-800 hover:bg-emerald-700" : ""}
            >
              Liste
            </Button>
            <Button
              variant={view === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setView("grid")}
              className={view === "grid" ? "bg-emerald-800 hover:bg-emerald-700" : ""}
            >
              Grille
            </Button>
          </div>
        </div>

        <TabsContent value="all" className="space-y-4">
          {/* Filtres et recherche */}
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Rechercher un produit..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex w-full items-center gap-2 md:w-auto">
              <Filter className="h-4 w-4 text-gray-500" />
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all"
                        ? "Toutes les catégories"
                        : category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {view === "list" ? (
            // Vue liste
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Produit</TableHead>
                    <TableHead>Catégorie</TableHead>
                    <TableHead className="text-right">Prix</TableHead>
                    <TableHead className="text-right">Stock</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedProducts.length > 0 ? (
                    paginatedProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 overflow-hidden rounded-md bg-gray-100">
                              <Image
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                width={40}
                                height={40}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <div className="font-medium">{product.name}</div>
                              <div className="text-sm text-gray-500 line-clamp-1">{product.description}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{product.category}</Badge>
                        </TableCell>
                        <TableCell className="text-right">{product.price.toFixed(2)} €</TableCell>
                        <TableCell className="text-right">
                          <Badge
                            className={
                              Math.floor(Math.random() * 20) < 5
                                ? "bg-red-100 text-red-800"
                                : "bg-green-100 text-green-800"
                            }
                          >
                            {Math.floor(Math.random() * 20)}
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
                                <Link href={`/admin/products/${product.id}`}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Modifier
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => handleDeleteProduct(product.id)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Supprimer
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        Aucun produit trouvé.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          ) : (
            // Vue grille
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden shadow-sm">
                    <div className="aspect-square relative">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge variant="outline" className="bg-white">
                          {product.category}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader className="p-4 pb-0">
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                      <CardDescription className="line-clamp-2">{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-emerald-800">{product.price.toFixed(2)} €</span>
                        <Badge
                          className={
                            Math.floor(Math.random() * 20) < 5
                              ? "bg-red-100 text-red-800"
                              : "bg-green-100 text-green-800"
                          }
                        >
                          Stock: {Math.floor(Math.random() * 20)}
                        </Badge>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1" asChild>
                          <Link href={`/admin/products/${product.id}`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Modifier
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Supprimer
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500">Aucun produit trouvé.</p>
                </div>
              )}
            </div>
          )}

          {/* Pagination */}
          {filteredProducts.length > 0 && (
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Affichage de {(currentPage - 1) * itemsPerPage + 1} à{" "}
                {Math.min(currentPage * itemsPerPage, filteredProducts.length)} sur {filteredProducts.length} produits
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

        <TabsContent value="active">
          <div className="rounded-md border p-8 text-center">
            <h3 className="text-lg font-medium">Produits actifs</h3>
            <p className="mt-2 text-gray-500">
              Affiche tous les produits actuellement actifs et disponibles à la vente.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="outOfStock">
          <div className="rounded-md border p-8 text-center">
            <h3 className="text-lg font-medium">Produits en rupture de stock</h3>
            <p className="mt-2 text-gray-500">Affiche tous les produits actuellement en rupture de stock.</p>
          </div>
        </TabsContent>

        <TabsContent value="draft">
          <div className="rounded-md border p-8 text-center">
            <h3 className="text-lg font-medium">Produits en brouillon</h3>
            <p className="mt-2 text-gray-500">Affiche tous les produits enregistrés comme brouillons et non publiés.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

