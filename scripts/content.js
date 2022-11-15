function handleClick(ev, options) {
  ev.stopPropagation();
  ev.preventDefault();
  delete options.selector;
  options = {
    ...options,
    key: "rzp_live_ILgsfZCZoFIKMb",
  };
  console.log("🚀 ~ handleClick ~ options", options);
  const rzp = new Razorpay(options);
  rzp.open();
}

let previousId = "";
chrome.runtime.onMessage.addListener((msg, sender, response) => {
  if (msg.from === "popup") {
    if (previousId) {
      document.querySelector(previousId).removeEventListener("click", (ev) => {
        handleClick(ev, msg.options);
      });
    }

    document
      .querySelector(msg.options.selector)
      .addEventListener("click", (ev) => handleClick(ev, msg.options));

    previousId = msg.options.selector;
  }
});
