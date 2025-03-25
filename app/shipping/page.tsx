import { Truck, Package, Clock, CreditCard } from "lucide-react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function ShippingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-emerald-800 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold">Livraison & Retours</h1>
          <p className="mt-4 text-lg">Informations sur nos méthodes de livraison et notre politique de retour</p>
        </div>
      </div>

      {/* Shipping Methods */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-emerald-800">Nos Méthodes de Livraison</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-white p-6 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                <Truck className="h-8 w-8" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">Livraison Standard</h3>
              <p className="mt-2 text-gray-600">
                Livraison en 2-4 jours ouvrables pour toutes les commandes en France métropolitaine.
              </p>
              <p className="mt-4 text-lg font-bold text-emerald-800">4,99 €</p>
              <p className="mt-1 text-sm text-gray-600">Gratuit pour les commandes supérieures à 50 €</p>
            </div>

            <div className="rounded-lg bg-white p-6 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">Livraison Express</h3>
              <p className="mt-2 text-gray-600">
                Livraison en 24h pour les commandes passées avant 14h (jours ouvrables uniquement).
              </p>
              <p className="mt-4 text-lg font-bold text-emerald-800">9,99 €</p>
              <p className="mt-1 text-sm text-gray-600">Disponible en France métropolitaine</p>
            </div>

            <div className="rounded-lg bg-white p-6 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                <Package className="h-8 w-8" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">Livraison Internationale</h3>
              <p className="mt-2 text-gray-600">Livraison dans toute l'Europe et dans certains pays hors Europe.</p>
              <p className="mt-4 text-lg font-bold text-emerald-800">À partir de 12,99 €</p>
              <p className="mt-1 text-sm text-gray-600">Délais variables selon la destination</p>
            </div>
          </div>
        </div>
      </section>

      {/* Return Policy */}
      <section className="bg-emerald-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-bold text-emerald-800">Notre Politique de Retour</h2>
          <div className="mx-auto max-w-3xl rounded-lg bg-white p-8 shadow-sm">
            <p className="text-gray-600">
              Chez Naturel shop Maktaba, nous voulons que vous soyez entièrement satisfait de votre achat. Si pour une
              raison quelconque vous n'êtes pas satisfait, nous acceptons les retours selon les conditions suivantes :
            </p>

            <div className="mt-6 space-y-4">
              <div className="rounded-lg bg-emerald-50 p-4">
                <h3 className="font-semibold">Délai de retour</h3>
                <p className="mt-1 text-gray-600">
                  Vous disposez de 14 jours à compter de la réception de votre commande pour nous retourner un article.
                </p>
              </div>

              <div className="rounded-lg bg-emerald-50 p-4">
                <h3 className="font-semibold">Conditions des articles</h3>
                <p className="mt-1 text-gray-600">
                  Les articles doivent être retournés dans leur état d'origine, non utilisés, non endommagés et dans
                  leur emballage d'origine.
                </p>
              </div>

              <div className="rounded-lg bg-emerald-50 p-4">
                <h3 className="font-semibold">Procédure de retour</h3>
                <p className="mt-1 text-gray-600">
                  Pour effectuer un retour, veuillez nous contacter par email à returns@naturel-shop-maktaba.com ou par
                  téléphone au +33 1 23 45 67 89 pour obtenir un numéro d'autorisation de retour.
                </p>
              </div>

              <div className="rounded-lg bg-emerald-50 p-4">
                <h3 className="font-semibold">Remboursement</h3>
                <p className="mt-1 text-gray-600">
                  Une fois votre retour reçu et inspecté, nous vous enverrons un email pour vous informer que nous avons
                  reçu votre article. Nous vous informerons également de l'approbation ou du rejet de votre
                  remboursement. Si vous êtes approuvé, votre remboursement sera traité et un crédit sera
                  automatiquement appliqué à votre carte de crédit ou méthode de paiement originale.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-bold text-emerald-800">Questions Fréquentes</h2>
          <div className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Combien de temps faut-il pour traiter ma commande ?</AccordionTrigger>
                <AccordionContent>
                  Nous traitons généralement les commandes dans un délai de 24 à 48 heures ouvrables. Une fois votre
                  commande traitée, vous recevrez un email de confirmation avec les informations de suivi.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>Comment puis-je suivre ma commande ?</AccordionTrigger>
                <AccordionContent>
                  Une fois votre commande expédiée, vous recevrez un email contenant un numéro de suivi. Vous pouvez
                  utiliser ce numéro pour suivre votre colis sur le site du transporteur ou dans votre espace client sur
                  notre site.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>Livrez-vous à l'international ?</AccordionTrigger>
                <AccordionContent>
                  Oui, nous livrons dans toute l'Europe et dans certains pays hors Europe. Les frais de livraison et les
                  délais varient selon la destination. Vous pouvez voir les options disponibles lors du processus de
                  commande.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>Que faire si je reçois un article endommagé ?</AccordionTrigger>
                <AccordionContent>
                  Si vous recevez un article endommagé, veuillez nous contacter dans les 48 heures suivant la réception
                  avec des photos de l'article et de l'emballage. Nous vous enverrons un article de remplacement ou vous
                  proposerons un remboursement.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>Puis-je modifier ou annuler ma commande ?</AccordionTrigger>
                <AccordionContent>
                  Vous pouvez modifier ou annuler votre commande dans les 2 heures suivant le placement de celle-ci.
                  Veuillez nous contacter immédiatement par email ou par téléphone. Une fois que la commande est en
                  cours de traitement, nous ne pouvons plus la modifier ou l'annuler.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="bg-emerald-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-bold text-emerald-800">Méthodes de Paiement</h2>
          <div className="mx-auto max-w-3xl rounded-lg bg-white p-8 shadow-sm">
            <div className="flex items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                <CreditCard className="h-8 w-8" />
              </div>
            </div>
            <p className="mt-6 text-center text-gray-600">
              Nous acceptons plusieurs méthodes de paiement pour votre commodité :
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-lg bg-gray-100 p-4 text-center">
                <p className="font-semibold">Carte de Crédit</p>
              </div>
              <div className="rounded-lg bg-gray-100 p-4 text-center">
                <p className="font-semibold">PayPal</p>
              </div>
              <div className="rounded-lg bg-gray-100 p-4 text-center">
                <p className="font-semibold">Virement Bancaire</p>
              </div>
              <div className="rounded-lg bg-gray-100 p-4 text-center">
                <p className="font-semibold">Apple Pay</p>
              </div>
            </div>
            <p className="mt-6 text-center text-sm text-gray-600">
              Tous les paiements sont sécurisés et vos informations sont protégées.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

