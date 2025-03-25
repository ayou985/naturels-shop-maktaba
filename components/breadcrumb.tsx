import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex items-center flex-wrap">
        <li className="flex items-center">
          <Link href="/" className="flex items-center text-gray-500 hover:text-emerald-800">
            <Home className="h-4 w-4" />
            <span className="sr-only">Accueil</span>
          </Link>
          <ChevronRight className="mx-2 h-4 w-4 text-gray-400" />
        </li>

        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index === items.length - 1 ? (
              <span className="font-medium text-emerald-800">{item.label}</span>
            ) : (
              <>
                <Link href={item.href || "#"} className="text-gray-500 hover:text-emerald-800">
                  {item.label}
                </Link>
                <ChevronRight className="mx-2 h-4 w-4 text-gray-400" />
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

