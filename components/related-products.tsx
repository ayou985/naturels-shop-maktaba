import { products } from "@/lib/data"
import ProductCard from "@/components/product-card"

interface RelatedProductsProps {
  currentProductId: string | number
  category: string
  limit?: number
}

export function RelatedProducts({ currentProductId, category, limit = 4 }: RelatedProductsProps) {
  // Filter products by category and exclude current product
  const relatedProducts = products
    .filter(
      (product) =>
        product.category.toLowerCase() === category.toLowerCase() &&
        product.id.toString() !== currentProductId.toString(),
    )
    .slice(0, limit)

  if (relatedProducts.length === 0) {
    return null
  }

  return (
    <section className="py-12">
      <h2 className="mb-8 text-2xl font-bold text-emerald-800">Produits similaires</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

