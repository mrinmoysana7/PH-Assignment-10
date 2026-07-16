import AnalyticsCards from "@/components/admin/AnalyticsCards";
import AnalyticsCharts from "@/components/admin/AnalyticsCharts";
import { getAdminAnalytics } from "@/lib/api/adminAnalytics";
// import { getAllPayments } from "@/lib/api/payments";

export default async function AnalyticsPage() {
  const analytics = await getAdminAnalytics();

  // const totalRevenue = await getAllPayments();

  return (
    <div className="mx-auto max-w-7xl px-6 py-20 lg:py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold">Administrative System Analytics</h1>

        <p className="mt-2 text-default-500">
          Aggregate metrics and engine distribution breakdowns.
        </p>
      </div>

      <AnalyticsCards analytics={analytics} totalRevenue={analytics.totalRevenue} />

      <AnalyticsCharts data={analytics.engineAnalytics} />
    </div>
  );
}
