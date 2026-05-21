export type SpecialOrderFormData = {
  customerName: string;
  phone: string;
  email: string;
  pickupDate: string;
  pickupTime: string;
  specialtyMenu: string;
  tresLechesCup: string;
  quantity: string;
  notes: string;
  referralSource: string;
  referralOther: string;
  paymentNote: string;
  submittedAt: string;
};

export const SPECIAL_ORDER_STORAGE_KEY = "amare-special-order";
