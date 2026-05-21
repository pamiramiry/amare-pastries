import type { SpecialOrderFormData } from "../types/specialOrder";
import { SPECIAL_ORDER_STORAGE_KEY } from "../types/specialOrder";
import { ORDER_EMAIL_RECIPIENT } from "../config/specialOrderForm";

export async function submitOrder(
  data: Omit<SpecialOrderFormData, "submittedAt">,
): Promise<void> {
  const payload: SpecialOrderFormData = {
    ...data,
    submittedAt: new Date().toISOString(),
  };

  sessionStorage.setItem(SPECIAL_ORDER_STORAGE_KEY, JSON.stringify(payload));

  // TODO: send email to pamiramiry10@gmail.com via EmailJS, Supabase Edge Function, or Resend
  if (import.meta.env.DEV) {
    console.info("[submitOrder] Order saved locally. Email recipient:", ORDER_EMAIL_RECIPIENT, payload);
  }
}

export function loadSubmittedOrder(): SpecialOrderFormData | null {
  const raw = sessionStorage.getItem(SPECIAL_ORDER_STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SpecialOrderFormData;
  } catch {
    return null;
  }
}

export function clearSubmittedOrder(): void {
  sessionStorage.removeItem(SPECIAL_ORDER_STORAGE_KEY);
}
