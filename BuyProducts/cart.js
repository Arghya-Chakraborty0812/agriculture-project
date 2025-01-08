let cartItems = 0;

const addtocartButton = document.querySelectorAll(".addtocart");
const itemsCount = document.querySelector("#itemsCount");

addtocartButton.forEach((button) => {
    button.addEventListener("click", () => {
        console.log("button was clicked");
        cartItems ++ ;
        itemsCount.innerText = cartItems;
    });
});