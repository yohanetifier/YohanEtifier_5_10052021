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
    let price = document.createElement("span");
    let description = document.createElement("p");
    let link = document.createElement("a");
    let dropdownList = document.createElement("select");
    let optionOne = document.createElement("option")
    let optionTwo = document.createElement("option"); 
    row.className = "row g-0";
    card.appendChild(row); 
    colone.className = "col-lg-4"; 
    row.appendChild(colone); 
    img.setAttribute("src", value[0].imageUrl); 
    img.className = "card-img-top"; 
    colone.appendChild(img); 
    row.appendChild(coltwo); 
    coltwo.className = "col-lg-8"; 
    coltwo.appendChild(cardBody); 
    cardBody.className = "card-body"; 
    cardBody.appendChild(title); 
    title.className = "card-title"; 
    title.textContent = value[0].name;
    cardBody.appendChild(description); 
    description.className = "card-text"; 
    description.textContent = value[0].description; 
    cardBody.appendChild(dropdownList);
    dropdownList.appendChild(optionOne); 
    dropdownList.appendChild(optionTwo); 
    optionOne.textContent = value[0].lenses[0]; 
    optionOne.setAttribute("value", value[0].lenses[0]);
    optionTwo.textContent = value[0].lenses[1]; 
    optionTwo.setAttribute("value", value[0].lenses[1]);


    
  })
  .catch(function (error) {
    alert("une erreur est survenue");
  });
