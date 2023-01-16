import { DEFAULT_CX_OPTIONS_INPUTS } from "./constants";

export const getInitialOptions = () => {
  let storageOptions = window.localStorage.getItem("rzp-checkout-form");
  storageOptions = JSON.parse(storageOptions);

  return storageOptions ? storageOptions : DEFAULT_CX_OPTIONS_INPUTS;
};

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
