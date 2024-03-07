const weatherAPIKey = "9a1098d952395236e3028203754XXXXX";

const weatherAPIURL = `https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}`;

const galleryImages = [
  {
    src: "./assets/gallery/image1.jpg",
    alt: "Thumbnail Image 1",
  },
  {
    src: "./assets/gallery/image3.jpg",
    alt: "Thumbnail Image 3",
  },

  {
    src: "./assets/gallery/image2.jpg",
    alt: "Thumbnail Image 2",
  },
];

const products = [
  {
    title: "AstroFiction",
    author: "John Doe",
    price: 49.9,
    image: "./assets/products/img6.png",
  },
  {
    title: "Space Odissey",
    author: "Marie Anne",
    price: 35,
    image: "./assets/products/img1.png",
  },
  {
    title: "Doomed City",
    author: "Jason Cobert",
    price: 0,
    image: "./assets/products/img2.png",
  },
  {
    title: "Black Dog",
    author: "John Doe",
    price: 85.35,
    image: "./assets/products/img3.png",
  },
  {
    title: "My Little Robot",
    author: "Pedro Paulo",
    price: 0,
    image: "./assets/products/img5.png",
  },
  {
    title: "Garden Girl",
    author: "Ankit Patel",
    price: 45,
    image: "./assets/products/img4.png",
  },
];

function celToFarh(temp) {
  let farh = (temp * 9) / 5 + 32;
  return farh;
}

// Navbar
function NavbarHandeller() {
  document
    .querySelector("#open-nav-menu")
    .addEventListener("click", function () {
      document.querySelector("header nav .wrapper").classList.add("nav-open");
    });

  document
    .querySelector("#close-nav-menu")
    .addEventListener("click", function () {
      document
        .querySelector("header nav .wrapper")
        .classList.remove("nav-open");
    });
}

// Greeting Text Section
function GreetingHandeller() {
  let currentHours = new Date().getHours();

  let greetingText;
  if (currentHours < 12) {
    greetingText = "Good Morning";
  } else if (currentHours < 19) {
    greetingText = "Good Afternoon";
  } else if (currentHours < 24) {
    greetingText = "Good Evening";
  } else {
    greetingText = "Wellcome!";
  }
  const weaherCondition = "Sunny";
  const wetherLocation = "Mumbai";
  let temp = 25;
  let celText = `The weather is ${weaherCondition} in ${wetherLocation} and it is ${temp.toFixed(
    1
  )}F outside`;
  let fahrText = `The weather is ${weaherCondition} in ${wetherLocation} and it is ${celToFarh(
    temp
  ).toFixed(1)}F outside`;

  document.querySelector("#greeting").innerHTML = greetingText;
  document.querySelector("p#weather").innerHTML = celText;

  document
    .querySelector(".weather-group")
    .addEventListener("click", function (e) {
      // console.log(e.target.id);
      if (e.target.id == "celsius") {
        document.querySelector("p#weather").innerHTML = celText;
      }
      if (e.target.id == "fahr") {
        document.querySelector("p#weather").innerHTML = fahrText;
      }
    });
}

//Clock
function clockHandeller() {
  setInterval(function () {
    let localTime = new Date();
    document.querySelector("span[data-time=hours]").textContent = localTime
      .getHours()
      .toString()
      .padStart(2, "0");
    document.querySelector("span[data-time=minutes]").textContent = localTime
      .getMinutes()
      .toString()
      .padStart(2, "0");
    document.querySelector("span[data-time=seconds]").textContent = localTime
      .getSeconds()
      .toString()
      .padStart(2, "0");
  }, 1000);
}

// Gallery Images
function galleryHandeller() {
  let mainImage = document.querySelector("#gallery > img");
  let thumbnails = document.querySelector("#gallery .thumbnails");

  mainImage.src = galleryImages[0].src;
  mainImage.alt = galleryImages[0].alt;

  galleryImages.forEach(function (image, index) {
    let thumb = document.createElement("img");
    thumb.src = image.src;
    thumb.alt = image.alt;
    thumb.dataset.arrayIndex = index;
    thumb.dataset.selected = index === 0 ? true : false;
    thumb.addEventListener("click", function (e) {
      let selectedIndex = (e.target.dataset.arrayIndex = index);
      let sectedImage = galleryImages[selectedIndex];
      mainImage.src = sectedImage.src;
      mainImage.alt = sectedImage.alt;

      thumbnails.querySelectorAll("img").forEach(function (img) {
        img.dataset.selected = false;
        thumb.dataset.selected = true;
      });
    });
    thumbnails.appendChild(thumb);
  });
}

// Products Section

function productsHandeller() {
  let freeProducts = products.filter((item) => item.price <= 0);

  let paidProducts = products.filter((item) => item.price > 0);

  function populateProducts(productList) {
    let productsSection = document.querySelector(".products-area");
    productsSection.textContent = "";
    productList.forEach(function (product, index) {
      let productEle = document.createElement("div");
      productEle.classList.add("product-item");

      let productImage = document.createElement("img");
      productImage.src = product.image;
      productImage.alt = "This img from " + product.title;

      let productDetails = document.createElement("div");
      productDetails.classList.add("product-details");

      let productTitle = document.createElement("h3");
      productTitle.classList.add("product-title");
      productTitle.textContent = product.title;

      let productAuthor = document.createElement("p");
      productAuthor.classList.add("product-author");
      productAuthor.textContent = product.author;

      let priceTitle = document.createElement("p");
      priceTitle.classList.add("price-title");
      priceTitle.textContent = product.price;

      let productPrice = document.createElement("p");
      productPrice.classList.add("product-price");
      productPrice.textContent =
        product.price > 0 ? "$ " + product.price.toFixed(2) : "Free";

      productEle.append(productImage);
      productsSection.append(productEle);
      productEle.append(productDetails);

      productDetails.append(productTitle);
      productDetails.append(productAuthor);
      productDetails.append(priceTitle);
      productDetails.append(productPrice);
    });
  }

  document.querySelector(".products-filter label[for=all] span").textContent =
    products.length;

  document.querySelector(".products-filter label[for=paid] span").textContent =
    paidProducts.length;

  document.querySelector(".products-filter label[for=free] span").textContent =
    freeProducts.length;

  let productFilter = document.querySelector(".products-filter");

  populateProducts(products);

  productFilter.addEventListener("click", function (e) {
    if (e.target.id == "all") {
      populateProducts(products);
    }
    if (e.target.id == "paid") {
      populateProducts(paidProducts);
    }
    if (e.target.id == "free") {
      populateProducts(freeProducts);
    }
  });
}

//Footer Section
function footerHandeller() {
  let currentYear = new Date().getFullYear();
  document.querySelector(
    "footer"
  ).textContent = `© ${currentYear} - All rights reserved`;
}

navigator.geolocation.getCurrentPosition((position) => {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  console.log(longitude);
  let url = weatherAPIURL
    .replace("{ let }", { latitude })
    .replace("{ lon }", { longitude })
    .replace("{API Key}", weatherAPIKey);
  fetch(url)
    .then((response) => response.json())
    .then((data) => console.log(data));
});
NavbarHandeller();
GreetingHandeller();
clockHandeller();
galleryHandeller();
productsHandeller();
footerHandeller();
