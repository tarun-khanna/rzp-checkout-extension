const selecterEle = document.getElementById("btn-selector");
const nameEle = document.getElementById("name");
const imageEle = document.getElementById("image");
const amountEle = document.getElementById("amount");
const themeEle = document.getElementById("theme");

document.addEventListener("DOMContentLoaded", (event) => {
  let data = window.localStorage.getItem("rzp-checkout-form");
  data = JSON.parse(data);

  if (data) {
    selecterEle.value = data.selector || "";
    nameEle.value = data.name || "";
    imageEle.value = data.imageEle || "";
    amountEle.value = data.amount || "";
    themeEle.value = data.theme || "";
  }
});

document.getElementById("checkout-form").addEventListener("submit", (ev) => {
  ev.preventDefault();

  const options = {
    selector: selecterEle.value,
    name: nameEle.value,
    image: imageEle.value,
    amount: amountEle.value,
    themeEle: themeEle.value,
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
