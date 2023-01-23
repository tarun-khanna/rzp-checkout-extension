import stdCxLogo from "./assets/ic-std-cx.svg";
import magicCxLogo from "./assets/ic-magic-cx.svg";

export const SUPPORTED_CURRENCIES = [
  "AED",
  "ALL",
  "AMD",
  "ARS",
  "AUD",
  "AWG",
  "BBD",
  "BDT",
  "BHD",
  "BMD",
  "BND",
  "BOB",
  "BSD",
  "BWP",
  "BZD",
  "CAD",
  "CHF",
  "CNY",
  "COP",
  "CRC",
  "CUP",
  "CZK",
  "DKK",
  "DOP",
  "DZD",
  "EGP",
  "ETB",
  "EUR",
  "FJD",
  "GBP",
  "GHS",
  "GIP",
  "GMD",
  "GTQ",
  "GYD",
  "HKD",
  "HNL",
  "HRK",
  "HTG",
  "HUF",
  "IDR",
  "ILS",
  "INR",
  "JMD",
  "KES",
  "KGS",
  "KHR",
  "KWD",
  "KYD",
  "KZT",
  "LAK",
  "LBP",
  "LKR",
  "LRD",
  "LSL",
  "MAD",
  "MDL",
  "MKD",
  "MMK",
  "MNT",
  "MOP",
  "MUR",
  "MVR",
  "MWK",
  "MXN",
  "MYR",
  "NAD",
  "NGN",
  "NIO",
  "NOK",
  "NPR",
  "NZD",
  "OMR",
  "PEN",
  "PGK",
  "PHP",
  "PKR",
  "QAR",
  "RUB",
  "SAR",
  "SCR",
  "SEK",
  "SGD",
  "SLL",
  "SOS",
  "SSP",
  "SVC",
  "SZL",
  "THB",
  "TTD",
  "TZS",
  "USD",
  "UYU",
  "UZS",
  "YER",
  "ZAR",
];

export const COUNTRY_CONFIG = {
  MY: {
    name: "Test Malaysian Merchant",
    key: {
      test: "rzp_test_rLRCKMrfIRVgEg",
      live: "rzp_live_fQOafVJoJqscJ6",
    },
    currency: "MYR",
    prefill: {
      contact: "123456789",
    },
  },
  IN: {
    name: "Test Indian Merchant",
    key: {
      test: "rzp_test_xdw1idaxNNcenU",
      live: "rzp_live_ILgsfZCZoFIKMb",
    },
    currency: "INR",
    prefill: {
      contact: "8888888888",
    },
  },
};

export const MENU = [
  {
    id: "standard-cx",
    icon: stdCxLogo,
    label: "Standard Checkout",
  },
  {
    id: "magic-cx",
    icon: magicCxLogo,
    label: "Magic Checkout",
  },
];

export const TIMEZONE_TO_COUNTRY = {
  "Asia/Kolkata": "India",
  "Asia/Calcutta": "India",
  "Asia/Kuala_Lumpur": "Malaysia",
  "Asia/Kuching": "Malaysia",
};

export const COUNTRY_TO_ISO = {
  India: "IN",
  Malaysia: "MY",
};

export const getCountry = () => {
  let country = "India";
  if (Intl) {
    let userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    country = TIMEZONE_TO_COUNTRY[userTimeZone];
  }

  return COUNTRY_TO_ISO[country];
};
