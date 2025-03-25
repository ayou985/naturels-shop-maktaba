import Link from "next/link"
import { ArrowRight } from "lucide-react"

import ProductCard from "@/components/product-card"

interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
}

interface CategorySectionProps {
  title: string
  products: Product[]
}

export function CategorySection({ title, products }: CategorySectionProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">{title}</h3>
        <Link
          href={`/categories/${products[0].category}`}
          className="flex items-center text-sm font-medium text-green-600 hover:text-green-700"
        >
          Voir tout
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

