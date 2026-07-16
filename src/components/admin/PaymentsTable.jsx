"use client";

import { Table } from "@heroui/react";
import { User, Calendar } from "lucide-react";

export default function PaymentsTable({ payments = [] }) {
  // Matches the exact date format in the screenshot: DD/MM/YYYY, HH:MM:SS
  const formatDateTime = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  // Format amount to standard $0.00
  const formatAmount = (amount) => {
    if (amount === undefined || amount === null) return "$0.00";
    const value = amount > 1000 ? amount / 100 : amount;
    return `$${Number(value).toFixed(2)}`;
  };

  return (
    <div className="mx-auto max-w-7xl px-5 md:px-12 lg:px-10 xl:px-0 py-22 lg:py-10">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-1">
          Stripe Premium Payments Log
        </h1>
        <p className="text-slate-400 text-sm">
          Comprehensive database of customer subscription transactions.
        </p>
      </div>

      {/* Main Table Wrapper (Matched to your provided code) */}
      <div
        className="mt-8
          overflow-x-auto
          rounded-3xl
          border
          border-slate-800
          bg-[#0F172A]
          shadow-2xl"
      >
        <Table aria-label="Stripe premium payments table" className="min-w-200">
          <Table.ResizableContainer>
            <Table.Content>
              <Table.Header className="bg-[#131C33]">
                <Table.Column
                  isRowHeader
                  minWidth={280}
                  className="text-xs text-start py-3.5 uppercase tracking-wider font-bold text-gray-500 px-5"
                >
                  TRANSACTION ID
                </Table.Column>
                <Table.Column
                  minWidth={240}
                  className="text-xs text-start py-3.5 uppercase tracking-wider font-bold text-gray-500 px-4"
                >
                  PURCHASER DETAILS
                </Table.Column>
                <Table.Column
                  minWidth={150}
                  className="text-xs text-start py-3.5 uppercase tracking-wider font-bold text-gray-500 px-4"
                >
                  BILLING EMAIL
                </Table.Column>
                <Table.Column
                  minWidth={200}
                  className="text-xs text-start py-3.5 uppercase tracking-wider font-bold text-gray-500 px-4"
                >
                  AMOUNT CHARGED
                </Table.Column>
                <Table.Column
                  minWidth={180}
                  className="text-xs text-start py-3.5 uppercase tracking-wider font-bold text-gray-500 px-4"
                >
                  PAYMENT DATE
                </Table.Column>
              </Table.Header>

              {/* Table Body */}
              <Table.Body>
                {payments.map((payment) => (
                  <Table.Row
                    key={payment._id || payment.paymentIntent}
                    className="border-b border-gray-500 hover:bg-zinc-900/10 transition-colors"
                  >
                    {/* Transaction ID */}
                    <Table.Cell className="py-6 px-5">
                      <span className="text-cyan-400 font-medium text-sm">
                        {payment.paymentIntent ||
                          payment.id ||
                          payment.transactionId}
                      </span>
                    </Table.Cell>

                    {/* Purchaser Details */}
                    <Table.Cell className="py-6 px-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-slate-200 font-medium text-sm">
                          <User size={14} className="text-slate-400" />
                          {payment.purchaser?.name}
                        </div>
                        {(payment.purchaser?._id || payment.userId) && (
                          <div className="text-slate-500 text-xs">
                            ID: {payment.purchaser?._id || payment.userId}
                          </div>
                        )}
                      </div>
                    </Table.Cell>

                    {/* Billing Email */}
                    <Table.Cell className="py-6 px-4">
                      <span className="text-slate-300 text-sm">
                        {payment.email || "tester-premium@aiverse.com"}
                      </span>
                    </Table.Cell>

                    {/* Amount Charged */}
                    <Table.Cell className="py-6 px-4 text-start">
                      <span className="text-emerald-400 font-semibold text-sm">
                        {formatAmount(payment.amount || "$50.00")}
                      </span>
                    </Table.Cell>

                    {/* Payment Date */}
                    <Table.Cell className="py-6 px-4">
                      <div className="flex items-center gap-2 text-slate-400 text-sm">
                        <Calendar size={14} className="text-slate-500" />
                        {formatDateTime(payment.createdAt || payment.date)}
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Content>
          </Table.ResizableContainer>
        </Table>

        {/* Empty State fallback (Matched to your provided code) */}
        {payments.length === 0 && (
          <div className="py-20 text-center">
            <h3 className="text-xl font-semibold text-white">
              No payments found
            </h3>
            <p className="mt-3 text-slate-400">
              You havent received any premium payments yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
