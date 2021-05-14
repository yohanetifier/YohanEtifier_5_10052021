/* function getProduct() {
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
          let params = "///Users/yohanetifier/Desktop/P5_ETIFIER_YOHAN/index.html"
          var searchParams = new URLSearchParams(params); 
          searchParams.append("id", value[i]._id)
          searchParams.toString(); 
          console.log(searchParams)
        });
      })
      .catch(function (err) {
        console.log("une erreur est survenue");
      });
  }
} */

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
        let link = document.createElement("button");
        let inputHidden = document.createElement("input")
        let inputSubmit = document.createElement("button")
        let formAction = document.createElement("formaction")
        
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

        inputSubmit.setAttribute("formaction","file:///Users/yohanetifier/Desktop/P5_ETIFIER_YOHAN/productpage.html")
        cardBody.appendChild(formAction);
        formAction.setAttribute("action", "productpage.html")
        formAction.appendChild(inputHidden)
        inputHidden.setAttribute("type", "hidden")
        inputHidden.setAttribute("id", value[i]._id)
        formAction.appendChild(inputSubmit)
        inputSubmit.setAttribute("type", "submit")
        inputSubmit.textContent = "fiche produit"

      })
      .catch(function (err) {
        console.log("une erreur est survenue");
      });
  }
}

/* Product page */

function productPage(){
  let params = location.search; 
  console.log(params)

      /* let div = document.querySelector(".mb-3")
      let img = document.querySelector(".card-img-top")
      let heading = document.querySelector(".card-title")
      let description = document.querySelector(".card-text")
      let optionOne = document.querySelector(".optionone")
      let optionTwo = document.querySelector(".optiontwo")
      let optionThree = document.querySelector(".optionthree")
      let price = document.querySelector(".price")
      div.setAttribute("class", value[0]._id)
      img.setAttribute("src", value[0].imageUrl)
      heading.textContent = value[0].name
      description.textContent = value[0].description;
      optionOne.setAttribute("value", value[0].lenses[0]) 
      optionTwo.setAttribute("value", value[0].lenses[1]) 
      optionOne.textContent = value[0].lenses[0]; 
      optionTwo.textContent = value[0].lenses[1]
      price.textContent = `${value[0].price}€`
      quantity.addEventListener("input", function(e){
          price.textContent = value[0].price * e.target.value + "$"
      }) */

  }

/* function getURL (sName, sEmail) {
    window.location =" http://www.nullskull.com/articles/ querystringjs.htm? name = "+ sName +" & email = "+ sEmail;
    } */
