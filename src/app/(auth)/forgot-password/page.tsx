import Link from "next/link";
import { ROUTES } from "@/constants/routes";

export default function ForgotPasswordPage() {
  return (
    <section>
      <h1>Forgot password</h1>
      <p>Enter your email to receive a reset link.</p>
      <Link href={ROUTES.auth.login}>Back to login</Link>
    </section>
  );
}
