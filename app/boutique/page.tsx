import Image from "next/image"
import Link from "next/link"
import { products, categories } from "@/lib/data"

export default function BoutiquePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-emerald-800 py-12 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold">Notre Boutique</h1>
          <p className="mt-2 text-lg">Découvrez notre sélection de produits islamiques de qualité</p>
        </div>
      </div>

      {/* Categories */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/boutique"
            className="rounded-full bg-emerald-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
          >
            Tous les produits
          </Link>
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.id}`}
              className="rounded-full border border-emerald-800 px-4 py-2 text-sm font-medium text-emerald-800 transition-colors hover:bg-emerald-800 hover:text-white"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="group overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:shadow-md"
            >
              <Link href={`/produits/${product.id}`} className="block">
                <div className="relative aspect-square overflow-hidden">
                  <div className="absolute right-2 top-2 rounded-full bg-emerald-800 px-2 py-1 text-xs text-white">
                    {product.category}
                  </div>
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
              </Link>
              <div className="p-4">
                <Link href={`/produits/${product.id}`} className="block">
                  <h3 className="mb-2 text-lg font-medium hover:text-emerald-800">{product.name}</h3>
                </Link>
                <p className="mb-4 line-clamp-2 text-sm text-gray-600">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-emerald-800">{product.price.toFixed(2)} €</span>
                  <Link
                    href={`/produits/${product.id}`}
                    className="rounded-md bg-emerald-800 px-3 py-1 text-sm text-white transition-colors hover:bg-emerald-700"
                  >
                    Voir détails
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

