import type { SpecialOrderFormData } from "../types/specialOrder";

export type SpecialOrderFormErrors = Partial<
  Record<keyof Omit<SpecialOrderFormData, "submittedAt">, string>
>;

export function validateSpecialOrder(
  data: Omit<SpecialOrderFormData, "submittedAt">,
): SpecialOrderFormErrors {
  const errors: SpecialOrderFormErrors = {};

  if (!data.customerName.trim()) errors.customerName = "Customer name is required.";
  if (!data.phone.trim()) errors.phone = "Phone number is required.";
  if (!data.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!data.pickupDate) errors.pickupDate = "Pickup date is required.";
  else {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selected = new Date(data.pickupDate + "T00:00:00");
    if (selected < today) errors.pickupDate = "Pickup date cannot be in the past.";
  }
  if (!data.pickupTime) errors.pickupTime = "Pickup time is required.";
  if (!data.specialtyMenu) errors.specialtyMenu = "Please select a specialty menu item.";
  if (!data.tresLechesCup) errors.tresLechesCup = "Please select a tres leches cup.";
  if (!data.quantity.trim()) errors.quantity = "Quantity is required.";
  if (!data.notes.trim()) errors.notes = "Notes are required.";
  if (!data.referralSource) errors.referralSource = "Please tell us how you heard about us.";
  if (data.referralSource === "other" && !data.referralOther.trim()) {
    errors.referralOther = "Please specify how you heard about us.";
  }
  if (!data.paymentNote.trim()) errors.paymentNote = "Please acknowledge the payment note.";

  return errors;
}
