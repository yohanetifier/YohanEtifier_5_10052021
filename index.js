
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
        /* link.setAttribute("href",`./${value[i].name.split(" ").join("")}.html`)  */
        link.setAttribute("href", "productpage.html?id=" + value[i]._id) 
        cardBody.appendChild(link);

        
      })
      .catch(function (err) {
        console.log("une erreur est survenue");
      });
  }
}



/* Product page */

function productPage(){
  let params = fetch("file:///Users/yohanetifier/Desktop/P5_ETIFIER_YOHAN/productpage.html?id=5be1ed3f1c9d44000030b061")
  var searchParams = new URLSearchParams(params)
   console.log(params)

  }

 


