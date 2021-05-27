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
const productsArray = JSON.parse(localStorage.getItem("product"));

function counter(){
  let counter = document.querySelector(".counter")
  if (productsArray.length > 0)
  
  counter.textContent = JSON.parse(localStorage.product).length; 
}
function basket() {

  const productsArray = JSON.parse(localStorage.getItem("product"));
  let header = document.querySelector(".header");
  let tfoot = document.querySelector(".footer");

  if (productsArray.length > 0) {
  /* Create the title of the table */

    let thTitle = document.createElement("th")
    let thPrice = document.createElement("th")
    let thQuantity = document.createElement("th")
    let thOption = document.createElement("th")
    let thDelete = document.createElement("th")
    let thTotal = document.createElement("th")
    let total = document.createElement("td")

  /* Add attribute to the title of the table */

  thTitle.setAttribute("scope","col"); 
  thPrice.setAttribute("scope","col");
  thQuantity.setAttribute("scope","col");
  thOption.setAttribute("scope","col");
  thDelete.setAttribute("scope","col");
  thTotal.setAttribute("colspan","3");
  total.className = "total"

  /* Add textContent to the title */

  thTitle.textContent = "Libellé"
  thPrice.textContent = "Prix"
  thQuantity.textContent = "Quantité"
  thOption.textContent = "Option"
  thDelete.textContent = "Supprimer"
  thTotal.textContent = "Total"
  

  /* Insertion in the dom */

  header.appendChild(thTitle)
  header.appendChild(thQuantity)
  header.appendChild(thOption)
  header.appendChild(thPrice)
  header.appendChild(thDelete)
  tfoot.appendChild(thTotal)
  tfoot.appendChild(total)



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
      const productsInTheLocalStorage = JSON.stringify(productsArray);
      const theProduct = JSON.parse(localStorage.getItem("product"))[i];

      button.addEventListener("click", function () {
        let deleteRank = deleteButton.parentNode.parentNode;
        deleteRank.removeChild(rank);
        productsArray.splice(i, 1);
        localStorage.setItem("product", JSON.stringify(productsArray));
        /* console.log("productsArray")
          console.log(productsArray)
          console.log("productsArray[i]")
          console.log(productsArray[i]) */
        /* console.log("test")
          console.log(test) */
        /*  console.log("productsArray")
          console.log(productsArray) */
        window.location.href = "panier.html";
        /* console.log("productsArray[i]")
          console.log(productsArray[i]) */

        /* productsArray.splice(theProduct,i)
          localStorage.setItem("product", JSON.stringify(productsArray))
          console.log("theProduct")
          console.log(theProduct)
          console.log("productsArray")
          console.log(productsArray)
          console.log("productsInTheLocalStorage")
          console.log(productsInTheLocalStorage) */
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
      let total = document.querySelector(".total");
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
          window.location.href = "confirm.html?order=" + value.orderId;
        });
    }
  }else {
    let infoPurchase = document.querySelector(".infopurchase")
    infoPurchase.textContent = "Votre panier est vide"
  }
}

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
