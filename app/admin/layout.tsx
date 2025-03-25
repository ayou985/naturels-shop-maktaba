"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  BarChart,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Bell,
  Search,
  HelpCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { LogoutButton } from "@/components/logout-button"
import { useAuth } from "@/components/auth-provider"
import { Skeleton } from "@/components/ui/skeleton"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  // Vérifier si l'écran est mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false)
      } else {
        setIsSidebarOpen(true)
      }
    }

    checkIsMobile()
    window.addEventListener("resize", checkIsMobile)
    return () => window.removeEventListener("resize", checkIsMobile)
  }, [])

  // Vérifier l'authentification
  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      router.push("/login?redirect=/admin")
    }
  }, [user, isLoading, router])

  // Afficher un écran de chargement pendant la vérification de l'authentification
  if (isLoading || !user || user.role !== "admin") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="w-full max-w-md space-y-4 rounded-lg bg-white p-6 shadow-md">
          <div className="flex justify-center">
            <Skeleton className="h-12 w-12 rounded-full" />
          </div>
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <div className="flex justify-center">
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </div>
    )
  }

  const navigation = [
    { name: "Tableau de bord", href: "/admin", icon: LayoutDashboard },
    { name: "Produits", href: "/admin/products", icon: Package },
    { name: "Commandes", href: "/admin/orders", icon: ShoppingCart },
    { name: "Clients", href: "/admin/customers", icon: Users },
    { name: "Statistiques", href: "/admin/analytics", icon: BarChart },
    { name: "Paramètres", href: "/admin/settings", icon: Settings },
  ]

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`)
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar for desktop */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-emerald-800 transition-transform duration-300 lg:static lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar header */}
          <div className="flex h-16 items-center justify-between border-b border-emerald-700 px-4">
            <Link href="/admin" className="flex items-center">
              <div className="relative h-8 w-8 overflow-hidden rounded-full">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-7.jpg-6sQBuVjPmDMnRoevNh6dmEF3jrCsSr.jpeg"
                  alt="Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="ml-2 text-lg font-bold text-white">Admin Panel</span>
            </Link>
            {isMobile && (
              <Button variant="ghost" size="icon" className="text-white" onClick={() => setIsSidebarOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            )}
          </div>

          {/* Sidebar content */}
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                  isActive(item.href)
                    ? "bg-emerald-700 text-white"
                    : "text-emerald-100 hover:bg-emerald-700 hover:text-white"
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Sidebar footer */}
          <div className="border-t border-emerald-700 p-4">
            <Link href="/" className="flex items-center text-emerald-100 hover:text-white">
              <LogOut className="mr-3 h-5 w-5" />
              Retour au site
            </Link>
          </div>
        </div>
      </aside>

      {/* Mobile sidebar */}
      <Sheet open={isMobile && isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent side="left" className="w-[250px] bg-emerald-800 p-0">
          <div className="flex h-full flex-col">
            {/* Mobile sidebar header */}
            <div className="flex h-16 items-center justify-between border-b border-emerald-700 px-4">
              <Link href="/admin" className="flex items-center">
                <div className="relative h-8 w-8 overflow-hidden rounded-full">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-7.jpg-6sQBuVjPmDMnRoevNh6dmEF3jrCsSr.jpeg"
                    alt="Logo"
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="ml-2 text-lg font-bold text-white">Admin Panel</span>
              </Link>
              <Button variant="ghost" size="icon" className="text-white" onClick={() => setIsSidebarOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Mobile sidebar content */}
            <nav className="flex-1 space-y-1 px-2 py-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                    isActive(item.href)
                      ? "bg-emerald-700 text-white"
                      : "text-emerald-100 hover:bg-emerald-700 hover:text-white"
                  }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Mobile sidebar footer */}
            <div className="border-t border-emerald-700 p-4">
              <Link href="/" className="flex items-center text-emerald-100 hover:text-white">
                <LogOut className="mr-3 h-5 w-5" />
                Retour au site
              </Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div className={`flex-1 ${isSidebarOpen && !isMobile ? "lg:ml-64" : ""}`}>
        {/* Top navbar */}
        <header className="sticky top-0 z-10 bg-white shadow">
          <div className="flex h-16 items-center justify-between px-4">
            <div className="flex items-center">
              <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsSidebarOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hidden lg:flex"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="ml-2 text-xl font-semibold text-gray-800">
                {navigation.find((item) => isActive(item.href))?.name || "Administration"}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative hidden md:block">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input placeholder="Rechercher..." className="w-[200px] pl-8 focus-visible:ring-emerald-500" />
              </div>

              {/* Help */}
              <Button variant="ghost" size="icon">
                <HelpCircle className="h-5 w-5" />
              </Button>

              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -right-1 -top-1 h-5 w-5 bg-emerald-800 p-0 text-xs">3</Badge>
              </Button>

              {/* User menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <div className="relative h-8 w-8 overflow-hidden rounded-full bg-emerald-200">
                      <span className="absolute inset-0 flex items-center justify-center text-sm font-medium text-emerald-800">
                        {user?.name?.charAt(0) || "A"}
                      </span>
                    </div>
                    <span className="ml-2 hidden md:block">{user?.name || "Admin"}</span>
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/admin/profile" className="flex w-full items-center">
                      Profil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/admin/settings" className="flex w-full items-center">
                      Paramètres
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogoutButton variant="link" className="w-full text-left" />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}

