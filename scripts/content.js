// Get html as string to do regex
const htmlString = document.getElementsByTagName("html")[0].innerHTML;

const REGEX_SHOPEE = new RegExp('Shopify.cdnHost = "cdn.shopify.com"');

if (REGEX_SHOPEE.test(htmlString)) {
  const body = document.getElementsByTagName("body");

  var script = document.createElement("iframe");
  script.style.width = "100%";
  script.style.height = "100%";
  script.style.border = "none";
  script.style.outline = "none";
  script.style.zIndex = 9999999999999999;
  script.style.position = "fixed";
  script.style.left = 0;
  script.style.top = 0;
  script.src = chrome.runtime.getURL("popup/popup.html"); // Check https://jquery.com/ for the current version
  document.getElementsByTagName("body")[0].appendChild(script);
}
