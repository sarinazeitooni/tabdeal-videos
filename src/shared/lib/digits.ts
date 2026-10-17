const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

export const toPersianDigits = (value: number | string): string =>
  String(value).replace(/\d/g, (digit) => PERSIAN_DIGITS[Number(digit)] ?? digit);
