/* -------------------- Index ---------------  */

function getProduct() {
  for (let i = 0; i < 5; i++) {
    fetch("http://localhost:3000/api/cameras/")
      .then(function (response) {
        if (response.ok) {
          return response.json();
        }
      })
      .then(function (value) {
        let col = document.createElement("div");
        let card = document.createElement("div");
        let cardBody = document.createElement("div");
        let img = document.createElement("img");
        let title = document.createElement("h2");
        let price = document.createElement("span");
        let description = document.createElement("p");
        let container = document.querySelector(".product");
        let link = document.createElement("a");
        container.appendChild(col);
        col.className = "col-12 col-md-6 mt-4";
        col.appendChild(card);
        card.className = "card";
        card.appendChild(img);
        img.setAttribute("src", value[i].imageUrl);
        col.appendChild(cardBody);
        title.className = "card-title";
        title.textContent = value[i].name;
        cardBody.appendChild(title);
        description.className = "card-text";
        description.textContent = value[i].description;
        cardBody.appendChild(description);
        link.className = "btn btn-primary";
        link.textContent = "pour plus de details";
        link.setAttribute("href", "productpage.html?id=" + value[i]._id);
        cardBody.appendChild(link);
      })
      .catch(function (err) {
        console.log("une erreur est survenue");
      });
  }
}

/*---------------------------------- Product page---------------------------- */

/* ---------Get data--------- */

function productPage() {
  fetch(`http://localhost:3000/api/cameras/${location.search.substring(4)}`)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
    })
    .then(function (value) {
      /* Selection element of the DOM */

      let img = document.querySelector(".card-img-top");
      let heading = document.querySelector(".card-title");
      let description = document.querySelector(".card-text");
      let price = document.querySelector(".price");
      let dropdownlist = document.querySelector(".form-select");
      let addToBasket = document.querySelector(".btn");

      /* Set up Element of the DOM */

      img.setAttribute("src", value.imageUrl);
      heading.textContent = value.name;
      description.textContent = value.description;
      price.textContent = `${value.price}€`;
      quantity.addEventListener("input", function (e) {
        price.textContent = value.price * e.target.value + "€";
      });
      for (let i = 0; i < value.lenses.length; i++) {
        let option = document.createElement("option");
        dropdownlist.appendChild(option);
        option.setAttribute("value", value.lenses[i]);
        option.textContent = value.lenses[i];
      }

      /* --Add to basket-- */

      addToBasket.addEventListener("click", function () {
        let price = document.querySelector(".price");
        let quantity = document.getElementById("quantity").value;
        let option =
          document.querySelector(".form-select").options[
            document.querySelector(".form-select").selectedIndex
          ].text;

        let selectionClient = {
          id: value._id,
          name: value.name,
          option: option,
          quantity: quantity,
          price: value.price * quantity + "€",
        };

        let shoppingCart = JSON.parse(localStorage.getItem("product"));

        /* Product in the Local Storage or not  */

        if (shoppingCart) {
          shoppingCart.push(selectionClient);
          localStorage.setItem("product", JSON.stringify(shoppingCart));
        } else {
          shoppingCart = [];
          shoppingCart.push(selectionClient);
          localStorage.setItem("product", JSON.stringify(shoppingCart));
        }
      });
    })
    .catch(function (error) {
      console.log("une erreur est survenue");
    });
}

/* -------------------------  Basket page------------------------------------------------ */

// Check client

let submit = document.getElementById("submit");
let firstName = document.getElementById("inputFirstName");
let lastName = document.getElementById("inputLastName");
let email = document.getElementById("inputEmail");
let address = document.getElementById("inputAddress");
let city = document.getElementById("inputCity");
let storage = JSON.parse(localStorage.getItem("product"));
let validation = document.getElementById("validation");
let inputs = document.getElementsByTagName("input");
let error = document.getElementById("error");
let form = document.getElementsByTagName("form");

// feedback

let feedBack = document.querySelector(".feedback");
let feedbackLastName = document.querySelector(".feedbacklastname");
let feedbackEmail = document.querySelector(".feedbackemail");
let feedbackCity = document.querySelector(".feedbackcity");
let feedbackAddress = document.querySelector(".feedbackaddress");

/* ----------------------------------Add to the basket------------------------------------ */

