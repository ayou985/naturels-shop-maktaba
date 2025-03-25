"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Download, Printer, Send, Mail, Phone, MapPin, CreditCard, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import { products } from "@/lib/data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

// Commande simulée
const order = {
  id: "ORD-12348",
  customer: {
    id: "CUST-001",
    name: "Mohammed A.",
    email: "mohammed.a@example.com",
    phone: "+33 6 12 34 56 78",
  },
  date: "15/04/2023",
  status: "Livré",
  paymentMethod: "Carte bancaire",
  paymentStatus: "Payé",
  shippingMethod: "Livraison standard",
  shippingStatus: "Livré",
  trackingNumber: "TR123456789FR",
  shippingAddress: {
    street: "123 Rue de l'Islam",
    city: "Paris",
    postalCode: "75001",
    country: "France",
  },
  billingAddress: {
    street: "123 Rue de l'Islam",
    city: "Paris",
    postalCode: "75001",
    country: "France",
  },
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
  subtotal: 75.98,
  shipping: 4.99,
  tax: 14.01,
  total: 94.98,
  notes: "",
  history: [
    {
      date: "18/04/2023 14:32",
      status: "Livré",
      description: "La commande a été livrée avec succès à l'adresse indiquée.",
    },
    {
      date: "16/04/2023 09:15",
      status: "En cours",
      description: "La commande a été expédiée via Chronopost. Numéro de suivi: CH123456789FR.",
    },
    {
      date: "15/04/2023 18:45",
      status: "En cours",
      description: "Le paiement de 94.98 € a été confirmé.",
    },
    {
      date: "15/04/2023 16:20",
      status: "En attente",
      description: "La commande a été reçue et est en attente de traitement.",
    },
  ],
}

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  const [status, setStatus] = useState(order.status)
  const [paymentStatus, setPaymentStatus] = useState(order.paymentStatus)
  const [shippingStatus, setShippingStatus] = useState(order.shippingStatus)
  const [notes, setNotes] = useState(order.notes)
  const [isEditingNotes, setIsEditingNotes] = useState(false)

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus)
    toast({
      title: "Statut mis à jour",
      description: `Le statut de la commande ${order.id} a été mis à jour à "${newStatus}".`,
    })
  }

  const handlePaymentStatusChange = (newStatus: string) => {
    setPaymentStatus(newStatus)
    toast({
      title: "Statut de paiement mis à jour",
      description: `Le statut de paiement de la commande ${order.id} a été mis à jour à "${newStatus}".`,
    })
  }

  const handleShippingStatusChange = (newStatus: string) => {
    setShippingStatus(newStatus)
    toast({
      title: "Statut de livraison mis à jour",
      description: `Le statut de livraison de la commande ${order.id} a été mis à jour à "${newStatus}".`,
    })
  }

  const handleSaveNotes = () => {
    setIsEditingNotes(false)
    toast({
      title: "Notes enregistrées",
      description: "Les notes de la commande ont été enregistrées avec succès.",
    })
  }

  const handleSendInvoice = () => {
    toast({
      title: "Facture envoyée",
      description: `La facture a été envoyée à ${order.customer.email}.`,
    })
  }

  const handlePrintInvoice = () => {
    toast({
      title: "Impression",
      description: "La facture est en cours d'impression.",
    })
  }

  const handleDownloadInvoice = () => {
    toast({
      title: "Facture téléchargée",
      description: `La facture pour la commande ${order.id} a été téléchargée.`,
    })
  }

  const handleSendTrackingInfo = () => {
    toast({
      title: "Information de suivi envoyée",
      description: `Les informations de suivi ont été envoyées à ${order.customer.email}.`,
    })
  }

  // Récupérer les images des produits
  const getProductImage = (productId: string) => {
    const product = products.find((p) => p.id.toString() === productId)
    return product?.image || "/placeholder.svg"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link href="/admin/orders">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">Commande {order.id}</h2>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePrintInvoice}>
            <Printer className="mr-2 h-4 w-4" />
            Imprimer
          </Button>
          <Button variant="outline" onClick={handleDownloadInvoice}>
            <Download className="mr-2 h-4 w-4" />
            Télécharger
          </Button>
          <Button onClick={handleSendInvoice} className="bg-emerald-800 hover:bg-emerald-700">
            <Send className="mr-2 h-4 w-4" />
            Envoyer la facture
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Informations de la commande */}
        <Card className="shadow-sm md:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Détails de la commande</CardTitle>
              <Badge
                className={
                  status === "Livré"
                    ? "bg-green-100 text-green-800"
                    : status === "En cours"
                      ? "bg-blue-100 text-blue-800"
                      : status === "En attente"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                }
              >
                {status}
              </Badge>
            </div>
            <CardDescription>Informations sur la commande {order.id}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Date de commande</h3>
                <p>{order.date}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Statut</h3>
                <Select value={status} onValueChange={handleStatusChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="En attente">En attente</SelectItem>
                    <SelectItem value="En cours">En cours</SelectItem>
                    <SelectItem value="Livré">Livré</SelectItem>
                    <SelectItem value="Annulé">Annulé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Méthode de paiement</h3>
                <p className="flex items-center">
                  <CreditCard className="mr-2 h-4 w-4 text-gray-500" />
                  {order.paymentMethod}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Statut du paiement</h3>
                <Select value={paymentStatus} onValueChange={handlePaymentStatusChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Statut du paiement" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="En attente">En attente</SelectItem>
                    <SelectItem value="Payé">Payé</SelectItem>
                    <SelectItem value="Remboursé">Remboursé</SelectItem>
                    <SelectItem value="Échoué">Échoué</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Méthode de livraison</h3>
                <p className="flex items-center">
                  <Truck className="mr-2 h-4 w-4 text-gray-500" />
                  {order.shippingMethod}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Statut de livraison</h3>
                <Select value={shippingStatus} onValueChange={handleShippingStatusChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Statut de livraison" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="En attente">En attente</SelectItem>
                    <SelectItem value="En préparation">En préparation</SelectItem>
                    <SelectItem value="Expédié">Expédié</SelectItem>
                    <SelectItem value="Livré">Livré</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {order.trackingNumber && (
                <div className="col-span-2">
                  <h3 className="text-sm font-medium text-gray-500">Numéro de suivi</h3>
                  <div className="flex items-center justify-between">
                    <p>{order.trackingNumber}</p>
                    <Button variant="outline" size="sm" onClick={handleSendTrackingInfo}>
                      <Send className="mr-2 h-3 w-3" />
                      Envoyer au client
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Informations du client */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle>Informations du client</CardTitle>
            <CardDescription>Coordonnées et adresses</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Client</h3>
              <p className="font-medium">{order.customer.name}</p>
              <div className="mt-1 flex items-center text-sm text-gray-500">
                <Mail className="mr-1 h-4 w-4" />
                <a href={`mailto:${order.customer.email}`} className="hover:underline">
                  {order.customer.email}
                </a>
              </div>
              <div className="mt-1 flex items-center text-sm text-gray-500">
                <Phone className="mr-1 h-4 w-4" />
                <a href={`tel:${order.customer.phone}`} className="hover:underline">
                  {order.customer.phone}
                </a>
              </div>
              <div className="mt-2">
                <Link
                  href={`/admin/customers/${order.customer.id}`}
                  className="text-sm text-emerald-800 hover:underline"
                >
                  Voir le profil client
                </Link>
              </div>
            </div>
            <Separator />
            <div>
              <h3 className="text-sm font-medium text-gray-500">Adresse de livraison</h3>
              <div className="mt-1 flex items-start">
                <MapPin className="mr-1 h-4 w-4 text-gray-500 mt-0.5" />
                <div>
                  <p>{order.shippingAddress.street}</p>
                  <p>
                    {order.shippingAddress.postalCode} {order.shippingAddress.city}
                  </p>
                  <p>{order.shippingAddress.country}</p>
                </div>
              </div>
            </div>
            <Separator />
            <div>
              <h3 className="text-sm font-medium text-gray-500">Adresse de facturation</h3>
              <div className="mt-1 flex items-start">
                <MapPin className="mr-1 h-4 w-4 text-gray-500 mt-0.5" />
                <div>
                  <p>{order.billingAddress.street}</p>
                  <p>
                    {order.billingAddress.postalCode} {order.billingAddress.city}
                  </p>
                  <p>{order.billingAddress.country}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="items" className="space-y-4">
        <TabsList>
          <TabsTrigger value="items">Articles</TabsTrigger>
          <TabsTrigger value="history">Historique</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="items">
          {/* Articles de la commande */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle>Articles commandés</CardTitle>
              <CardDescription>Liste des articles dans cette commande</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produit</TableHead>
                    <TableHead className="text-right">Prix unitaire</TableHead>
                    <TableHead className="text-right">Quantité</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 overflow-hidden rounded-md bg-gray-100">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              width={40}
                              height={40}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-sm text-gray-500">ID: {item.id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">{item.price.toFixed(2)} €</TableCell>
                      <TableCell className="text-right">{item.quantity}</TableCell>
                      <TableCell className="text-right font-medium">
                        {(item.price * item.quantity).toFixed(2)} €
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Sous-total</span>
                  <span>{order.subtotal.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Frais de livraison</span>
                  <span>{order.shipping.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>TVA (20%)</span>
                  <span>{order.tax.toFixed(2)} €</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>{order.total.toFixed(2)} €</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          {/* Historique de la commande */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle>Historique de la commande</CardTitle>
              <CardDescription>Suivi des événements liés à cette commande</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.history.map((event, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Badge
                      className={
                        event.status === "Livré"
                          ? "mt-1 bg-green-100 text-green-800"
                          : event.status === "En cours"
                            ? "mt-1 bg-blue-100 text-blue-800"
                            : "mt-1 bg-yellow-100 text-yellow-800"
                      }
                    >
                      {event.status}
                    </Badge>
                    <div>
                      <p className="font-medium">{event.description}</p>
                      <p className="text-sm text-gray-500">{event.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes">
          {/* Notes de la commande */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Notes</CardTitle>
                {!isEditingNotes ? (
                  <Button variant="outline" size="sm" onClick={() => setIsEditingNotes(true)}>
                    Modifier
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" onClick={handleSaveNotes}>
                    Enregistrer
                  </Button>
                )}
              </div>
              <CardDescription>Notes internes sur cette commande</CardDescription>
            </CardHeader>
            <CardContent>
              {isEditingNotes ? (
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ajoutez des notes internes sur cette commande..."
                  rows={5}
                />
              ) : (
                <div className="rounded-md border p-4">
                  {notes ? <p>{notes}</p> : <p className="text-gray-500 italic">Aucune note pour cette commande.</p>}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

