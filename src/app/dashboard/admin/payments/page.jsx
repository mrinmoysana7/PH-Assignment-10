import { getAllPayments } from "@/lib/api/payments";
import PaymentsTable from "@/components/admin/PaymentsTable";

export default async function PaymentsPage() {
  const payments = await getAllPayments();

  return <PaymentsTable payments={payments} />;
}