function basket() {
  /* Create element of the DOM */

  if (localStorage.product) {
    for (let i = 0; i < JSON.parse(localStorage.product).length; i++) {
      let list = JSON.parse(localStorage.getItem("product"));
      let tbody = document.querySelector(".tbody");
      let rank = document.createElement("tr");
      let cellPrice = document.createElement("td");
      let cellTitle = document.createElement("td");
      let cellQuantity = document.createElement("td");
      let cellOption = document.createElement("td");
      let deleteButton = document.createElement("td");
      let button = document.createElement("button");

      /* Add Attribute */

      cellPrice.className = "price";
      cellTitle.className = "title";
      cellOption.className = "option";
      cellQuantity.className = "quantity";
      deleteButton.className = "deletebutton";
      button.className = "btn btn-primary w-75";

      /* Insertion in the DOM */

      tbody.appendChild(rank);
      rank.appendChild(cellTitle);
      rank.appendChild(cellQuantity);
      rank.appendChild(cellOption);
      rank.appendChild(cellPrice);
      rank.appendChild(deleteButton);
      deleteButton.appendChild(button);

      /* Content of the node */

      cellTitle.textContent = list[i].name;
      cellQuantity.textContent = list[i].quantity;
      cellPrice.textContent = list[i].price;
      cellOption.textContent = list[i].option;
      button.textContent = "Supprimer l'article";

      /* Set up button */

      const productsArray = JSON.parse(localStorage.getItem("product"));

      for (let i = 0; i < productsArray.length; i++) {
        const theProduct = JSON.parse(localStorage.getItem("product"))[i];
        button.addEventListener("click", function () {
          let deleteRank = deleteButton.parentNode.parentNode;
          deleteRank.removeChild(rank);
        });
      }
    }

    /* Sum of total */

    const productsArray = JSON.parse(localStorage.getItem("product"));
    let totalPrice = [];
    for (let i = 0; i < productsArray.length; i++) {
      let priceInLocalStorage = JSON.parse(localStorage.getItem("product"))[i]
        .price;
      let priceInLocalStorageConvertInNum = parseInt(priceInLocalStorage);
      totalPrice.push(priceInLocalStorageConvertInNum);
    }
    let total = document.querySelector(".total");
    total.textContent = totalPrice.reduce((a, b) => a + b);
    total.textContent += "€";
  }
}

submit.addEventListener("click", function () {
  const contact = {
    firstName: firstName.value,
    lastName: lastName.value,
    address: address.value,
    city: city.value,
    email: email.value,
  };

  localStorage.setItem("contact", JSON.stringify(contact));
  const chekname = JSON.parse(localStorage.getItem("contact")).firstName;
  const checklastName = JSON.parse(localStorage.getItem("contact")).lastName;
  const checkEmail = JSON.parse(localStorage.getItem("contact")).email;
  const checkCity = JSON.parse(localStorage.getItem("contact")).city;
  const checkAddress = JSON.parse(localStorage.getItem("contact")).address;

  function checkValidity() {
    if (/^[a-zA-Z]{3,20}$/.test(chekname)) {
      feedBack.textContent = "données correctes";
      return true;
    } else {
      feedBack.textContent = "Veuillez remplir le champ au bon format";

      return false;
    }
  }

  function checkValidityLastName() {
    if (/^[a-zA-Z]{3,20}$/.test(checklastName)) {
      feedbackLastName.textContent = "données correctes";
      return true;
    } else {
      feedbackLastName.textContent = "Veuillez remplir le champ au bon format";
      return false;
    }
  }

  function checkValidityEmail() {
    if (/^([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})$/i.test(checkEmail)) {
      feedbackEmail.textContent = "données correctes";
      return true;
    } else {
      feedbackEmail.textContent = "Veuillez remplir le champ au bon format";
      return false;
    }
  }

  function checkValidityAddress() {
    if (/^[\w\s-ââéèçùïî]{5,30}$/i.test(checkAddress)) {
      feedbackAddress.textContent = "données correctes";
      return true;
    } else {
      feedbackAddress.textContent = "Veuillez remplir le champ au bon format";
      return false;
    }
  }

  function checkValidityCity() {
    if (/^[\w\s-ââéèçùïî]{3,30}$/i.test(checkCity)) {
      feedbackCity.textContent = "données correctes";
      return true;
    } else {
      feedbackCity.textContent = "Veuillez remplir le champ au bon format";
      return false;
    }
  }

  if (
    !checkValidity() ||
    !checkValidityLastName() ||
    !checkValidityEmail() ||
    !checkValidityAddress() ||
    !checkValidityCity()
  ) {
    localStorage.removeItem("contact");
  } else {
    localStorage.setItem("contact", JSON.stringify(contact));
  }
});

/* Faire en sorte que les valeurs du formulaires restent */

firstName.value = JSON.parse(localStorage.getItem("contact")).firstName;
lastName.value = JSON.parse(localStorage.getItem("contact")).lastName;
address.value = JSON.parse(localStorage.getItem("contact")).address;
city.value = JSON.parse(localStorage.getItem("contact")).city;
email.value = JSON.parse(localStorage.getItem("contact")).email;

