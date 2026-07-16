"use client";

import { Users, FileText, MessageSquare, Copy, DollarSign } from "lucide-react";
import AnalyticsCard from "./AnalyticsCard";



export default function AnalyticsCards({ analytics, totalRevenue, }) {
  const cards = [
    {
      title: "Total Users",
      value: analytics.totalUsers,
      icon: Users,
      color: "violet",
    },

    {
      title: "Total Prompts",
      value: analytics.totalPrompts,
      icon: FileText,
      color: "sky",
    },

    {
      title: "Total Reviews",
      value: analytics.totalReviews,
      icon: MessageSquare,
      color: "emerald",
    },

    {
      title: "Total Copies",
      value: analytics.totalCopies,
      icon: Copy,
      color: "amber",
    },

    {
      title: "Total Revenue",
      value:`₹${(totalRevenue / 100).toFixed(2)}`,
      icon: DollarSign,
      color: "rose",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
      {cards.map((card) => (
        <AnalyticsCard key={card.title} {...card} />
      ))}
    </div>
  );
}
