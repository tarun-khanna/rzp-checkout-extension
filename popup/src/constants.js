import stdCxLogo from "./assets/ic-std-cx.svg";
import magicCxLogo from "./assets/ic-magic-cx.svg";

export const DEFAULT_CX_OPTIONS_INPUTS = {
  key: {
    id: "key",
    label: "Key",
    value: "rzp_test_rLRCKMrfIRVgEg",
  },
  name: {
    id: "name",
    label: "Name",
    value: "Test Merchant",
  },
  image: {
    id: "image",
    label: "Image",
  },
  currency: {
    id: "currency",
    label: "Currency",
    value: "MYR",
  },
  amount: {
    id: "amount",
    label: "Amount",
    value: "200",
  },
  ["theme.color"]: {
    id: "theme.color",
    label: "Theme Color",
  },
  ["prefill.contact"]: {
    id: "prefill.contact",
    label: "Prefill Contact",
    value: "123456789",
  },
  ["prefill.email"]: {
    id: "prefill.email",
    label: "Prefill Email",
    value: "test@gmail.com",
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
