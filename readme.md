# Razorpay Checkout Demo Extension

Override pay button on merchant's webpage to open Razorpay checkout.

![Extension on website](https://github.com/tarun-khanna/rzp-checkout-extension/blob/main/assets/images/screenshot1.png?raw=true)

# Installation

1. Clone this repo locally.
2. Open the Extension Management page by navigating to [`chrome://extensions`](chrome://extensions).
   - The Extension Management page can also be opened by clicking on the Chrome menu, hovering over More Tools then selecting Extensions.
3. Enable Developer Mode by clicking the toggle switch next to Developer mode.
4. Click the LOAD UNPACKED button and select the extension directory (`rzp-checkout-extension`).

# Usage

1. Navigate to the merchant's webpage where checkout demo has to be injected.
2. Copy the selector of the button (buy now/pay.. etc) on which checkout modal needs to be opened.
   - The selector can be found out by right clicking on the button and then clicking on inspect. This will open devtools, now right click on the highlighted element and copy -> selector.
3. Open the checkout extension and paste the selector value in the first input.
4. Add checkout options if required in the below inputs.
5. Click Submit.
6. Back on the merchant's page, click on the button.
7. It should now open razorpay checkout ! 🚀
