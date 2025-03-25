"use client"

import type React from "react"

import { useState } from "react"
import { Save, Store, CreditCard, Mail, Bell, Lock, Globe } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"

export default function SettingsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simuler la sauvegarde
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Paramètres enregistrés",
        description: "Vos paramètres ont été enregistrés avec succès.",
      })
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Paramètres</h2>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-6">
          <TabsTrigger value="general">
            <Store className="mr-2 h-4 w-4" />
            Général
          </TabsTrigger>
          <TabsTrigger value="payment">
            <CreditCard className="mr-2 h-4 w-4" />
            Paiement
          </TabsTrigger>
          <TabsTrigger value="email">
            <Mail className="mr-2 h-4 w-4" />
            Email
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security">
            <Lock className="mr-2 h-4 w-4" />
            Sécurité
          </TabsTrigger>
          <TabsTrigger value="advanced">
            <Globe className="mr-2 h-4 w-4" />
            Avancé
          </TabsTrigger>
        </TabsList>

        {/* Paramètres généraux */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Informations de la boutique</CardTitle>
                <CardDescription>Configurez les informations générales de votre boutique</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="store-name">Nom de la boutique</Label>
                  <Input id="store-name" defaultValue="Naturel shop Maktaba" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="store-description">Description</Label>
                  <Textarea
                    id="store-description"
                    defaultValue="Votre boutique en ligne de produits islamiques authentiques et naturels."
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="store-email">Email de contact</Label>
                  <Input id="store-email" type="email" defaultValue="contact@naturel-shop-maktaba.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="store-phone">Téléphone</Label>
                  <Input id="store-phone" defaultValue="+33 1 23 45 67 89" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="store-address">Adresse</Label>
                  <Textarea id="store-address" defaultValue="123 Rue de l'Islam, 75001 Paris, France" rows={2} />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                  <Save className="mr-2 h-4 w-4" />
                  {isSubmitting ? "Enregistrement..." : "Enregistrer les modifications"}
                </Button>
              </CardFooter>
            </form>
          </Card>

          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Paramètres régionaux</CardTitle>
                <CardDescription>Configurez les paramètres régionaux de votre boutique</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="currency">Devise</Label>
                  <select
                    id="currency"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    defaultValue="EUR"
                  >
                    <option value="EUR">Euro (€)</option>
                    <option value="USD">Dollar américain ($)</option>
                    <option value="GBP">Livre sterling (£)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Langue</Label>
                  <select
                    id="language"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    defaultValue="fr"
                  >
                    <option value="fr">Français</option>
                    <option value="en">Anglais</option>
                    <option value="ar">Arabe</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Fuseau horaire</Label>
                  <select
                    id="timezone"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    defaultValue="Europe/Paris"
                  >
                    <option value="Europe/Paris">Europe/Paris</option>
                    <option value="Europe/London">Europe/London</option>
                    <option value="America/New_York">America/New_York</option>
                  </select>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                  <Save className="mr-2 h-4 w-4" />
                  {isSubmitting ? "Enregistrement..." : "Enregistrer les modifications"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        {/* Paramètres de paiement */}
        <TabsContent value="payment" className="space-y-6">
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Méthodes de paiement</CardTitle>
                <CardDescription>Configurez les méthodes de paiement acceptées par votre boutique</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-5 w-5" />
                    <Label htmlFor="card-payments">Paiements par carte</Label>
                  </div>
                  <Switch id="card-payments" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img src="/paypal-icon.svg" alt="PayPal" className="h-5 w-5" />
                    <Label htmlFor="paypal">PayPal</Label>
                  </div>
                  <Switch id="paypal" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img src="/apple-pay-icon.svg" alt="Apple Pay" className="h-5 w-5" />
                    <Label htmlFor="apple-pay">Apple Pay</Label>
                  </div>
                  <Switch id="apple-pay" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img src="/google-pay-icon.svg" alt="Google Pay" className="h-5 w-5" />
                    <Label htmlFor="google-pay">Google Pay</Label>
                  </div>
                  <Switch id="google-pay" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                  <Save className="mr-2 h-4 w-4" />
                  {isSubmitting ? "Enregistrement..." : "Enregistrer les modifications"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        {/* Paramètres d'email */}
        <TabsContent value="email" className="space-y-6">
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Configuration des emails</CardTitle>
                <CardDescription>Configurez les paramètres d'envoi d'emails</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="smtp-host">Serveur SMTP</Label>
                  <Input id="smtp-host" defaultValue="smtp.example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-port">Port SMTP</Label>
                  <Input id="smtp-port" defaultValue="587" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-username">Nom d'utilisateur SMTP</Label>
                  <Input id="smtp-username" defaultValue="contact@naturel-shop-maktaba.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-password">Mot de passe SMTP</Label>
                  <Input id="smtp-password" type="password" defaultValue="••••••••••••" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                  <Save className="mr-2 h-4 w-4" />
                  {isSubmitting ? "Enregistrement..." : "Enregistrer les modifications"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        {/* Paramètres de notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Configurez les notifications que vous souhaitez recevoir</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="new-order">Nouvelle commande</Label>
                    <p className="text-sm text-gray-500">Recevoir une notification pour chaque nouvelle commande</p>
                  </div>
                  <Switch id="new-order" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="low-stock">Stock faible</Label>
                    <p className="text-sm text-gray-500">
                      Recevoir une notification lorsqu'un produit est en stock faible
                    </p>
                  </div>
                  <Switch id="low-stock" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="new-customer">Nouveau client</Label>
                    <p className="text-sm text-gray-500">Recevoir une notification pour chaque nouveau client</p>
                  </div>
                  <Switch id="new-customer" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                  <Save className="mr-2 h-4 w-4" />
                  {isSubmitting ? "Enregistrement..." : "Enregistrer les modifications"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        {/* Paramètres de sécurité */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Sécurité</CardTitle>
                <CardDescription>Configurez les paramètres de sécurité de votre boutique</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="two-factor">Authentification à deux facteurs</Label>
                    <p className="text-sm text-gray-500">
                      Activer l'authentification à deux facteurs pour votre compte
                    </p>
                  </div>
                  <Switch id="two-factor" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="ssl">SSL</Label>
                    <p className="text-sm text-gray-500">Forcer l'utilisation de HTTPS pour toutes les pages</p>
                  </div>
                  <Switch id="ssl" defaultChecked />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                  <Save className="mr-2 h-4 w-4" />
                  {isSubmitting ? "Enregistrement..." : "Enregistrer les modifications"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        {/* Paramètres avancés */}
        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Paramètres avancés</CardTitle>
                <CardDescription>Configurez les paramètres avancés de votre boutique</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="maintenance-mode">Mode maintenance</Label>
                  <div className="flex items-center space-x-2">
                    <Switch id="maintenance-mode" />
                    <Label htmlFor="maintenance-mode">Activer le mode maintenance</Label>
                  </div>
                  <p className="text-sm text-gray-500">
                    Lorsque le mode maintenance est activé, seuls les administrateurs peuvent accéder à la boutique.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cache">Cache</Label>
                  <div className="flex items-center space-x-2">
                    <Switch id="cache" defaultChecked />
                    <Label htmlFor="cache">Activer le cache</Label>
                  </div>
                  <p className="text-sm text-gray-500">
                    Activer le cache pour améliorer les performances de votre boutique.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                  <Save className="mr-2 h-4 w-4" />
                  {isSubmitting ? "Enregistrement..." : "Enregistrer les modifications"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

