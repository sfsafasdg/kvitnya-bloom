export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("uk-UA", {
    style: "currency",
    currency: "UAH",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPhoneDisplay(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 10) return phone;
  return `+38 (${digits.slice(-10, -7)}) ${digits.slice(-7, -4)}-${digits.slice(-4, -2)}-${digits.slice(-2)}`;
}
