/**
 * EXT ICON
 */
const logoImgEl = document.getElementById("logo");

/**
 * CHECK IF WE'RE ON CHROME TO RUN EXT
 */
if (chrome.extension) {
  logoImgEl.src = chrome.extension.getURL("images/hourth.png");
} else {
  logoImgEl.src = "../images/hourth.png";
}

/**
 * UTILS FUNCTIONS USE STATE AND TIME SINCE
 */
const useState = (defaultValue) => {
  let value = defaultValue;
  const getValue = () => value;
  const setValue = (newValue) => (value = newValue);
  return [getValue, setValue];
};

const timeSince = (date) => {
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + (interval < 2 ? " year" : " years");
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + (interval < 2 ? " month" : " months");
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + (interval < 2 ? " days" : " days");
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + (interval < 2 ? " hour" : " hours");
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + (interval < 2 ? " minute" : " minutes");
  }
  return Math.floor(seconds) + (interval < 2 ? " second" : " seconds");
};

/** STATE HOOKS */
const [closed, setClosed] = useState(true);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(false);

const openMenu = (state) => {
  setClosed(state);
};

const useLoadingEffect = () => {};

const clickHourth = async (e) => {
  openMenu(!closed());

  const menuEl = document.getElementById("menu");

  if (closed()) {
    menuEl.style.display = "none";
  } else {
    menuEl.style.display = "block";
  }

  setLoading(true);

  const shopGetProducts = await fetch(
    `https://brixtonshoes.com/products.json?limit=250&page=1`,
    {
      method: "GET",
      mode: "cors",
    }
  )
    .then((res) => {
      setError(false);
      setLoading(false);
      return res.json();
    })
    .catch((err) => {
      setError(true);
    });

  if (!loading() && !error()) {
    console.log(shopGetProducts);
    // Element parent
    const [ordersEl] = document.getElementsByClassName("orders");
    // First element
    let firstId = shopGetProducts.products[0].id;
    const orderEl = document.getElementById("first");
    orderEl.id = firstId;
    const [orderTimeEl] = document
      .getElementById(firstId)
      .getElementsByClassName("time");
    const [orderDividerEl] = document
      .getElementById(firstId)
      .getElementsByClassName("divider");
    const [orderBubbleEl] = document
      .getElementById(firstId)
      .getElementsByClassName("bubble");
    const [orderBarEl] = document
      .getElementById(firstId)
      .getElementsByClassName("bar");
    const [orderThumbnailEl] = document
      .getElementById(firstId)
      .getElementsByClassName("thumbnail");
    const [orderThumbnailImgEl] = document
      .getElementById(firstId)
      .getElementsByClassName("thumbnailImg");
    const [orderNameEl] = document
      .getElementById(firstId)
      .getElementsByClassName("name");
    const [orderPriceEl] = document
      .getElementById(firstId)
      .getElementsByClassName("price");
    // Change stuff
    let firstProduct = { ...shopGetProducts.products[0] };
    // Change first
    let price =
      firstProduct.variants.reduce((a, b) => {
        return a + Number(b.price);
      }, 0) / firstProduct.variants.length;
    orderTimeEl.innerHTML = `${timeSince(
      new Date(firstProduct.updated_at)
    )} ago`;
    orderNameEl.innerHTML = firstProduct.title;
    orderPriceEl.innerHTML = `R$ ${Number(price.toFixed(2))}`;
    orderThumbnailImgEl.src = firstProduct.images[0].src;
    // Populate others
    for (var x = 1; x < shopGetProducts.products.length; x++) {
      let product = { ...shopGetProducts.products[x] };
      let newEl = orderEl.cloneNode();
      let productId = product.id;
      newEl.id = productId;
      newEl.appendChild(orderTimeEl.cloneNode());

      let newDivider = orderDividerEl.cloneNode();
      let newBubble = orderBubbleEl.cloneNode();
      let newBar = orderBarEl.cloneNode();
      newDivider.appendChild(newBubble);
      newDivider.appendChild(newBar);
      newEl.appendChild(newDivider);


      let newThumbnail = orderThumbnailEl.cloneNode();
      let newThumbnailImg = orderThumbnailImgEl.cloneNode();
      newThumbnail.appendChild(newThumbnailImg);
      newEl.appendChild(newThumbnail);

      newEl.appendChild(orderNameEl.cloneNode());
      newEl.appendChild(orderPriceEl.cloneNode());
      ordersEl.appendChild(newEl);

      let [timeEl] = document
        .getElementById(productId)
        .getElementsByClassName("time");
      let [thumbnailImgEl] = document
        .getElementById(productId)
        .getElementsByClassName("thumbnailImg");
      let [nameEl] = document
        .getElementById(productId)
        .getElementsByClassName("name");
      let [priceEl] = document
        .getElementById(productId)
        .getElementsByClassName("price");

      let price =
        product.variants.reduce((a, b) => {
          return a + Number(b.price);
        }, 0) / product.variants.length;
      timeEl.innerHTML = `${timeSince(new Date(product.updated_at))} ago`;
      nameEl.innerHTML = product.title;
      priceEl.innerHTML = `R$ ${Number(price.toFixed(2))}`;
      thumbnailImgEl.src = product.images[0].src;
    }
  }
};
