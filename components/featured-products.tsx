import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function FeaturedProducts() {
  return (
    <section className="py-12 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Produits Vedettes</h2>
          <Link href="/products" className="flex items-center text-sm font-medium text-green-600 hover:text-green-700">
            Voir tous les produits
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="overflow-hidden">
            <div className="relative h-[200px] sm:h-[250px]">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-2.jpg-EqbiihwWs08cgsJ3in55mEK0BqBSiF.jpeg"
                alt="Leçons de Tawhid"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 text-white">
                <h3 className="text-xl font-bold">Livres Islamiques</h3>
                <p className="text-sm opacity-90">Découvrez notre collection</p>
              </div>
            </div>
            <CardContent className="p-4">
              <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                <Link href="/categories/books">Explorer</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <div className="relative h-[200px] sm:h-[250px]">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-5.jpg-SlYm7iLSWFjS3nH45jitSe2FrieRe5.jpeg"
                alt="Parfums et Huiles"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 text-white">
                <h3 className="text-xl font-bold">Parfums & Huiles</h3>
                <p className="text-sm opacity-90">Senteurs naturelles</p>
              </div>
            </div>
            <CardContent className="p-4">
              <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                <Link href="/categories/perfumes">Explorer</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <div className="relative h-[200px] sm:h-[250px]">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-1.jpg-9SCGHNtTTmLIipD4pqEBZIsUOlGqN6.jpeg"
                alt="Produits pour Enfants"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 text-white">
                <h3 className="text-xl font-bold">Pour les Enfants</h3>
                <p className="text-sm opacity-90">Éducation et jeux</p>
              </div>
            </div>
            <CardContent className="p-4">
              <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                <Link href="/categories/kids">Explorer</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

