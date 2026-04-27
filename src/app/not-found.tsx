import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main style={{ padding: 32, textAlign: "center" }}>
      <h1>404 — Page not found</h1>
      <p>The page you’re looking for doesn’t exist.</p>
      <Link href="/">Back to home</Link>
    </main>
  );
}
