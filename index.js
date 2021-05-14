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




/* Product page */

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


    /* Set up Element of the DOM */

    img.setAttribute("src", value.imageUrl)
    heading.textContent = value.name
    description.textContent = value.description;
    price.textContent = `${value.price}€`
    quantity.addEventListener("input", function(e){
      price.textContent = value.price * e.target.value + "$" 

  })
  for (let i = 0; i < value.lenses.length; i++){
    let option = document.createElement("option"); 
    dropdownlist.appendChild(option); 
    option.textContent = value.lenses[i]; 

  }

  }).catch(function(error){
    console.log("une erreur est survenue")
  })
}

