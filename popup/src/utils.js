import { COUNTRY_CONFIG, SUPPORTED_CURRENCIES } from "./constants";

export function unflattenObject(data) {
  let result = {};
  for (let i in data) {
    let keys = i.split(".");
    keys.reduce((acc, value, index) => {
      return (
        acc[value] ||
        (acc[value] = isNaN(Number(keys[index + 1]))
          ? keys.length - 1 === index
            ? data[i]
            : {}
          : [])
      );
    }, result);
  }
  return result;
}

export const translateOptions = (options, selector) => {
  let translatedOptions = Object.entries(options).reduce(
    (acc, [key, input]) => {
      acc[key] = input.value;
      return acc;
    },
    {}
  );
  translatedOptions = {
    ...unflattenObject(translatedOptions),
    selector,
  };

  translatedOptions.amount = translatedOptions.amount
    ? translatedOptions.amount * 100
    : "";

  return translatedOptions;
};

export const createOptions = (country) => {
  const countryConfig = COUNTRY_CONFIG[country];
  return {
    key: {
      type: "input",
      id: "key",
      label: "Key",
      value: countryConfig.key.test,
    },
    name: {
      type: "input",
      id: "name",
      label: "Name",
      value: countryConfig.name,
    },
    image: {
      type: "input",
      id: "image",
      label: "Image",
    },
    currency: {
      type: "datalist",
      suggestions: SUPPORTED_CURRENCIES,
      id: "currency",
      label: "Currency",
      value: countryConfig.currency,
    },
    amount: {
      type: "input",
      id: "amount",
      label: "Amount",
      value: "200",
    },
    ["theme.color"]: {
      type: "input",
      id: "theme.color",
      label: "Theme Color",
    },
    ["prefill.contact"]: {
      type: "input",
      id: "prefill.contact",
      label: "Prefill Contact",
      value: countryConfig.prefill.contact,
    },
    ["prefill.email"]: {
      type: "input",
      id: "prefill.email",
      label: "Prefill Email",
      value: "test@gmail.com",
    },
  };
};
