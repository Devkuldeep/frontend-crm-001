import Link from "next/link";
import { ROUTES } from "@/constants/routes";

export default function MarketingHomePage() {
  return (
    <section>
      <h1>Welcome to the CRM</h1>
      <p>Marketing landing page rendered inside the (marketing) route group.</p>
      <Link href={ROUTES.auth.register}>Get started →</Link>
    </section>
  );
}
