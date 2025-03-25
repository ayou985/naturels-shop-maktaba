import Image from "next/image"
import Link from "next/link"
import { products, categories } from "@/lib/data"
import { Breadcrumb } from "@/components/breadcrumb"

export default function CategoryPage({ params }: { params: { id: string } }) {
  const category = categories.find((c) => c.id === params.id)
  const categoryProducts = products.filter(
    (p) =>
      p.category.toLowerCase() === params.id ||
      (params.id === "books" && p.category === "Livres") ||
      (params.id === "perfumes" && (p.category === "Parfums" || p.category === "Huiles")) ||
      (params.id === "kids" && p.category === "Enfants") ||
      (params.id === "clothing" && p.category === "Vêtements") ||
      (params.id === "accessories" && p.category === "Accessoires") ||
      (params.id === "other" && p.category === "Autre"),
  )

  if (!category) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Catégorie non trouvée</h1>
        <p className="mb-6">Désolé, la catégorie que vous recherchez n'existe pas.</p>
        <Link
          href="/boutique"
          className="rounded-md bg-emerald-800 px-6 py-3 text-white transition-colors hover:bg-emerald-700"
        >
          Retour à la boutique
        </Link>
      </div>
    )
  }

  // Créer les éléments du fil d'Ariane
  const breadcrumbItems = [
    { label: "Accueil", href: "/" },
    { label: "Boutique", href: "/boutique" },
    { label: category.name },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Fil d'Ariane */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Header */}
        <div className="relative h-[300px] overflow-hidden rounded-lg mb-8">
          <Image src={category.image || "/placeholder.svg"} alt={category.name} fill className="object-cover" />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl font-bold">{category.name}</h1>
              <p className="mt-2 text-lg">Découvrez notre sélection de {category.name.toLowerCase()}</p>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/boutique"
              className="rounded-full border border-emerald-800 px-4 py-2 text-sm font-medium text-emerald-800 transition-colors hover:bg-emerald-800 hover:text-white"
            >
              Tous les produits
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.id}`}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  cat.id === params.id
                    ? "bg-emerald-800 text-white"
                    : "border border-emerald-800 text-emerald-800 hover:bg-emerald-800 hover:text-white"
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="py-8">
          {categoryProducts.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-700 mb-4">Aucun produit trouvé</h2>
              <p className="text-gray-600 mb-6">Nous n'avons pas encore de produits dans cette catégorie.</p>
              <Link
                href="/boutique"
                className="rounded-md bg-emerald-800 px-6 py-3 text-white transition-colors hover:bg-emerald-700"
              >
                Voir tous les produits
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {categoryProducts.map((product) => (
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
          )}
        </div>
      </div>
    </div>
  )
}

