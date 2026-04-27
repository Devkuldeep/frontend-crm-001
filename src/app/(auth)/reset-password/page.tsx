import Link from "next/link";
import { ROUTES } from "@/constants/routes";

export default function ResetPasswordPage() {
  return (
    <section>
      <h1>Reset password</h1>
      <p>Choose a new password.</p>
      <Link href={ROUTES.auth.login}>Back to login</Link>
    </section>
  );
}
