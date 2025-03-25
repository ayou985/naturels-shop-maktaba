export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-emerald-800 border-t-transparent"></div>
        <h2 className="mt-4 text-xl font-semibold">Chargement des résultats...</h2>
      </div>
    </div>
  )
}

