import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SiteHeader } from "../../components/SiteHeader";
import {
  REFERRAL_OPTIONS,
  SPECIALTY_MENU_OPTIONS,
  TRES_LECHES_CUP_OPTIONS,
} from "../../config/specialOrderForm";
import { loadSubmittedOrder } from "../../lib/submitOrder";
import type { SpecialOrderFormData } from "../../types/specialOrder";

function labelFor(
  options: readonly { id: string; label: string }[],
  id: string,
): string {
  return options.find((o) => o.id === id)?.label ?? id;
}

function formatDate(iso: string): string {
  if (!iso) return "—";
  try {
    return new Date(iso + "T12:00:00").toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

function formatTime(time: string): string {
  if (!time) return "—";
  const [h, m] = time.split(":");
  const hour = parseInt(h, 10);
  if (Number.isNaN(hour)) return time;
  const ampm = hour >= 12 ? "PM" : "AM";
  const h12 = hour % 12 || 12;
  return `${h12}:${m} ${ampm}`;
}

type SummaryRow = { label: string; value: string };

function buildSummary(order: SpecialOrderFormData): SummaryRow[] {
  const referral =
    order.referralSource === "other"
      ? order.referralOther || "Other"
      : labelFor(REFERRAL_OPTIONS, order.referralSource);

  return [
    { label: "Customer Name", value: order.customerName },
    { label: "Phone", value: order.phone },
    { label: "Email", value: order.email },
    { label: "Pickup Date", value: formatDate(order.pickupDate) },
    { label: "Pickup Time", value: formatTime(order.pickupTime) },
    {
      label: "Specialty Menu",
      value: labelFor(SPECIALTY_MENU_OPTIONS, order.specialtyMenu),
    },
    {
      label: "Tres Leches Cup",
      value: labelFor(TRES_LECHES_CUP_OPTIONS, order.tresLechesCup),
    },
    { label: "Quantity", value: order.quantity },
    { label: "Notes", value: order.notes },
    { label: "How did you hear about us?", value: referral },
    {
      label: "Payment",
      value: "Acknowledged — you will be contacted via WhatsApp or Email.",
    },
  ];
}

export const SpecialOrderConfirmationPage = (): JSX.Element => {
  const navigate = useNavigate();
  const order = loadSubmittedOrder();

  useEffect(() => {
    if (!order) navigate("/special-orders", { replace: true });
  }, [order, navigate]);

  if (!order) {
    return (
      <div className="min-h-screen bg-[#fffafa]">
        <SiteHeader />
        <p className="px-6 py-20 text-center font-sans text-gray-600">
          Loading…
        </p>
      </div>
    );
  }

  const rows = buildSummary(order);

  return (
    <div className="min-h-screen bg-[#fffafa]">
      <SiteHeader />

      <div className="bg-[#ffccd3] px-6 py-12 sm:px-10">
        <div className="mx-auto max-w-[640px] text-center">
          <h1 className="font-serif text-[36px] font-bold text-brand-pink sm:text-[42px]">
            Thank You!
          </h1>
          <p className="mt-4 font-sans text-base leading-relaxed text-[#6B3A2A]">
            Your pickup order has been received. We will contact you via
            WhatsApp or email to confirm payment and details.
          </p>
        </div>
      </div>

      <main className="mx-auto max-w-[640px] px-6 py-10 sm:px-10">
        <div className="rounded-[24px] bg-white p-6 shadow-md sm:p-8">
          <h2 className="mb-6 font-serif text-2xl font-bold text-brand-pink">
            Order Summary
          </h2>
          <dl className="flex flex-col gap-5">
            {rows.map((row) => (
              <div
                key={row.label}
                className="border-b border-[#6B3A2A]/10 pb-4 last:border-0 last:pb-0"
              >
                <dt className="font-sans text-sm font-semibold uppercase tracking-wide text-[#6B3A2A]/80">
                  {row.label}
                </dt>
                <dd className="mt-1 font-sans text-base text-gray-800 whitespace-pre-wrap">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <Link
          to="/"
          className="btn-cta mt-8 flex w-full items-center justify-center px-8 py-4 text-lg hover:scale-[1.02] hover:shadow-xl"
        >
          Back Home
        </Link>
      </main>
    </div>
  );
};
