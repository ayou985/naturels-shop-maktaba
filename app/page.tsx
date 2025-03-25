import Image from "next/image"
import Link from "next/link"
import { categories, getNewProducts, getPromotionProducts, allImages } from "@/lib/data"
import { ArrowRight, ShoppingBag, Star, Tag } from "lucide-react"
import { Features } from "@/components/features"
import { Newsletter } from "@/components/newsletter"
import ProductCard from "@/components/product-card"

export default function Home() {
  const newProducts = getNewProducts()
  const promotionProducts = getPromotionProducts()

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <div className="relative">
        {/* Hero Background */}
        <div className="relative h-[600px] w-full overflow-hidden">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image.jpg-cWUh48DMrpgFMqF9bTnrIQuHNuJKPq.jpeg"
            alt="naturel shop maktaba"
            fill
            style={{ objectFit: "contain" }}
            priority
            className="bg-white"
          />
        </div>
      </div>

      {/* Promo Banner */}
      <div className="bg-emerald-900 py-3 text-center text-white">
        <div className="container mx-auto px-4">
          <p className="text-sm md:text-base">
            <span className="font-bold">LIVRAISON GRATUITE</span> pour toute commande supérieure à 50€ |
            <span className="ml-2 underline">
              <Link href="/shipping">En savoir plus</Link>
            </span>
          </p>
        </div>
      </div>

      {/* Features Section */}
      <Features />

      {/* Category Sections */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl font-bold text-emerald-800">Nos Catégories</h2>
            <Link href="/boutique" className="flex items-center text-emerald-800 hover:underline">
              Voir tout <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-6">
            {categories.map((category) => (
              <div key={category.id} className="group overflow-hidden rounded-lg bg-emerald-800">
                <div className="aspect-[4/3] w-full">
                  <div className="relative h-full w-full">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      style={{ objectFit: "cover" }}
                      className="transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-xl font-bold text-white">{category.name}</h3>
                  <Link
                    href={`/categories/${category.id}`}
                    className="mt-2 inline-block rounded border border-white px-4 py-2 text-sm text-white transition-colors hover:bg-white hover:text-emerald-800"
                  >
                    Découvrir
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Promotions */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center">
            <Tag className="mr-3 h-6 w-6 text-emerald-800" />
            <h2 className="text-3xl font-bold text-emerald-800">Promotions</h2>
          </div>

          <div className="flex justify-center">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 max-w-3xl mx-auto">
              {promotionProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/boutique"
              className="inline-block rounded-md bg-emerald-800 px-6 py-3 text-white transition-colors hover:bg-emerald-700"
            >
              Voir toutes les promotions
            </Link>
          </div>
        </div>
      </div>

      {/* Banner */}
      <div className="bg-emerald-800 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="max-w-xl">
              <h2 className="text-3xl font-bold">Découvrez notre collection de produits islamiques</h2>
              <p className="mt-4 text-lg text-emerald-100">
                Une sélection rigoureuse de produits authentiques pour toute la famille.
              </p>
              <div className="mt-6 flex gap-4">
                <Link
                  href="/boutique"
                  className="rounded-md bg-white px-6 py-3 font-medium text-emerald-800 transition-colors hover:bg-gray-100"
                >
                  <ShoppingBag className="mr-2 inline-block h-5 w-5" />
                  Explorer
                </Link>
                <Link
                  href="/about"
                  className="rounded-md border border-white px-6 py-3 font-medium text-white transition-colors hover:bg-emerald-700"
                >
                  En savoir plus
                </Link>
              </div>
            </div>
            <div className="relative h-[300px] w-[300px]">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-2.jpg-EqbiihwWs08cgsJ3in55mEK0BqBSiF.jpeg"
                alt="Produits Islamiques"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* New Arrivals */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center">
            <Star className="mr-3 h-6 w-6 text-emerald-800" />
            <h2 className="text-3xl font-bold text-emerald-800">Nouveautés</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/boutique"
              className="inline-block rounded-md border border-emerald-800 px-6 py-3 text-emerald-800 transition-colors hover:bg-emerald-50"
            >
              Voir toutes les nouveautés
            </Link>
          </div>
        </div>
      </div>

      {/* All Products Gallery */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-bold text-emerald-800">Notre Catalogue</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {allImages.map((image) => (
              <div key={image.id} className="group overflow-hidden rounded-lg">
                <div className="aspect-square relative">
                  <Image
                    src={image.url || "/placeholder.svg"}
                    alt={image.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                    <Link
                      href="/boutique"
                      className="rounded-full bg-white p-3 text-emerald-800 transition-transform hover:scale-110"
                    >
                      <ShoppingBag className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <Newsletter />
    </div>
  )
}

