
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
        link.addEventListener("click", function () {
          let paramsString = "productpage.html"
          let url = new URLSearchParams(paramsString); 
          url.append("id", value[i]._id)
        });
      })
      .catch(function (err) {
        console.log("une erreur est survenue");
      });
  }
}




/*---------------------------------- Product page---------------------------- */

/* ---------Get data--------- */

function productPage(){ 
  fetch(`http://localhost:3000/api/cameras/${location.search.substring(4)}`)
  .then(function(response){
    if (response.ok){
      return response.json()
    }
  }).then(function(value){

    /* Selection element of the DOM */

    let img = document.querySelector(".card-img-top")
    let heading = document.querySelector(".card-title")
    let description = document.querySelector(".card-text")
    let price = document.querySelector(".price")
    let dropdownlist = document.querySelector(".form-select")
    let addToBasket = document.querySelector(".btn"); 


    /* Set up Element of the DOM */

    img.setAttribute("src", value.imageUrl)
    heading.textContent = value.name
    description.textContent = value.description;
    price.textContent = `${value.price}€`
    quantity.addEventListener("input", function(e){
      price.textContent = value.price * e.target.value + "€" 

  })
  for (let i = 0; i < value.lenses.length; i++){
    let option = document.createElement("option"); 
    dropdownlist.appendChild(option); 
    option.setAttribute("value", value.lenses[i]); 
    option.textContent = value.lenses[i]; 

  }

 

  /* --Add to basket-- */

  addToBasket.addEventListener("click", function(){
  let price = document.querySelector(".price")
  let quantity  = document.getElementById("quantity").value
  let option = document.querySelector(".form-select").options[document.querySelector(".form-select").selectedIndex].text
  
  let selectionClient = {
    name: value.name, 
    option: option, 
    quantity: quantity, 
    price: value.price * quantity + "€",
  }

  /* Setup POPup */

  const popup = () => {
    if (window.confirm(`Vous avez ajouté au panier  ${selectionClient.quantity} ${selectionClient.name} avec une lentille de ${selectionClient.option} pour un total de ${selectionClient.price}. Voulez vous retouner sur la page d'accueil ou voir votre panier? OK pour voir votre panier, ANNULER pour retourner sur la page d'accueil `)) {
      window.open("panier.html");
  }else {
    window.open("index.html");
  }
  }

  let shoppingCart = JSON.parse(localStorage.getItem("product"))
  /* Product in the Local Storage or not  */
  
  
  if (shoppingCart){
    shoppingCart.push(selectionClient); 
    localStorage.setItem("product", JSON.stringify(shoppingCart))
    popup()
  }else {
    shoppingCart = []; 
    shoppingCart.push(selectionClient); 
    localStorage.setItem("product", JSON.stringify(shoppingCart))
    popup()
  }
  })

  }).catch(function(error){
    console.log("une erreur est survenue")
  })
}



/* -------------------------  Basket page------------------------------------------------ */

function basket(){

  /* Create element of the DOM */

  if (localStorage.product){
    for (let i = 0; i < JSON.parse(localStorage.product).length; i++){
      let list = JSON.parse(localStorage.getItem("product"))
      let tbody = document.querySelector(".tbody")
      let rank = document.createElement("tr"); 
      let cellPrice = document.createElement("td")
      let cellTitle = document.createElement("td"); 
      let cellQuantity = document.createElement("td"); 
      let cellOption = document.createElement("td"); 
      let total = document.querySelector(".total")
  
  
    /* Add Attribute */
  
      cellPrice.className = "price"
      cellTitle.className = "title"
      cellOption.className = "option"
      cellQuantity.className = "quantity"
  
    /* Insertion in the DOM */
      
    tbody.appendChild(rank)
    rank.appendChild(cellTitle)
    rank.appendChild(cellQuantity)
    rank.appendChild(cellOption)
    rank.appendChild(cellPrice)
  
    /* Content of the node */
  
    cellTitle.textContent  = list[i].name; 
    cellQuantity.textContent = list[i].quantity; 
    cellPrice.textContent = list[i].price ; 
    cellOption.textContent = list[i].option; 
    total.textContent = list[i].price 
  
  } 
    }
  }
      
    





