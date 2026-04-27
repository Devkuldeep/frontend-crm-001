import Link from "next/link";
import { ROUTES } from "@/constants/routes";

export default function RegisterPage() {
  return (
    <section>
      <h1>Create account</h1>
      <p>Form goes here.</p>
      <p>
        Already have an account? <Link href={ROUTES.auth.login}>Login</Link>
      </p>
    </section>
  );
}
