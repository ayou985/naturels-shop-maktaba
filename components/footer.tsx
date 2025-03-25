import Link from "next/link"
import Image from "next/image"
import { Mail, Phone } from "lucide-react"
import { categories } from "@/lib/data"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-emerald-900 text-white">
      {/* Newsletter */}
      <div className="border-b border-emerald-800 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div>
              <h3 className="text-xl font-bold">Inscrivez-vous à notre newsletter</h3>
              <p className="mt-1 text-emerald-100">Recevez nos dernières offres et nouveautés</p>
            </div>
            <div className="w-full max-w-md">
              <form className="flex">
                <Input
                  type="email"
                  placeholder="Votre adresse email"
                  className="flex-1 rounded-r-none border-emerald-700 bg-emerald-800 text-white placeholder:text-emerald-300"
                />
                <Button className="rounded-l-none bg-white text-emerald-800 hover:bg-gray-100">S'inscrire</Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="relative h-10 w-10 overflow-hidden rounded-full bg-white">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-7.jpg-6sQBuVjPmDMnRoevNh6dmEF3jrCsSr.jpeg"
                  alt="Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-lg font-bold">naturel shop maktaba</h3>
            </div>
            <p className="mb-4 text-emerald-100">
              Votre boutique en ligne de produits islamiques authentiques et naturels. Nous proposons une large gamme de
              produits pour toute la famille.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://wa.me/0652657508"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-800 text-emerald-100 transition-colors hover:bg-emerald-700 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                </svg>
                <span className="sr-only">WhatsApp</span>
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Catégories</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/categories/${category.id}`}
                    className="flex items-center text-emerald-100 transition-colors hover:text-white"
                  >
                    <span className="mr-2 text-xs">▶</span>
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Informations</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="flex items-center text-emerald-100 transition-colors hover:text-white">
                  <span className="mr-2 text-xs">▶</span>À propos de nous
                </Link>
              </li>
              <li>
                <Link href="/contact" className="flex items-center text-emerald-100 transition-colors hover:text-white">
                  <span className="mr-2 text-xs">▶</span>
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="flex items-center text-emerald-100 transition-colors hover:text-white"
                >
                  <span className="mr-2 text-xs">▶</span>
                  Livraison
                </Link>
              </li>
              <li>
                <Link href="/terms" className="flex items-center text-emerald-100 transition-colors hover:text-white">
                  <span className="mr-2 text-xs">▶</span>
                  Conditions générales
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="flex items-center text-emerald-100 transition-colors hover:text-white">
                  <span className="mr-2 text-xs">▶</span>
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link href="/faq" className="flex items-center text-emerald-100 transition-colors hover:text-white">
                  <span className="mr-2 text-xs">▶</span>
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 shrink-0 text-emerald-300" />
                <span className="text-emerald-100">0652657508</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 shrink-0 text-emerald-300" />
                <span className="text-emerald-100">mdf783@hotmail.fr</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-emerald-800 bg-emerald-950 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-emerald-200">
              © {new Date().getFullYear()} naturel shop maktaba. Tous droits réservés.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

