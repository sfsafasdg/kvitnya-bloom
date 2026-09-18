const PREFIX = "+380";

/** Залишає тільки 9 цифр номера після коду країни */
export function digitsAfter380(raw: string): string {
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("380")) digits = digits.slice(3);
  else if (digits.startsWith("80") && digits.length > 9) digits = digits.slice(2);
  else if (digits.startsWith("0")) digits = digits.slice(1);
  return digits.slice(0, 9);
}

export function formatUaPhoneDisplay(nineDigits: string): string {
  const d = nineDigits.padEnd(9, " ").slice(0, 9);
  const parts = [d.slice(0, 2), d.slice(2, 5), d.slice(5, 7), d.slice(7, 9)].map((p) =>
    p.trim(),
  );
  if (nineDigits.length === 0) return PREFIX;
  if (nineDigits.length <= 2) return `${PREFIX} ${parts[0]}`.trim();
  if (nineDigits.length <= 5) return `${PREFIX} ${parts[0]} ${parts[1]}`.trim();
  if (nineDigits.length <= 7)
    return `${PREFIX} ${parts[0]} ${parts[1]} ${parts[2]}`.trim();
  return `${PREFIX} ${parts[0]} ${parts[1]} ${parts[2]} ${parts[3]}`.trim();
}

export function toE164Ua(nineDigits: string): string {
  return `${PREFIX}${nineDigits}`;
}

export function isValidUaPhone(nineDigits: string): boolean {
  return /^\d{9}$/.test(nineDigits) && nineDigits[0] !== "0";
}

export function parsePhoneField(value: string): string {
  return digitsAfter380(value);
}
