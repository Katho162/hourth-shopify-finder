
// Get html as string to do regex
const htmlString = document.getElementsByTagName('html')[0].innerHTML;

const REGEX_SHOPEE = new RegExp("Shopify.cdnHost = \"cdn.shopify.com\"")

const body = document.getElementsByTagName('body')

var script = document.createElement('iframe');
script.src = chrome.runtime.getURL("popup.html"); // Check https://jquery.com/ for the current version
document.getElementsByTagName('body')[0].appendChild(script);