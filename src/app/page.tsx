import Link from "next/link";
import { ROUTES } from "@/constants/routes";

export default function HomePage() {
  return (
    <main style={{ padding: 32, maxWidth: 720, margin: "0 auto" }}>
      <h1>Frontend CRM</h1>
      <p>Pick an area to explore the routing setup:</p>

      <ul style={{ lineHeight: 2 }}>
        <li>
          <Link href={ROUTES.marketing.about}>Marketing → About</Link>
        </li>
        <li>
          <Link href={ROUTES.auth.login}>Auth → Login</Link>
        </li>
        <li>
          <Link href={ROUTES.dashboard.root}>Dashboard</Link>
        </li>
        <li>
          <Link href={ROUTES.dashboard.leadDetail("123")}>
            Dashboard → Lead #123 (dynamic route)
          </Link>
        </li>
        <li>
          <Link href="/this-page-does-not-exist">404 example</Link>
        </li>
      </ul>
    </main>
  );
}
