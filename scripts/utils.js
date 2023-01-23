function fallbackCopyTextToClipboard(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand("copy");
    const msg = successful ? "successful" : "unsuccessful";
    console.log("Fallback: Copying text command was " + msg);
  } catch (err) {
    console.error("Fallback: Oops, unable to copy", err);
  }

  document.body.removeChild(textArea);
}

export const generateQuerySelector = function (el) {
  if (el.tagName.toLowerCase() == "html") return "HTML";
  let str = el.tagName;
  str += el.id != "" ? "#" + el.id : "";
  if (el.className) {
    let classes = el.className.split(/\s/);
    for (let i = 0; i < classes.length; i++) {
      str += "." + classes[i];
    }
  }
  return generateQuerySelector(el.parentNode) + " > " + str;
};

export function querySelectorFallback(context) {
  let index, pathSelector, localName;

  if (context == "null") throw "not an dom reference";
  // call getIndex function
  index = getIndex(context);

  while (context.tagName) {
    // selector path
    pathSelector = context.localName + (pathSelector ? ">" + pathSelector : "");
    context = context.parentNode;
  }
  // selector path for nth of type
  pathSelector = pathSelector + `:nth-of-type(${index})`;
  return pathSelector;
}

// get index for nth of type element
function getIndex(node) {
  let i = 1;
  let tagName = node.tagName;

  while (node.previousSibling) {
    node = node.previousSibling;
    if (
      node.nodeType === 1 &&
      tagName.toLowerCase() == node.tagName.toLowerCase()
    ) {
      i++;
    }
  }
  return i;
}

export function getToastStyles() {
  return `
  #toast  {
    visibility: hidden;
    min-width: 250px;
    background-color: #0400ff;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    color: white;
    text-align: center;
    border-radius: 10px;
    padding: 16px;
    position: fixed;
    z-index: 10000;
    left: 50%;
    transform: translateX(-50%);
    bottom: 30px;
    font-size: 16px;
  }
  
  #toast.show {
    visibility: visible;
    -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
    animation: fadein 0.5s, fadeout 0.5s 2.5s;
  }
  
  @-webkit-keyframes fadein {
    from {bottom: 0; opacity: 0;} 
    to {bottom: 30px; opacity: 1;}
  }
  
  @keyframes fadein {
    from {bottom: 0; opacity: 0;}
    to {bottom: 30px; opacity: 1;}
  }
  
  @-webkit-keyframes fadeout {
    from {bottom: 30px; opacity: 1;} 
    to {bottom: 0; opacity: 0;}
  }
  
  @keyframes fadeout {
    from {bottom: 30px; opacity: 1;}
    to {bottom: 0; opacity: 0;}
  }
  `;
}

export function getModalStyles() {
  return `
  #modal {
    visibility: hidden;
    min-width: 250px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    background-color: #fff;
    text-align: center;
    border-radius: 10px;
    padding: 16px;
    position: fixed;
    z-index: 10000;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    font-size: 16px;
  }

  #modal h2 {
    margin-bottom: 20px;
  }

  #modal.success {
    border-top: 8px solid #6ECD28;
  }

  #modal.fail {
    border-top: 8px solid #CD2828;
  }

  .close-btn {
    border-radius: 25px;
    width: 25px;
    height: 25px;
    border: none;
    position: absolute;
    top: 4px;
    right: 4px;
    cursor: pointer;
  }

  #modal .content {
    min-height: 100px;
    min-width: 300px;
  }
  
  #modal.show {
    visibility: visible;
    -webkit-animation: fadein 0.5s;
    animation: fadein 0.5s;
  }
  
  @-webkit-keyframes fadein {
    from {transform: translateX(-50%) translateY(0%); opacity: 0;} 
    to {transform: translateX(-50%) translateY(-50%); opacity: 1;}
  }
  
  @keyframes fadein {
    from {transform: translateX(-50%) translateY(0%); opacity: 0;}
    to {transform: translateX(-50%) translateY(-50%); opacity: 1;}
  }

  #modal.hide {
    visibility: hidden;
  }

  `;
}

const styleSheet = document.createElement("style");
styleSheet.innerText = `${getToastStyles()} ${getModalStyles()}`;
document.head.appendChild(styleSheet);

const toast = document.createElement("div");
toast.setAttribute("id", "toast");
toast.textContent = "Copied !";
document.body.appendChild(toast);

export function showToast({ text, time }) {
  toast.textContent = text;
  const x = document.getElementById("toast");
  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, time);
}

const modal = document.createElement("div");
modal.setAttribute("id", "modal");
document.body.appendChild(modal);

const getModalContent = (data) => {
  return `
  <div class="content">
    <h2>${data.state === "success" ? "Success !" : "Fail"}</h2>
    <em>Payment ID: ${data.razorpay_payment_id}</em>
    <button class="close-btn">X</button>
  </div>
  `;
};

export function showModal(data) {
  const x = document.getElementById("modal");
  x.innerHTML = getModalContent(data);
  x.classList.remove("hide");
  if (data.state === "success") {
    x.classList.add("show", "success");
  } else {
    x.classList.add("show", "fail");
  }

  document.querySelector("#modal .close-btn").addEventListener("click", () => {
    const x = document.getElementById("modal");
    x.className = "hide";
  });
}
