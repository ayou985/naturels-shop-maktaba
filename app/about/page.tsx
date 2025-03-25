import Link from "next/link"
import { Book, Users, Award, Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-emerald-800 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold">À Propos de Nous</h1>
          <p className="mt-4 text-lg">Découvrez les valeurs de Naturel shop Maktaba</p>
        </div>
      </div>

      {/* Our Values */}
      <section className="bg-emerald-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-emerald-800">Nos Valeurs</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-800 text-white">
                <Book className="h-8 w-8" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">Authenticité</h3>
              <p className="mt-2 text-gray-600">
                Nous nous engageons à proposer uniquement des produits authentiques et conformes aux enseignements
                islamiques.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-800 text-white">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">Qualité</h3>
              <p className="mt-2 text-gray-600">
                Nous sélectionnons rigoureusement nos produits pour garantir une qualité irréprochable à nos clients.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-800 text-white">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">Communauté</h3>
              <p className="mt-2 text-gray-600">
                Nous soutenons la communauté musulmane en proposant des produits qui facilitent la pratique de l'Islam
                au quotidien.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-800 text-white">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">Service</h3>
              <p className="mt-2 text-gray-600">
                Nous nous efforçons d'offrir un service client exceptionnel et une expérience d'achat agréable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-emerald-800 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold">Rejoignez Notre Communauté</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg">
            Découvrez notre sélection de produits islamiques authentiques et de qualité. Nous sommes là pour vous
            accompagner dans votre pratique quotidienne de l'Islam.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/boutique"
              className="rounded-md bg-white px-6 py-3 font-medium text-emerald-800 transition-colors hover:bg-gray-100"
            >
              Découvrir nos produits
            </Link>
            <Link
              href="/contact"
              className="rounded-md border border-white px-6 py-3 font-medium text-white transition-colors hover:bg-emerald-700"
            >
              Contactez-nous
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

