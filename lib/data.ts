export const categories = [
  {
    id: "homme-garcon",
    name: "Homme & Garçon",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-3.jpg-ocR1JoIDBFTn5wUdvc6tUfg3ut43aE.jpeg", // Image masculine
  },
  {
    id: "femme-fille",
    name: "Femme & Fille",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-4.jpg-RQ5xCE9eul9hdmhCDHiy2Tppg6uxeG.jpeg", // Abaya image
  },
  {
    id: "alimentation-cosmetiques",
    name: "Alimentation & Cosmétiques",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-5.jpg-SlYm7iLSWFjS3nH45jitSe2FrieRe5.jpeg", // Huiles image
  },
  {
    id: "jeux-jouets",
    name: "Jeux & Jouets",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-1.jpg-9SCGHNtTTmLIipD4pqEBZIsUOlGqN6.jpeg", // Kids products image
  },
  {
    id: "livres-enfant",
    name: "Livres Enfant",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-2.jpg-EqbiihwWs08cgsJ3in55mEK0BqBSiF.jpeg", // Book image
  },
  {
    id: "autre",
    name: "Autre",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-7.jpg-6sQBuVjPmDMnRoevNh6dmEF3jrCsSr.jpeg", // Logo image for "Other" category
  },
]

export const products = [
  // Homme & Garçon
  {
    id: "1",
    name: "Ensemble Blanc avec Détails Turquoise",
    price: 75.5,
    description: "Ensemble élégant blanc avec détails turquoise, parfait pour toutes occasions.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-3.jpg-ocR1JoIDBFTn5wUdvc6tUfg3ut43aE.jpeg",
    category: "Homme & Garçon",
  },

  // Femme & Fille
  {
    id: "2",
    name: "Abaya Jamila - Vert Clair",
    price: 89.99,
    description: "Élégante abaya de haute qualité en vert pastel.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-4.jpg-RQ5xCE9eul9hdmhCDHiy2Tppg6uxeG.jpeg",
    category: "Femme & Fille",
  },
  {
    id: "3",
    name: "Abaya Jamila - Vert Olive",
    price: 89.99,
    description: "Élégante abaya de haute qualité en vert olive.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-4.jpg-RQ5xCE9eul9hdmhCDHiy2Tppg6uxeG.jpeg",
    category: "Femme & Fille",
  },

  // Alimentation & Cosmétiques
  {
    id: "4",
    name: "Huile de Nigelle Habachiya",
    price: 24.99,
    description: "Une huile de nigelle pure et de haute qualité, originaire d'Éthiopie.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-5.jpg-SlYm7iLSWFjS3nH45jitSe2FrieRe5.jpeg",
    category: "Alimentation & Cosmétiques",
  },
  {
    id: "5",
    name: "Absoluta Collection Prestige",
    price: 59.99,
    description: "Un parfum de luxe aux notes délicates et raffinées.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-8.jpg-dLIW1VYMD2rFQRQtcf1jGkg6uotGtX.jpeg",
    category: "Alimentation & Cosmétiques",
  },
  {
    id: "6",
    name: "Saphir Vanille - Les Princes du Golfe",
    price: 79.99,
    description: "Parfum de luxe aux notes de vanille, par Les Princes du Golfe.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-5.jpg-SlYm7iLSWFjS3nH45jitSe2FrieRe5.jpeg",
    category: "Alimentation & Cosmétiques",
  },

  // Jeux & Jouets
  {
    id: "7",
    name: "Mon Nounours Sâlah",
    price: 29.99,
    description: "Un adorable ours en peluche éducatif qui aide les enfants à apprendre la prière.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-1.jpg-9SCGHNtTTmLIipD4pqEBZIsUOlGqN6.jpeg",
    category: "Jeux & Jouets",
  },
  {
    id: "8",
    name: "Alphabet Arabe Interactif",
    price: 34.99,
    description: "Boîte éducative pour apprendre l'alphabet arabe de façon interactive.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-1.jpg-9SCGHNtTTmLIipD4pqEBZIsUOlGqN6.jpeg",
    category: "Jeux & Jouets",
  },

  // Livres Enfant
  {
    id: "9",
    name: "Leçons de Tawhid pour Enfants",
    price: 15.99,
    description: "Un livre essentiel sur les fondements de la foi islamique, adapté pour les enfants.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-2.jpg-EqbiihwWs08cgsJ3in55mEK0BqBSiF.jpeg",
    category: "Livres Enfant",
  },
  {
    id: "10",
    name: "J'apprends la purification",
    price: 12.99,
    description: "Livre éducatif pour enfants sur les règles de purification en Islam.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-1.jpg-9SCGHNtTTmLIipD4pqEBZIsUOlGqN6.jpeg",
    category: "Livres Enfant",
  },

  // Autre
  {
    id: "11",
    name: "Montre Al-Harameen",
    price: 65.0,
    description: "Montre digitale avec horaires de prière intégrés.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-6.jpg-cXTne22uhGKDo7oox26p3dLssxcsUS.jpeg",
    category: "Autre",
  },
  {
    id: "12",
    name: "Les Plus Beaux Récits des Savants",
    price: 18.5,
    description: "Une collection inspirante des histoires et enseignements des grands savants de l'Islam.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-6.jpg-cXTne22uhGKDo7oox26p3dLssxcsUS.jpeg",
    category: "Autre",
  },
]

// Fonction pour obtenir les produits en promotion
export function getPromotionProducts() {
  // Pour la démo, on considère que les produits avec ID 2, 5 et 8 sont en promotion
  return products
    .filter((product) => ["2", "5", "8"].includes(product.id.toString()))
    .map((product) => ({
      ...product,
      isOnSale: true,
      oldPrice: product.price * 1.2, // Prix original 20% plus élevé
    }))
}

// Fonction pour obtenir les nouveaux produits
export function getNewProducts() {
  // Pour la démo, on considère que les produits avec ID 1, 4, 7 et 10 sont nouveaux
  return products
    .filter((product) => ["1", "4", "7", "10"].includes(product.id.toString()))
    .map((product) => ({
      ...product,
      isNew: true,
    }))
}

export function getFeaturedProducts() {
  return products
}

export const allImages = [
  {
    id: "logo",
    name: "Logo Naturel shop Maktaba",
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-7.jpg-6sQBuVjPmDMnRoevNh6dmEF3jrCsSr.jpeg",
  },
  {
    id: "tawhid",
    name: "Leçons de Tawhid",
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-2.jpg-EqbiihwWs08cgsJ3in55mEK0BqBSiF.jpeg",
  },
  {
    id: "absoluta",
    name: "Parfum Absoluta",
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-8.jpg-dLIW1VYMD2rFQRQtcf1jGkg6uotGtX.jpeg",
  },
  {
    id: "recits-montre",
    name: "Récits des Savants et Montre",
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-6.jpg-cXTne22uhGKDo7oox26p3dLssxcsUS.jpeg",
  },
  {
    id: "enfants",
    name: "Produits pour Enfants",
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-1.jpg-9SCGHNtTTmLIipD4pqEBZIsUOlGqN6.jpeg",
  },
  {
    id: "abayas",
    name: "Abayas Jamila",
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-4.jpg-RQ5xCE9eul9hdmhCDHiy2Tppg6uxeG.jpeg",
  },
  {
    id: "huiles-parfums",
    name: "Huiles et Parfums",
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-5.jpg-SlYm7iLSWFjS3nH45jitSe2FrieRe5.jpeg",
  },
  {
    id: "vetements",
    name: "Vêtements",
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-3.jpg-ocR1JoIDBFTn5wUdvc6tUfg3ut43aE.jpeg",
  },
]