const contact = JSON.parse(localStorage.getItem("contact"));
const productsArray = JSON.parse(localStorage.getItem("product"));

const request = {
  contact,
  products: [],
};

for (let i = 0; i < productsArray.length; i++) {
  const productsId = JSON.parse(localStorage.getItem("product"))[i].id;
  request.products.push(productsId);
}
/* JSON.parse(localStorage.getItem("product"))[0].id */

console.log("request");
console.log(request);

fetch("http://localhost:3000/api/cameras/order/", {
  method: "POST",
  body: JSON.stringify(request),
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
})
  .then(function (response) {
    if (response.ok) {
      return response.json();
    }
  })
  .then((value) => {
    /* console.log(value); */
    /* open("confirm.html?" + value.orderId) */
    submit.setAttribute("formaction", "confirm.html?order=" + value.orderId);
  });

/* ------------------Confirm Order ------------------- */

function confirmOrder() {
  let confirm = document.querySelector(".confirm");
  confirm.textContent = `Votre commande n° ${location.search.substring(
    7
  )} a bien été validé.\n Vous recevrez un mail de confirmation dans quelques instants`;
  localStorage.clear();
}

/*    Send data to server   */

/* let submit = document.getElementById("submit");
    let firstName = document.getElementById("inputFirstName");
    let lastName = document.getElementById("inputLastName");
    let email = document.getElementById("inputEmail");
    let address = document.getElementById("inputAddress");
    let city = document.getElementById("inputCity");
    let storage = JSON.parse(localStorage.getItem("product"));
    let validation = document.getElementById("validation")
    let inputs = document.getElementsByTagName("input")
    let error = document.getElementById("error") 
    let form = document.getElementsByTagName("form") */

/* document.addEventListener("input", function () {
      const contact = {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value,
      };

      localStorage.setItem("contact", JSON.stringify(contact));
      const chekname = JSON.parse(localStorage.getItem("contact")).firstName;
      const checklastName = JSON.parse(
        localStorage.getItem("contact")
      ).lastName;
      const checkEmail = JSON.parse(localStorage.getItem("contact")).email;
      const checkCity = JSON.parse(localStorage.getItem("contact")).city;
      const checkAddress = JSON.parse(localStorage.getItem("contact")).address;

      function checkValidity() {
        if (/^[a-zA-Z]{3,20}$/.test(chekname)) {
          feedBack.textContent = "données correctes";
          return true;
        } else {
          feedBack.textContent = "Veuillez remplir le champ au bon format";
          return false;
        }
      }

      function checkValidityLastName() {
        if (/^[a-zA-Z]{3,20}$/.test(checklastName)) {
          feedbackLastName.textContent = "données correctes";
          return true;
        } else {
          feedbackLastName.textContent =
            "Veuillez remplir le champ au bon format";
          return false;
        }
      }

      function checkValidityEmail() {
        if (/^([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})$/i.test(checkEmail)) {
          feedbackEmail.textContent = "données correctes";
          return true;
        } else {
          feedbackEmail.textContent = "Veuillez remplir le champ au bon format";
          return false;
        }
      }

      function checkValidityAddress() {
        if (/^[\w\s-ââéèçùïî]{5,30}$/i.test(checkAddress)) {
          feedbackAddress.textContent = "données correctes";
          return true;
        } else {
          feedbackAddress.textContent =
            "Veuillez remplir le champ au bon format";
          return false;
        }
      }

      function checkValidityCity() {
        if (/^[\w\s-ââéèçùïî]{5,30}$/i.test(checkCity)) {
          feedbackCity.textContent = "données correctes";
          return true;
        } else {
          feedbackCity.textContent = "Veuillez remplir le champ au bon format";
          return false;
        }
      }


      if (
        !checkValidity() ||
        !checkValidityLastName() ||
        !checkValidityEmail() ||
        !checkValidityAddress() ||
        !checkValidityCity()
      ) {
        localStorage.removeItem("contact");
      } else {
        localStorage.setItem("contact", JSON.stringify(contact));
      }
    }); */

/* Faire en sorte que les valeurs du formulaires restent */

/* firstName.value = JSON.parse(localStorage.getItem("contact")).firstName;
    lastName.value = JSON.parse(localStorage.getItem("contact")).lastName;
    address.value = JSON.parse(localStorage.getItem("contact")).address;
    city.value = JSON.parse(localStorage.getItem("contact")).city;
    email.value = JSON.parse(localStorage.getItem("contact")).email;
 */
/* Send data */
