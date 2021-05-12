var container = document.querySelector(".product");

function getProduct() {
  for (let i = 0; i < 5; i++) {
    fetch("http://localhost:3000/api/cameras")
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
        cardBody.appendChild(link);
      })
      .catch(function (err) {
        alert("une erreur est survenue");
      });
  }
}

getProduct();

/* Product list */
