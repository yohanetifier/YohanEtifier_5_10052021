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
        /* Create element  */

        let col = document.createElement("div");
        let card = document.createElement("div");
        let cardBody = document.createElement("div");
        let img = document.createElement("img");
        let title = document.createElement("h2");
        let price = document.createElement("span");
        let description = document.createElement("p");
        let link = document.createElement("a");
        let container = document.querySelector(".product");

        /* Set attribute */

        col.className = "col-lg-4 col-md-6 p-0 bg-primary shadow rounded";
        description.className = "card-text";
        title.className = "card-title";
        card.className = "card";
        cardBody.className = "card-body";
        img.setAttribute("src", value[i].imageUrl);
        img.className = "card-img-top h-100";
        link.setAttribute("href", "productpage.html?id=" + value[i]._id);
        link.className = "btn btn-secondary";

        /* Set content */
        title.textContent = value[i].name;
        description.textContent = value[i].description;
        link.textContent = "pour plus de details";

        /* Insertion in the DOM */
        container.appendChild(col);
        col.appendChild(card);
        card.appendChild(img);
        col.appendChild(cardBody);
        cardBody.appendChild(title);
        cardBody.appendChild(description);
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

        let shoppingCart = localStorage.getItem("product");

        /* Product in the Local Storage or not  */

        if (shoppingCart) {
          shoppingCart = JSON.parse(localStorage.getItem("product"));
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

// feedback

let feedBack = document.querySelector(".feedback");
let feedbackLastName = document.querySelector(".feedbacklastname");
let feedbackEmail = document.querySelector(".feedbackemail");
let feedbackCity = document.querySelector(".feedbackcity");
let feedbackAddress = document.querySelector(".feedbackaddress");

/* ----------------------------------Add to the basket------------------------------------ */

let infoPurchase = document.querySelector(".infopurchase");
let badgeCounter = document.querySelector(".badge");

function counter() {
  const productsArray = JSON.parse(localStorage.getItem("product"));
  if (localStorage.length > 0) {
    badgeCounter.textContent = JSON.parse(localStorage.product).length;
  }
}

function basket() {
  const productsArray = localStorage.getItem("product");
  let header = document.querySelector(".header");
  let tfoot = document.querySelector(".footer");

  if (productsArray.length > 2) {
    /* Create the title of the table */

    let infoPurchase = document.querySelector(".nopurchase");
    infoPurchase.classList.remove("d-flex");
    infoPurchase.classList.add("d-none");

    let thTitle = document.createElement("th");
    let thPrice = document.createElement("th");
    let thQuantity = document.createElement("th");
    let thOption = document.createElement("th");
    let thDelete = document.createElement("th");
    let thTotal = document.createElement("th");
    let quantityTotal = document.createElement("td");
    let optionTotal = document.createElement("td");
    let total = document.createElement("td");

    /* Add attribute to the title of the table */

    thTitle.setAttribute("scope", "col");
    thPrice.setAttribute("scope", "col");
    thQuantity.setAttribute("scope", "col");
    thOption.setAttribute("scope", "col");
    thDelete.setAttribute("scope", "col");
    thTotal.setAttribute("colspan", "1");
    total.className = "total";

    /* Add textContent to the title */

    thTitle.textContent = "Libellé";
    thPrice.textContent = "Prix";
    thQuantity.textContent = "Quantité";
    thOption.textContent = "Option";
    thDelete.textContent = "Supprimer";
    thTotal.textContent = "Total";
    infoPurchase.textContent = "";

    /* Insertion in the dom */

    header.appendChild(thTitle);
    header.appendChild(thQuantity);
    header.appendChild(thOption);
    header.appendChild(thPrice);
    header.appendChild(thDelete);
    tfoot.appendChild(thTotal);
    tfoot.appendChild(quantityTotal);
    tfoot.appendChild(optionTotal);
    tfoot.appendChild(total);

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
      let trash = document.createElement("i");

      /* Add Attribute */

      cellPrice.className = "price";
      cellTitle.className = "title";
      cellOption.className = "option";
      cellQuantity.className = "quantity";
      deleteButton.className = "deletebutton";
      button.className = "btn btn-secondary w-75";
      trash.className = "bi bi-trash";

      /* Insertion in the DOM */

      tbody.appendChild(rank);
      rank.appendChild(cellTitle);
      rank.appendChild(cellQuantity);
      rank.appendChild(cellOption);
      rank.appendChild(cellPrice);
      rank.appendChild(deleteButton);
      deleteButton.appendChild(button);
      button.appendChild(trash);

      /* Content of the node */

      cellTitle.textContent = list[i].name;
      cellQuantity.textContent = list[i].quantity;
      cellPrice.textContent = list[i].price;
      cellOption.textContent = list[i].option;
      /* button.textContent = "Supprimer l'article"; */
      button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
    </svg>`;

      /* Set up button */

      const productsArray = JSON.parse(localStorage.getItem("product"));
      const productsInTheLocalStorage = JSON.stringify(productsArray);
      const theProduct = JSON.parse(localStorage.getItem("product"))[i];

      button.addEventListener("click", function () {
        let deleteRank = deleteButton.parentNode.parentNode;
        deleteRank.removeChild(rank);
        productsArray.splice(i, 1);
        localStorage.setItem("product", JSON.stringify(productsArray));
        window.location.reload();
      });
    }

    /* Sum of total */

    const productsArray = JSON.parse(localStorage.getItem("product"));
    if (productsArray.length > 0) {
      let totalPrice = [];
      for (let i = 0; i < productsArray.length; i++) {
        let priceInLocalStorage = JSON.parse(localStorage.getItem("product"))[i]
          .price;
        let priceInLocalStorageConvertInNum = parseInt(priceInLocalStorage);
        totalPrice.push(priceInLocalStorageConvertInNum);
      }
      /* let total = document.querySelector(".total"); */
      total.textContent = totalPrice.reduce((a, b) => a + b);
      total.textContent += "€";
    }

    /* When a user click */

    submit.addEventListener("click", function () {
      /* Make a object with the infoclient */

      const infoClient = {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value,
      };

      /* Create the object in the local storage */

      localStorage.setItem("contact", JSON.stringify(infoClient));
      const chekname = JSON.parse(localStorage.getItem("contact")).firstName;
      const checklastName = JSON.parse(
        localStorage.getItem("contact")
      ).lastName;
      const checkEmail = JSON.parse(localStorage.getItem("contact")).email;
      const checkCity = JSON.parse(localStorage.getItem("contact")).city;
      const checkAddress = JSON.parse(localStorage.getItem("contact")).address;

      /* Control user input */

      function checkValidity() {
        if (/^[a-zA-Z]{3,20}$/.test(chekname)) {
          feedBack.textContent = "Données correctes";
          document
            .getElementById("inputFirstName")
            .classList.remove("border-danger");
          document
            .getElementById("inputFirstName")
            .classList.add("border-success");
          return true;
        } else {
          feedBack.textContent = "Veuillez remplir le champ au bon format";

          document
            .getElementById("inputFirstName")
            .classList.add("border-danger");
          return false;
        }
      }

      function checkValidityLastName() {
        if (/^[a-zA-Z]{3,20}$/.test(checklastName)) {
          feedbackLastName.textContent = "Données correctes";
          document
            .getElementById("inputLastName")
            .classList.remove("border-danger");
          document
            .getElementById("inputLastName")
            .classList.add("border-success");
          return true;
        } else {
          feedbackLastName.textContent =
            "Veuillez remplir le champ au bon format";
          document
            .getElementById("inputLastName")
            .classList.add("border-danger");
          return false;
        }
      }

      function checkValidityEmail() {
        if (/^([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})$/i.test(checkEmail)) {
          feedbackEmail.textContent = "Données correctes";
          document
            .getElementById("inputEmail")
            .classList.remove("border-danger");
          document.getElementById("inputEmail").classList.add("border-success");
          return true;
        } else {
          feedbackEmail.textContent = "Veuillez remplir le champ au bon format";
          document.getElementById("inputEmail").classList.add("border-danger");
          return false;
        }
      }

      function checkValidityAddress() {
        if (/^[\w\s-ââéèçùïî]{5,30}$/i.test(checkAddress)) {
          feedbackAddress.textContent = "données correctes";
          document
            .getElementById("inputAddress")
            .classList.remove("border-danger");
          document
            .getElementById("inputAddress")
            .classList.add("border-success");
          return true;
        } else {
          feedbackAddress.textContent =
            "Veuillez remplir le champ au bon format";
          document
            .getElementById("inputAddress")
            .classList.add("border-danger");
          return false;
        }
      }

      function checkValidityCity() {
        if (/^[\w\s-ââéèçùïî]{3,30}$/i.test(checkCity)) {
          feedbackCity.textContent = "données correctes";
          document
            .getElementById("inputCity")
            .classList.remove("border-danger");
          document.getElementById("inputCity").classList.add("border-success");
          return true;
        } else {
          feedbackCity.textContent = "Veuillez remplir le champ au bon format";
          document.getElementById("inputCity").classList.add("border-danger");
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
        localStorage.setItem("contact", JSON.stringify(infoClient));
      }
    });

    /* Faire en sorte que les valeurs du formulaires restent */

    if (localStorage.getItem("contact")) {
      firstName.value = JSON.parse(localStorage.getItem("contact")).firstName;
      lastName.value = JSON.parse(localStorage.getItem("contact")).lastName;
      address.value = JSON.parse(localStorage.getItem("contact")).address;
      city.value = JSON.parse(localStorage.getItem("contact")).city;
      email.value = JSON.parse(localStorage.getItem("contact")).email;
    }

    /* Create object for the server */

    const contact = JSON.parse(localStorage.getItem("contact"));
    const productsArr = JSON.parse(localStorage.getItem("product"));

    const request = {
      contact,
      products: [],
    };

    /* Put all the products ID in the object */

    for (let i = 0; i < productsArr.length; i++) {
      const productsId = JSON.parse(localStorage.getItem("product"))[i].id;
      request.products.push(productsId);
    }
    /* JSON.parse(localStorage.getItem("product"))[0].id */

    /* Send the object to the server */

    if (localStorage.product && localStorage.contact) {
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
          window.location.href =
            "confirm.html?order=" +
            value.orderId +
            "&total=" +
            total.textContent +
            "&name=" +
            request.contact.lastName +
            "&email=" +
            request.contact.email;
        });
    }
  }
}

/* ------------------Confirm Order ------------------- */

function confirmOrder() {
  let confirm = document.querySelector(".confirm");
  let params = new URLSearchParams(location.search);
  confirm.textContent = `Votre commande n° ${params.get(
    "order"
  )} de ${params.get(
    "total"
  )} a bien été validée.\nVous recevrez un mail de confirmation à ${params.get(
    "email"
  )} dans quelques instants.\n Mr ${params
    .get("name")
    .toUpperCase()},  Orinico vous remercie de votre commande.`;
  localStorage.clear();
}
