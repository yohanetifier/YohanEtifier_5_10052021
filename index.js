let idProduct = ""

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

/* Get data */

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

  /* Add to basket */

  addToBasket.addEventListener("click", function(){
  let price = document.querySelector(".price")
  let quantity  = document.getElementById("quantity").value
  let option = document.querySelector(".form-select").options[document.querySelector(".form-select").selectedIndex].text

  
  
  for (let i = 0; i < 15; i++)
  if (localStorage.name && localStorage.price && localStorage.quantity && localStorage.option){
  localStorage.setItem("price"[i + 1], value.price * quantity + "€")
  localStorage.setItem("name"[i + 1], value.name)
  localStorage.setItem("option"[i + 1],option)
  localStorage.setItem("quantity"[i + 1], quantity)
  }else {
  localStorage.setItem("price", value.price * quantity + "€")
  localStorage.setItem("name", value.name)
  localStorage.setItem("option",option)
  localStorage.setItem("quantity", quantity)
  }
  
  console.log(localStorage.getItem("price"))
  console.log(localStorage.getItem("name"))
  console.log(localStorage.getItem("option"))
  console.log(localStorage.getItem("quantity")) 

  })

  

  }).catch(function(error){
    console.log("une erreur est survenue")
  })
}

/* localStorage.clear(); */


/* -------------------------  Basket page------------------------------------------------ */

function basket(){
  /* Create element of the DOM */

  for (let i = 0; i < localStorage.length; i++){
    let tbody = document.querySelector(".tbody")
    let rank = document.createElement("tr"); 
    let number = document.createElement("th")
    let cellPrice = document.createElement("td")
    let cellTitle = document.createElement("td"); 
    let cellQuantity = document.createElement("td"); 
    let cellOption = document.createElement("td"); 

  /* Add Attribute */

    number.setAttribute("scope", "row"); 
    cellPrice.className = "price"
    cellTitle.className = "title"
    cellOption.className = "option"
    cellQuantity.className = "quantity"

    /* Insertion in the DOM */
    tbody.appendChild(rank)
    rank.appendChild(number)
    rank.appendChild(cellTitle)
    rank.appendChild(cellQuantity)
    rank.appendChild(cellOption)
    rank.appendChild(cellPrice)

  let price = document.querySelector(".price"); 
  let quantity = document.querySelector(".quantity"); 
  let title = document.querySelector(".title")
  let option = document.querySelector(".option")
  rank.textContent += 1
  title.textContent = localStorage.getItem("name")
  price.textContent = localStorage.getItem("price")
  quantity.textContent = localStorage.getItem("quantity")
  option.textContent = localStorage.getItem("option") 
  }
  /* let price = document.querySelector(".price"); 
  let quantity = document.querySelector(".quantity"); 
  let title = document.querySelector(".title")
  let option = document.querySelector(".option")
  title.textContent = localStorage.getItem("name")
  price.textContent = localStorage.getItem("price")
  quantity.textContent = localStorage.getItem("quantity")
  option.textContent = localStorage.getItem("option") */
  
}




