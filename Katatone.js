fetch("http://localhost:3000/api/cameras")
  .then(function (response) {
    if (response.ok) {
      return response.json();
    }
  })
  .then(function(value){
    let card = document.querySelector(".card");
    let colone = document.createElement("div");
    let row = document.createElement("div");
    let coltwo = document.createElement("div")
    let cardBody = document.createElement("div");
    let img = document.createElement("img");
    let title = document.createElement("h2");
    let price = document.createElement("p");
    let amount = document.createElement("p"); 
    let description = document.createElement("p");
    let link = document.createElement("a");
    let dropdownList = document.createElement("select");
    let optionOne = document.createElement("option")
    let optionTwo = document.createElement("option"); 
    let optionThree = document.createElement("option"); 
    let labelForQuantity = document.createElement("label");
    let quantity = document.createElement("input"); 
    row.className = "row g-0";
    card.appendChild(row); 
    colone.className = "col-lg-4"; 
    row.appendChild(colone); 
    img.setAttribute("src", value[4].imageUrl); 
    img.className = "card-img-top"; 
    colone.appendChild(img); 
    row.appendChild(coltwo); 
    coltwo.className = "col-lg-8"; 
    coltwo.appendChild(cardBody); 
    cardBody.className = "card-body"; 
    cardBody.appendChild(title); 
    title.className = "card-title"; 
    title.textContent = value[4].name;
    cardBody.appendChild(description); 
    description.className = "card-text"; 
    description.textContent = value[4].description; 
    cardBody.appendChild(dropdownList);
    dropdownList.appendChild(optionOne); 
    dropdownList.appendChild(optionTwo); 
    dropdownList.appendChild(optionThree); 
    optionOne.textContent = value[4].lenses[0]; 
    optionOne.setAttribute("value", value[1].lenses[0]);
    optionTwo.textContent = value[4].lenses[1]; 
    optionTwo.setAttribute("value", value[4].lenses[1]);
    optionThree.textContent = value[4].lenses[2]; 
    optionThree.setAttribute("value", value[4].lenses[2])
    cardBody.appendChild(labelForQuantity); 
    labelForQuantity.textContent = "Quantités"; 
    labelForQuantity.setAttribute("for", "quantity");
    cardBody.appendChild(quantity); 
    quantity.setAttribute("id", "quantity"); 
    quantity.setAttribute("name", "quantity"); 
    quantity.setAttribute("type", "number"); 
    quantity.setAttribute("min", "1"); 
    quantity.setAttribute("max", "10"); 
    cardBody.appendChild(price);
    price.textContent = "Prix: ";
    cardBody.appendChild(amount); 
    amount.textContent = value[4].price + "$";
    quantity.addEventListener("input", function(e){
        amount.textContent = value[4].price * e.target.value + "$"
    })
    cardBody.appendChild(link); 
    link.className = "btn btn-primary";
    link.textContent = "Ajouter au panier";
  })
  .catch(function (error) {
    alert("une erreur est survenue");
  });
