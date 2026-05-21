import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SiteHeader } from "../../components/SiteHeader";
import {
  FORM_INTRO,
  REFERRAL_OPTIONS,
  SPECIALTY_MENU_OPTIONS,
  TRES_LECHES_CUP_OPTIONS,
} from "../../config/specialOrderForm";
import { submitOrder } from "../../lib/submitOrder";
import {
  validateSpecialOrder,
  type SpecialOrderFormErrors,
} from "../../lib/validateSpecialOrder";
import type { SpecialOrderFormData } from "../../types/specialOrder";

const emptyForm: Omit<SpecialOrderFormData, "submittedAt"> = {
  customerName: "",
  phone: "",
  email: "",
  pickupDate: "",
  pickupTime: "",
  specialtyMenu: "",
  tresLechesCup: "",
  quantity: "",
  notes: "",
  referralSource: "",
  referralOther: "",
  paymentNote: "",
};

const todayIso = (): string => {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

const inputClass =
  "w-full border-0 border-b-2 border-[#6B3A2A]/20 bg-transparent px-1 py-3 font-sans text-base text-gray-800 outline-none transition-colors focus:border-brand-pink focus:ring-0";
const labelClass = "mb-1 block font-sans text-sm font-semibold text-[#6B3A2A]";
const errorClass = "mt-1 font-sans text-sm text-brand-pink";

export const SpecialOrderPage = (): JSX.Element => {
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<SpecialOrderFormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const setField = <K extends keyof typeof form>(
    key: K,
    value: (typeof form)[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const nextErrors = validateSpecialOrder(form);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      const first = document.querySelector("[data-error]");
      first?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setSubmitting(true);
    try {
      await submitOrder(form);
      navigate("/special-orders/confirmation");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fffafa]">
      <SiteHeader />

      <div className="bg-[#ffccd3] px-6 py-10 sm:px-10 lg:px-[52px]">
        <div className="mx-auto flex max-w-[1100px] flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
          <div className="flex-1">
            <h1 className="font-serif text-[36px] font-bold leading-tight text-brand-pink sm:text-[44px]">
              {FORM_INTRO.title}
            </h1>
            <p className="mt-4 max-w-xl font-sans text-base leading-relaxed text-[#6B3A2A]">
              Please complete this form to place a pickup order.
            </p>
            <p className="mt-2 max-w-xl font-sans text-sm leading-relaxed text-[#6B3A2A]/90">
              Tres leches Cups: 2 hours notice. Specialty Orders: 24–72 hours
              notice.
            </p>
          </div>
          <div className="hidden shrink-0 overflow-hidden rounded-[24px] shadow-lg lg:block lg:w-[320px]">
            <img
              src="/amare-cake.png"
              alt="Amare specialty cake"
              className="h-[220px] w-full object-cover"
            />
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-[720px] px-6 py-10 sm:px-10 lg:px-8"
        noValidate
      >
        {/* Section 1 — Customer */}
        <section className="mb-10 rounded-[24px] bg-white p-6 shadow-md sm:p-8">
          <h2 className="mb-6 font-serif text-2xl font-bold text-brand-pink">
            Customer Information
          </h2>
          <div className="flex flex-col gap-6">
            <div data-error={errors.customerName ? true : undefined}>
              <label htmlFor="customerName" className={labelClass}>
                Customer Name <span className="text-brand-pink">*</span>
              </label>
              <input
                id="customerName"
                type="text"
                className={inputClass}
                value={form.customerName}
                onChange={(e) => setField("customerName", e.target.value)}
                autoComplete="name"
              />
              {errors.customerName && (
                <p className={errorClass}>{errors.customerName}</p>
              )}
            </div>
            <div data-error={errors.phone ? true : undefined}>
              <label htmlFor="phone" className={labelClass}>
                Phone Number <span className="text-brand-pink">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                className={inputClass}
                value={form.phone}
                onChange={(e) => setField("phone", e.target.value)}
                autoComplete="tel"
              />
              {errors.phone && <p className={errorClass}>{errors.phone}</p>}
            </div>
            <div data-error={errors.email ? true : undefined}>
              <label htmlFor="email" className={labelClass}>
                Email Address <span className="text-brand-pink">*</span>
              </label>
              <input
                id="email"
                type="email"
                className={inputClass}
                value={form.email}
                onChange={(e) => setField("email", e.target.value)}
                autoComplete="email"
              />
              {errors.email && <p className={errorClass}>{errors.email}</p>}
            </div>
          </div>
        </section>

        {/* Section 2 — Pickup */}
        <section className="mb-10 rounded-[24px] bg-white p-6 shadow-md sm:p-8">
          <h2 className="mb-6 font-serif text-2xl font-bold text-brand-pink">
            Pickup Details
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div data-error={errors.pickupDate ? true : undefined}>
              <label htmlFor="pickupDate" className={labelClass}>
                Date <span className="text-brand-pink">*</span>
              </label>
              <input
                id="pickupDate"
                type="date"
                min={todayIso()}
                className={inputClass}
                value={form.pickupDate}
                onChange={(e) => setField("pickupDate", e.target.value)}
              />
              {errors.pickupDate && (
                <p className={errorClass}>{errors.pickupDate}</p>
              )}
            </div>
            <div data-error={errors.pickupTime ? true : undefined}>
              <label htmlFor="pickupTime" className={labelClass}>
                Pick Up Time <span className="text-brand-pink">*</span>
              </label>
              <input
                id="pickupTime"
                type="time"
                className={inputClass}
                value={form.pickupTime}
                onChange={(e) => setField("pickupTime", e.target.value)}
              />
              {errors.pickupTime && (
                <p className={errorClass}>{errors.pickupTime}</p>
              )}
            </div>
          </div>
        </section>

        {/* Section 3 — Specialty Menu */}
        <section
          className="mb-10 rounded-[24px] bg-white p-6 shadow-md sm:p-8"
          data-error={errors.specialtyMenu ? true : undefined}
        >
          <h2 className="mb-2 font-serif text-2xl font-bold text-brand-pink">
            Specialty Menu
          </h2>
          <p className="mb-6 font-sans text-sm text-gray-600">
            Select one specialty item <span className="text-brand-pink">*</span>
          </p>
          <fieldset className="flex flex-col gap-3 border-0 p-0">
            {SPECIALTY_MENU_OPTIONS.map((opt) => (
              <label
                key={opt.id}
                className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 px-4 py-3 transition-colors ${
                  form.specialtyMenu === opt.id
                    ? "border-brand-pink bg-[#ffccd3]/30"
                    : "border-[#6B3A2A]/10 hover:border-brand-pink/40"
                }`}
              >
                <input
                  type="radio"
                  name="specialtyMenu"
                  value={opt.id}
                  checked={form.specialtyMenu === opt.id}
                  onChange={() => setField("specialtyMenu", opt.id)}
                  className="h-4 w-4 accent-brand-pink"
                />
                <span className="font-sans text-base text-gray-800">
                  {opt.label}
                </span>
              </label>
            ))}
          </fieldset>
          {errors.specialtyMenu && (
            <p className={`${errorClass} mt-3`}>{errors.specialtyMenu}</p>
          )}
        </section>

        {/* Section 4 — Tres Leches Cup */}
        <section
          className="mb-10 rounded-[24px] bg-white p-6 shadow-md sm:p-8"
          data-error={errors.tresLechesCup ? true : undefined}
        >
          <h2 className="mb-2 font-serif text-2xl font-bold text-brand-pink">
            Tres Leches Cup
          </h2>
          <p className="mb-6 font-sans text-sm text-gray-600">
            Select your cup flavor <span className="text-brand-pink">*</span>
          </p>
          <fieldset className="grid grid-cols-2 gap-4 border-0 p-0 md:grid-cols-3">
            {TRES_LECHES_CUP_OPTIONS.map((cup) => (
              <label
                key={cup.id}
                className={`flex cursor-pointer flex-col overflow-hidden rounded-[16px] border-2 transition-all ${
                  form.tresLechesCup === cup.id
                    ? "border-brand-pink ring-2 ring-brand-pink ring-offset-2"
                    : "border-[#6B3A2A]/10 hover:border-brand-pink/50"
                }`}
              >
                <input
                  type="radio"
                  name="tresLechesCup"
                  value={cup.id}
                  checked={form.tresLechesCup === cup.id}
                  onChange={() => setField("tresLechesCup", cup.id)}
                  className="sr-only"
                />
                <img
                  src={cup.image}
                  alt={cup.label}
                  className="aspect-square w-full object-cover"
                />
                <span className="px-2 py-3 text-center font-sans text-sm font-medium text-[#6B3A2A]">
                  {cup.label}
                </span>
              </label>
            ))}
          </fieldset>
          {errors.tresLechesCup && (
            <p className={`${errorClass} mt-3`}>{errors.tresLechesCup}</p>
          )}
        </section>

        {/* Section 5 — Details */}
        <section className="mb-10 rounded-[24px] bg-white p-6 shadow-md sm:p-8">
          <h2 className="mb-6 font-serif text-2xl font-bold text-brand-pink">
            Order Details
          </h2>
          <div className="flex flex-col gap-6">
            <div data-error={errors.quantity ? true : undefined}>
              <label htmlFor="quantity" className={labelClass}>
                Quantity <span className="text-brand-pink">*</span>
              </label>
              <input
                id="quantity"
                type="text"
                inputMode="numeric"
                className={inputClass}
                value={form.quantity}
                onChange={(e) => setField("quantity", e.target.value)}
              />
              {errors.quantity && (
                <p className={errorClass}>{errors.quantity}</p>
              )}
            </div>
            <div data-error={errors.notes ? true : undefined}>
              <label htmlFor="notes" className={labelClass}>
                Notes <span className="text-brand-pink">*</span>
              </label>
              <textarea
                id="notes"
                rows={4}
                className={`${inputClass} resize-y rounded-lg border-2 border-[#6B3A2A]/20 px-3 focus:border-brand-pink`}
                value={form.notes}
                onChange={(e) => setField("notes", e.target.value)}
              />
              {errors.notes && <p className={errorClass}>{errors.notes}</p>}
            </div>
            <div data-error={errors.referralSource ? true : undefined}>
              <p className={labelClass}>
                How did you hear about us?{" "}
                <span className="text-brand-pink">*</span>
              </p>
              <fieldset className="mt-2 flex flex-col gap-2 border-0 p-0">
                {REFERRAL_OPTIONS.map((opt) => (
                  <label
                    key={opt.id}
                    className="flex cursor-pointer items-center gap-3 font-sans text-base text-gray-800"
                  >
                    <input
                      type="radio"
                      name="referralSource"
                      value={opt.id}
                      checked={form.referralSource === opt.id}
                      onChange={() => setField("referralSource", opt.id)}
                      className="h-4 w-4 accent-brand-pink"
                    />
                    {opt.label}
                  </label>
                ))}
              </fieldset>
              {errors.referralSource && (
                <p className={errorClass}>{errors.referralSource}</p>
              )}
              {form.referralSource === "other" && (
                <div className="mt-4" data-error={errors.referralOther ? true : undefined}>
                  <label htmlFor="referralOther" className={labelClass}>
                    Please specify
                  </label>
                  <input
                    id="referralOther"
                    type="text"
                    className={inputClass}
                    value={form.referralOther}
                    onChange={(e) => setField("referralOther", e.target.value)}
                  />
                  {errors.referralOther && (
                    <p className={errorClass}>{errors.referralOther}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Section 6 — Payment */}
        <section
          className="mb-10 rounded-[24px] bg-white p-6 shadow-md sm:p-8"
          data-error={errors.paymentNote ? true : undefined}
        >
          <h2 className="mb-4 font-serif text-2xl font-bold text-brand-pink">
            Payment
          </h2>
          <p className="mb-4 font-sans text-sm leading-relaxed text-gray-600">
            {FORM_INTRO.paymentHelper}
          </p>
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={form.paymentNote === "acknowledged"}
              onChange={(e) =>
                setField(
                  "paymentNote",
                  e.target.checked ? "acknowledged" : "",
                )
              }
              className="mt-1 h-5 w-5 shrink-0 accent-brand-pink"
            />
            <span className="font-sans text-base text-gray-800">
              I understand I will be contacted via WhatsApp or Email after
              submitting. <span className="text-brand-pink">*</span>
            </span>
          </label>
          {errors.paymentNote && (
            <p className={`${errorClass} mt-3`}>{errors.paymentNote}</p>
          )}
        </section>

        <button
          type="submit"
          disabled={submitting}
          className="btn-cta w-full px-8 py-4 text-lg hover:scale-[1.02] hover:shadow-xl disabled:opacity-60 disabled:hover:scale-100"
        >
          {submitting ? "Submitting…" : "Submit Order"}
        </button>
      </form>
    </div>
  );
};
