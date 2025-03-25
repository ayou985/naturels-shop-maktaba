"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, ShoppingCart, Menu, X, User, Heart, ChevronDown, Phone, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { categories } from "@/lib/data"
import { useAuth } from "@/components/auth-provider"
import { LogoutButton } from "@/components/logout-button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const router = useRouter()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { user } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setIsSearchOpen(false)
      setSearchQuery("")
    }
  }

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? "shadow-md" : ""}`}>
      {/* Top Bar */}
      <div className="bg-emerald-800 py-2 text-white">
        <div className="container mx-auto flex items-center justify-between px-4">
          <div className="flex items-center text-sm">
            <div className="mr-6 hidden items-center md:flex">
              <Phone className="mr-2 h-4 w-4" />
              <span>0652657508</span>
            </div>
            <div className="hidden items-center md:flex">
              <Mail className="mr-2 h-4 w-4" />
              <span>mdf783@hotmail.fr</span>
            </div>
            <span className="md:hidden">Bienvenue chez Naturel shop Maktaba</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/shipping" className="text-sm hover:underline">
              Livraison
            </Link>
            <Link href="/contact" className="text-sm hover:underline">
              Contact
            </Link>
            <Link href="/about" className="text-sm hover:underline">
              À propos
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col gap-6 py-4">
                  <Link href="/" className="flex items-center gap-2">
                    <div className="relative h-10 w-10">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-7.jpg-6sQBuVjPmDMnRoevNh6dmEF3jrCsSr.jpeg"
                        alt="Logo"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="text-xl font-bold">naturel shop maktaba</span>
                  </Link>
                  <div className="flex flex-col space-y-3">
                    <Link href="/" className="text-lg font-medium transition-colors hover:text-emerald-800">
                      Accueil
                    </Link>
                    <Link href="/boutique" className="text-lg font-medium transition-colors hover:text-emerald-800">
                      Boutique
                    </Link>
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/categories/${category.id}`}
                        className="pl-4 text-lg transition-colors hover:text-emerald-800"
                      >
                        {category.name}
                      </Link>
                    ))}
                    <Link href="/about" className="text-lg font-medium transition-colors hover:text-emerald-800">
                      À propos
                    </Link>
                    <Link href="/contact" className="text-lg font-medium transition-colors hover:text-emerald-800">
                      Contact
                    </Link>
                    <div className="pt-4">
                      {user ? (
                        <>
                          <Link
                            href="/account"
                            className="flex items-center text-lg font-medium transition-colors hover:text-emerald-800"
                          >
                            <User className="mr-2 h-5 w-5" />
                            Mon Compte
                          </Link>
                          {user.role === "admin" && (
                            <Link
                              href="/admin"
                              className="flex items-center text-lg font-medium transition-colors hover:text-emerald-800 mt-2"
                            >
                              <User className="mr-2 h-5 w-5" />
                              Administration
                            </Link>
                          )}
                          <div className="mt-2">
                            <LogoutButton variant="link" />
                          </div>
                        </>
                      ) : (
                        <Link
                          href="/login"
                          className="flex items-center text-lg font-medium transition-colors hover:text-emerald-800"
                        >
                          <User className="mr-2 h-5 w-5" />
                          Connexion
                        </Link>
                      )}
                    </div>
                    <Link
                      href="/wishlist"
                      className="flex items-center text-lg font-medium transition-colors hover:text-emerald-800"
                    >
                      <Heart className="mr-2 h-5 w-5" />
                      Mes Favoris
                    </Link>
                    <Link
                      href="/cart"
                      className="flex items-center text-lg font-medium transition-colors hover:text-emerald-800"
                    >
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Mon Panier
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-12 w-12 overflow-hidden rounded-full">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-7.jpg-6sQBuVjPmDMnRoevNh6dmEF3jrCsSr.jpeg"
                  alt="Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="hidden text-xl font-bold md:inline">naturel shop maktaba</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <ul className="flex space-x-8">
                <li>
                  <Link href="/" className="font-medium transition-colors hover:text-emerald-800">
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link href="/boutique" className="font-medium transition-colors hover:text-emerald-800">
                    Boutique
                  </Link>
                </li>
                <li className="group relative">
                  <span className="flex cursor-pointer items-center font-medium transition-colors hover:text-emerald-800">
                    Catégories
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </span>
                  <div className="absolute left-0 top-full z-10 mt-2 hidden w-48 rounded-md bg-white p-2 shadow-lg group-hover:block">
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/categories/${category.id}`}
                        className="flex items-center rounded-md px-4 py-2 transition-colors hover:bg-emerald-50 hover:text-emerald-800"
                      >
                        <div className="relative mr-2 h-6 w-6 overflow-hidden rounded-full">
                          <Image
                            src={category.image || "/placeholder.svg"}
                            alt={category.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </li>
                <li>
                  <Link href="/about" className="font-medium transition-colors hover:text-emerald-800">
                    À propos
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="font-medium transition-colors hover:text-emerald-800">
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              {isSearchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center">
                  <Input
                    type="search"
                    placeholder="Rechercher..."
                    className="w-full max-w-[200px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                  <Button type="submit" variant="ghost" size="icon" className="ml-1">
                    <Search className="h-5 w-5" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setIsSearchOpen(false)
                      setSearchQuery("")
                    }}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </form>
              ) : (
                <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
                  <Search className="h-5 w-5" />
                  <span className="sr-only">Rechercher</span>
                </Button>
              )}
              <Link href="/wishlist">
                <Button variant="ghost" size="icon" className="relative">
                  <Heart className="h-5 w-5" />
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-800 text-xs text-white">
                    3
                  </span>
                  <span className="sr-only">Favoris</span>
                </Button>
              </Link>

              {/* Si l'utilisateur est connecté, ajouter un menu déroulant avec l'option de déconnexion */}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="hidden sm:flex">
                      <User className="h-5 w-5" />
                      <span className="sr-only">Compte</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/account">Mon compte</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/account/orders">Mes commandes</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/wishlist">Mes favoris</Link>
                    </DropdownMenuItem>
                    {user.role === "admin" && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href="/admin">Administration</Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <LogoutButton variant="link" className="w-full text-left" />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/login">
                  <Button variant="ghost" size="icon" className="hidden sm:flex">
                    <User className="h-5 w-5" />
                    <span className="sr-only">Connexion</span>
                  </Button>
                </Link>
              )}

              <Link href="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-800 text-xs text-white">
                    2
                  </span>
                  <span className="sr-only">Panier</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

