import numeral from 'numeral';

export const currencySymbols = {
  "USD": "$",
  "BTC": "Ƀ",
  "AUD": "A$",
  "BRL": "R$",
  "CAD": "C$",
  "CHF": "CHF",
  "CLP": "CLP",
  "CNY": "¥",
  "CZK": "Kč",
  "DKK": "kr",
  "EUR": "€",
  "GBP": "£",
  "HKD": "HKD",
  "HUF": "Ft",
  "IDR": "Rp",
  "ILS": "₪",
  "INR": "INR",
  "JPY": "¥",
  "KRW": "₩",
  "MXN": "MXN",
  "MYR": "RM",
  "NOK": "kr",
  "NZD": "NZD",
  "PHP": "₱",
  "PKR": "₨",
  "PLN": "zł",
  "RUB": "₽",
  "SEK": "kr",
  "SGD": "SGD",
  "THB": "฿",
  "TRY": "TRY",
  "TWD": "NT$",
  "ZAR": "R"
}

export const formatMoney = (currency, value, format = '0,0[.]00') => {
  const symb = currencySymbols[currency] || '';

  const formatFinal = currency === "BTC" ? '0,0[.]000000': format;
  const v = numeral(value).format(formatFinal);
  return `${symb}${v}`;
}