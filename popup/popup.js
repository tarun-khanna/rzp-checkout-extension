const selecterEle = document.getElementById("btn-selector");
const nameEle = document.getElementById("name");
const keyEle = document.getElementById("key");
const currencyEle = document.getElementById("currency");
const imageEle = document.getElementById("image");
const amountEle = document.getElementById("amount");
const themeColorEle = document.getElementById("theme_color");

document.addEventListener("DOMContentLoaded", (event) => {
  let data = window.localStorage.getItem("rzp-checkout-form");
  data = JSON.parse(data);

  if (data) {
    selecterEle.value = data.selector || "";
    nameEle.value = data.name || "";
    imageEle.value = data.image || "";
    amountEle.value = data.amount / 100 || "";
    themeColorEle.value = data.theme?.color || "";
  }
});

document.getElementById("checkout-form").addEventListener("submit", (ev) => {
  ev.preventDefault();

  const options = {
    selector: selecterEle.value,
    key: keyEle.value,
    currency: currencyEle.value,
    name: nameEle.value,
    image: imageEle.value,
    amount: amountEle.value * 100,
    theme: {
      color: themeColorEle.value,
    },
  };

  localStorage.setItem("rzp-checkout-form", JSON.stringify(options));

  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { from: "popup", options });
      window.close();
    }
  );
});
