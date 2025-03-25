"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Calendar, Download, TrendingUp, Users, ShoppingBag, DollarSign } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Données simulées pour les graphiques
const salesData = [
  { name: "Jan", ventes: 4000 },
  { name: "Fév", ventes: 3000 },
  { name: "Mar", ventes: 5000 },
  { name: "Avr", ventes: 4500 },
  { name: "Mai", ventes: 6000 },
  { name: "Juin", ventes: 5500 },
  { name: "Juil", ventes: 7000 },
  { name: "Août", ventes: 6500 },
  { name: "Sep", ventes: 8000 },
  { name: "Oct", ventes: 7500 },
  { name: "Nov", ventes: 9000 },
  { name: "Déc", ventes: 10000 },
]

const categoryData = [
  { name: "Livres", value: 35 },
  { name: "Parfums", value: 25 },
  { name: "Huiles", value: 15 },
  { name: "Enfants", value: 10 },
  { name: "Vêtements", value: 10 },
  { name: "Accessoires", value: 5 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82ca9d"]

const topProducts = [
  { name: "Leçons de Tawhid", ventes: 120 },
  { name: "Absoluta Collection Prestige", ventes: 98 },
  { name: "Huile de Nigelle Habachiya", ventes: 86 },
  { name: "Mon Nounours Sâlah", ventes: 72 },
  { name: "Abaya Jamila - Vert Clair", ventes: 65 },
]

const visitorData = [
  { name: "Lun", visiteurs: 120, conversions: 12 },
  { name: "Mar", visiteurs: 150, conversions: 15 },
  { name: "Mer", visiteurs: 180, conversions: 18 },
  { name: "Jeu", visiteurs: 200, conversions: 20 },
  { name: "Ven", visiteurs: 250, conversions: 25 },
  { name: "Sam", visiteurs: 300, conversions: 30 },
  { name: "Dim", visiteurs: 220, conversions: 22 },
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("year")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Statistiques</h2>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Période" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Cette semaine</SelectItem>
              <SelectItem value="month">Ce mois</SelectItem>
              <SelectItem value="quarter">Ce trimestre</SelectItem>
              <SelectItem value="year">Cette année</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
        </div>
      </div>

      {/* Statistiques principales */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Ventes totales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">54,385.00 €</div>
            <p className="text-xs text-green-600">+12.5% par rapport à l'année précédente</p>
            <div className="mt-4 h-[60px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData.slice(-6)}>
                  <Line type="monotone" dataKey="ventes" stroke="#10b981" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Commandes</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">542</div>
            <p className="text-xs text-green-600">+8.2% par rapport à l'année précédente</p>
            <div className="mt-4 h-[60px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData.slice(-6)}>
                  <Bar dataKey="ventes" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,428</div>
            <p className="text-xs text-green-600">+24.5% par rapport à l'année précédente</p>
            <div className="mt-4 h-[60px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData.slice(-6)}>
                  <Line type="monotone" dataKey="ventes" stroke="#10b981" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Taux de conversion</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2%</div>
            <p className="text-xs text-red-600">-0.4% par rapport à l'année précédente</p>
            <div className="mt-4 h-[60px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={visitorData}>
                  <Line type="monotone" dataKey="conversions" stroke="#10b981" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Graphiques détaillés */}
      <Tabs defaultValue="sales">
        <TabsList>
          <TabsTrigger value="sales">Ventes</TabsTrigger>
          <TabsTrigger value="products">Produits</TabsTrigger>
          <TabsTrigger value="visitors">Visiteurs</TabsTrigger>
        </TabsList>
        <TabsContent value="sales" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Évolution des ventes</CardTitle>
              <CardDescription>Évolution des ventes sur les 12 derniers mois</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="ventes" fill="#10b981" name="Ventes (€)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Répartition par catégorie</CardTitle>
                <CardDescription>Pourcentage des ventes par catégorie de produits</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Produits les plus vendus</CardTitle>
                <CardDescription>Top 5 des produits les plus vendus</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={topProducts} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={150} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="ventes" fill="#10b981" name="Unités vendues" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance des produits</CardTitle>
              <CardDescription>Analyse détaillée des performances par produit</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topProducts} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="ventes" fill="#10b981" name="Unités vendues" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="visitors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Visiteurs et conversions</CardTitle>
              <CardDescription>Analyse du trafic et des conversions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={visitorData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="visiteurs"
                      stroke="#8884d8"
                      name="Visiteurs"
                      activeDot={{ r: 8 }}
                    />
                    <Line yAxisId="right" type="monotone" dataKey="conversions" stroke="#10b981" name="Conversions" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Calendrier des ventes */}
      <Card>
        <CardHeader className="flex flex-row items-center">
          <div>
            <CardTitle>Calendrier des ventes</CardTitle>
            <CardDescription>Visualisation des ventes par jour</CardDescription>
          </div>
          <Button variant="outline" size="icon" className="ml-auto">
            <Calendar className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="text-center text-sm text-gray-500">Fonctionnalité en cours de développement</div>
        </CardContent>
      </Card>
    </div>
  )
}

