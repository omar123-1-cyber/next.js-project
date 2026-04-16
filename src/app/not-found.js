import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-8xl font-bold text-gray-200">404</h1>
      <h2 className="text-4xl font-semibold mt-4">Page not found</h2>
      <p className="text-gray-500 mt-3">The page you are looking for doesn’t exist.</p>
      <Link href="/" className="mt-10 bg-blue-600 text-white px-10 py-5 rounded-3xl text-lg font-medium">
        ← Back to Home
      </Link>
    </div>
  );
}