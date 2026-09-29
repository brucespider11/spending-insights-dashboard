import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-140px)] gap-6 text-center px-4">
      <div className="space-y-2">
        <p className="text-7xl font-bold text-gray-200 dark:text-gray-800 select-none">404</p>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Page not found</h1>
        <p className="text-sm text-gray-500 dark:text-gray-500 max-w-xs mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>
      <Link to="/" className="btn-primary">
        <Home size={15} />
        Back to dashboard
      </Link>
    </div>
  )
}
