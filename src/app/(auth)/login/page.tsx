import Link from "next/link";
import { ROUTES } from "@/constants/routes";

export default function LoginPage() {
  return (
    <section>
      <h1>Login</h1>
      <p>Form goes here.</p>
      <p>
        <Link href={ROUTES.auth.forgotPassword}>Forgot password?</Link>
      </p>
      <p>
        New here? <Link href={ROUTES.auth.register}>Create account</Link>
      </p>
    </section>
  );
}
