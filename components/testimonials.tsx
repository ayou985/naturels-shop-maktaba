import Image from "next/image"

import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    id: 1,
    name: "Mohammed A.",
    avatar: "/placeholder.svg?height=80&width=80",
    content:
      "J'ai commandé plusieurs livres et je suis très satisfait de la qualité. La livraison a été rapide et le service client est excellent. Je recommande vivement cette boutique !",
  },
  {
    id: 2,
    name: "Fatima B.",
    avatar: "/placeholder.svg?height=80&width=80",
    content:
      "Les parfums sont d'une qualité exceptionnelle et les prix sont très raisonnables. J'ai reçu ma commande bien emballée et en parfait état. Merci Naturel shop Maktaba !",
  },
  {
    id: 3,
    name: "Ahmed C.",
    avatar: "/placeholder.svg?height=80&width=80",
    content:
      "Mon fils adore son nounours Sâlah ! C'est un excellent moyen de lui apprendre la prière de façon ludique. Je suis très content de mon achat et je reviendrai certainement.",
  },
]

export function Testimonials() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-center text-3xl font-bold text-emerald-800">Ce que nos clients disent</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-4 w-4"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-gray-600">{testimonial.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

