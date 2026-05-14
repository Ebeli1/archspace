import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand flex flex-col items-center justify-center text-center px-4">
      <p className="text-accent text-6xl font-semibold mb-4">404</p>
      <h1 className="text-2xl font-semibold text-white mb-3">Page not found</h1>
      <p className="text-white/50 mb-8 max-w-sm">The page you're looking for doesn't exist or has been moved.</p>
      <Link href="/" className="bg-accent hover:bg-accent-dark text-white font-medium px-6 py-3 rounded-lg transition-colors">
        Back to homepage
      </Link>
    </div>
  );
}