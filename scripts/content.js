let options = {};

function handleClick(ev) {
  ev.stopPropagation();
  ev.preventDefault();
  delete options.selector;

  const rzp = new Razorpay(options);
  rzp.open();
}

chrome.runtime.onMessage.addListener((msg, sender, response) => {
  if (msg.from === "popup") {
    if (options.selector) {
      document
        .querySelector(previousId)
        .removeEventListener("click", handleClick);
    }

    options = msg.options;
    document
      .querySelector(msg.options.selector)
      .addEventListener("click", handleClick);
  }
});
