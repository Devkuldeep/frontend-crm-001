import Link from "next/link";
import { ROUTES } from "@/constants/routes";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function LeadDetailPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <section>
      <h1>Lead #{id}</h1>
      <p>Dynamic route: <code>/leads/[id]</code></p>
      <Link href={ROUTES.dashboard.leads}>← Back to leads</Link>
    </section>
  );
}
