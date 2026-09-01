import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center theme-bg-main px-4 text-center">
      <h1 className="font-display text-8xl text-gold mb-2">404</h1>
      <h2 className="font-display text-3xl text-cream mb-4 uppercase">Page Not Found</h2>
      <p className="font-body text-silver text-sm max-w-md mb-8">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="rounded-full bg-champagne px-8 py-3 font-label text-xs font-bold uppercase tracking-widest text-wine-deep hover:scale-105 transition-transform"
      >
        Return to Priya Home
      </Link>
    </div>
  );
}
