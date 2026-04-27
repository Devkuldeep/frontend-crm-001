import Link from "next/link";
import { ROUTES } from "@/constants/routes";

const MOCK_LEADS = [
  { id: "1", name: "Acme Corp" },
  { id: "2", name: "Globex" },
  { id: "3", name: "Initech" },
];

export default function LeadsPage() {
  return (
    <section>
      <h1>Leads</h1>
      <ul>
        {MOCK_LEADS.map((lead) => (
          <li key={lead.id}>
            <Link href={ROUTES.dashboard.leadDetail(lead.id)}>
              {lead.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
