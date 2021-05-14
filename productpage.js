function productPage(){
    for(let i = 0; i < 5; i++){
        fetch("http://localhost:3000/api/cameras")
    .then(function(response){
        if(response.ok){
            return response.json()
        }
    }).then(function(value){
        let div = document.querySelector(".mb-3")
        let img = document.querySelector(".card-img-top")
        let heading = document.querySelector(".card-title")
        let description = document.querySelector(".card-text")
        let optionOne = document.querySelector(".optionone")
        let optionTwo = document.querySelector(".optiontwo")
        let optionThree = document.querySelector(".optionthree")
        let price = document.querySelector(".price")
        div.setAttribute("class", value[i]._id)
        img.setAttribute("src", value[i].imageUrl)
        heading.textContent = value[i].name
        description.textContent = value[i].description;
        optionOne.setAttribute("value", value[i].lenses[0]) 
        optionTwo.setAttribute("value", value[i].lenses[1]) 
        optionOne.textContent = value[i].lenses[0]; 
        optionTwo.textContent = value[i].lenses[1]
        price.textContent = `${value[i].price}€`
        quantity.addEventListener("input", function(e){
            price.textContent = value[i].price * e.target.value + "$"
        })

    }).catch(function(error){
        alert("une erreur est survenue")
    })
}
    }

productPage();