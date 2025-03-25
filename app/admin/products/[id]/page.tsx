"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Save, Trash2, Upload, X, Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { products } from "@/lib/data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"

export default function EditProductPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const productId = params.id
  const isNewProduct = productId === "new"

  // État initial du produit
  const [product, setProduct] = useState({
    id: "",
    name: "",
    description: "",
    price: 0,
    category: "",
    image: "",
    stock: 0,
    isNew: false,
    isOnSale: false,
    oldPrice: 0,
    status: "active", // active, draft, archived
    images: [] as string[],
    seo: {
      title: "",
      description: "",
      keywords: "",
    },
  })

  // Catégories disponibles
  const categories = [
    "Homme & Garçon",
    "Femme & Fille",
    "Alimentation & Cosmétiques",
    "Jeux & Jouets",
    "Livres Enfant",
    "Autre",
  ]

  // Charger les données du produit si ce n'est pas un nouveau produit
  useEffect(() => {
    if (!isNewProduct) {
      const existingProduct = products.find((p) => p.id.toString() === productId)
      if (existingProduct) {
        setProduct({
          id: existingProduct.id.toString(),
          name: existingProduct.name,
          description: existingProduct.description || "",
          price: existingProduct.price,
          category: existingProduct.category,
          image: existingProduct.image,
          stock: Math.floor(Math.random() * 20), // Simuler un stock aléatoire
          isNew: existingProduct.isNew || false,
          isOnSale: existingProduct.isOnSale || false,
          oldPrice: existingProduct.oldPrice || 0,
          status: "active",
          images: [existingProduct.image],
          seo: {
            title: existingProduct.name,
            description: existingProduct.description || "",
            keywords: existingProduct.category,
          },
        })
      } else {
        // Rediriger vers la liste des produits si le produit n'existe pas
        router.push("/admin/products")
        toast({
          title: "Erreur",
          description: "Ce produit n'existe pas.",
          variant: "destructive",
        })
      }
    }
  }, [isNewProduct, productId, router])

  // Gérer les changements dans le formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setProduct((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value,
        },
      }))
    } else {
      setProduct((prev) => ({
        ...prev,
        [name]: name === "price" || name === "stock" || name === "oldPrice" ? Number.parseFloat(value) : value,
      }))
    }
  }

  // Gérer les changements de switch
  const handleSwitchChange = (name: string, checked: boolean) => {
    setProduct((prev) => ({
      ...prev,
      [name]: checked,
    }))
  }

  // Ajouter une image
  const handleAddImage = () => {
    // Simuler l'ajout d'une image
    toast({
      title: "Fonctionnalité en développement",
      description: "L'ajout d'images multiples sera bientôt disponible.",
    })
  }

  // Supprimer une image
  const handleRemoveImage = (index: number) => {
    setProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  // Gérer la soumission du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation basique
    if (!product.name || !product.price || !product.category) {
      toast({
        title: "Erreur de validation",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      })
      return
    }

    // Simuler la sauvegarde
    setTimeout(() => {
      toast({
        title: isNewProduct ? "Produit créé" : "Produit mis à jour",
        description: `Le produit "${product.name}" a été ${isNewProduct ? "créé" : "mis à jour"} avec succès.`,
      })
      router.push("/admin/products")
    }, 1000)
  }

  // Gérer la suppression du produit
  const handleDelete = () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      // Simuler la suppression
      setTimeout(() => {
        toast({
          title: "Produit supprimé",
          description: `Le produit "${product.name}" a été supprimé avec succès.`,
        })
        router.push("/admin/products")
      }, 1000)
    }
  }

  // Prévisualiser le produit
  const handlePreview = () => {
    // Ouvrir une nouvelle fenêtre avec la prévisualisation du produit
    window.open(`/produits/${product.id}`, "_blank")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link href="/admin/products">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">
            {isNewProduct ? "Ajouter un produit" : "Modifier le produit"}
          </h2>
        </div>
        <div className="flex gap-2">
          {!isNewProduct && (
            <>
              <Button variant="outline" onClick={handlePreview}>
                <Eye className="mr-2 h-4 w-4" />
                Prévisualiser
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                <Trash2 className="mr-2 h-4 w-4" />
                Supprimer
              </Button>
            </>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="w-full justify-start border-b rounded-none bg-transparent p-0">
            <TabsTrigger
              value="general"
              className="rounded-t-lg rounded-b-none data-[state=active]:bg-white data-[state=active]:shadow"
            >
              Général
            </TabsTrigger>
            <TabsTrigger
              value="images"
              className="rounded-t-lg rounded-b-none data-[state=active]:bg-white data-[state=active]:shadow"
            >
              Images
            </TabsTrigger>
            <TabsTrigger
              value="pricing"
              className="rounded-t-lg rounded-b-none data-[state=active]:bg-white data-[state=active]:shadow"
            >
              Prix & Stock
            </TabsTrigger>
            <TabsTrigger
              value="seo"
              className="rounded-t-lg rounded-b-none data-[state=active]:bg-white data-[state=active]:shadow"
            >
              SEO
            </TabsTrigger>
          </TabsList>

          {/* Onglet Général */}
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations de base</CardTitle>
                <CardDescription>Informations essentielles sur le produit</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Nom du produit <span className="text-red-500">*</span>
                  </Label>
                  <Input id="name" name="name" value={product.name} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    rows={5}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">
                    Catégorie <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={product.category}
                    onValueChange={(value) => setProduct((prev) => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Statut</Label>
                  <Select
                    value={product.status}
                    onValueChange={(value) => setProduct((prev) => ({ ...prev, status: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Actif</SelectItem>
                      <SelectItem value="draft">Brouillon</SelectItem>
                      <SelectItem value="archived">Archivé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between space-y-0 pt-2">
                  <Label htmlFor="isNew">Marquer comme nouveau</Label>
                  <Switch
                    id="isNew"
                    checked={product.isNew}
                    onCheckedChange={(checked) => handleSwitchChange("isNew", checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Images */}
          <TabsContent value="images" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Images du produit</CardTitle>
                <CardDescription>Ajoutez des images pour votre produit</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {product.images.map((image, index) => (
                    <div key={index} className="relative aspect-square rounded-md border">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Image ${index + 1}`}
                        fill
                        className="object-cover rounded-md"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute right-2 top-2 h-6 w-6"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <div
                    className="flex aspect-square items-center justify-center rounded-md border border-dashed cursor-pointer hover:bg-gray-50"
                    onClick={handleAddImage}
                  >
                    <div className="flex flex-col items-center gap-1 text-gray-500">
                      <Upload className="h-8 w-8" />
                      <span>Ajouter une image</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">URL de l'image principale</Label>
                  <Input id="image" name="image" value={product.image} onChange={handleChange} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Prix & Stock */}
          <TabsContent value="pricing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Prix et stock</CardTitle>
                <CardDescription>Informations sur le prix et la disponibilité</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="price">
                    Prix (€) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={product.price}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex items-center justify-between space-y-0 pt-2">
                  <Label htmlFor="isOnSale">En promotion</Label>
                  <Switch
                    id="isOnSale"
                    checked={product.isOnSale}
                    onCheckedChange={(checked) => handleSwitchChange("isOnSale", checked)}
                  />
                </div>
                {product.isOnSale && (
                  <div className="space-y-2">
                    <Label htmlFor="oldPrice">Prix avant promotion (€)</Label>
                    <Input
                      id="oldPrice"
                      name="oldPrice"
                      type="number"
                      step="0.01"
                      min="0"
                      value={product.oldPrice}
                      onChange={handleChange}
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock</Label>
                  <Input
                    id="stock"
                    name="stock"
                    type="number"
                    min="0"
                    value={product.stock}
                    onChange={handleChange}
                    required
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet SEO */}
          <TabsContent value="seo" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Optimisation pour les moteurs de recherche</CardTitle>
                <CardDescription>
                  Améliorez la visibilité de votre produit dans les résultats de recherche
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="seo.title">Titre SEO</Label>
                  <Input
                    id="seo.title"
                    name="seo.title"
                    value={product.seo.title}
                    onChange={handleChange}
                    placeholder="Titre optimisé pour les moteurs de recherche"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seo.description">Description SEO</Label>
                  <Textarea
                    id="seo.description"
                    name="seo.description"
                    value={product.seo.description}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Description courte et pertinente pour les moteurs de recherche"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seo.keywords">Mots-clés</Label>
                  <Input
                    id="seo.keywords"
                    name="seo.keywords"
                    value={product.seo.keywords}
                    onChange={handleChange}
                    placeholder="Mots-clés séparés par des virgules"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline" asChild>
            <Link href="/admin/products">Annuler</Link>
          </Button>
          <Button type="submit" className="bg-emerald-800 hover:bg-emerald-700">
            <Save className="mr-2 h-4 w-4" />
            {isNewProduct ? "Créer le produit" : "Enregistrer les modifications"}
          </Button>
        </div>
      </form>
    </div>
  )
}

