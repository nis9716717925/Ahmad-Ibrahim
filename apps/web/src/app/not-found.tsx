export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 py-16 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">404</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Page not found</h1>
        <p className="mt-3 max-w-md text-slate-600">
          The page you are looking for does not exist or may have been moved.
        </p>
        <a href="/" className="btn-primary mt-8">
          Back to home
        </a>
      </body>
    </html>
  );
}
