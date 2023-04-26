var cartItems = new Map();
localStorage.setItem("cartItems", JSON.stringify(cartItems));
var storedItems = JSON.parse(localStorage.getItem("cartItems"));

const addItem = function() {
    cartItems.set("item1", {
        color: "red",
        quantity: "3"
    })
}

$(document).ready(function () {
    console.log("hello");

    $("#top").on("click", function() {
        window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
        })
    })

    $("#cart-toggle").on("click", function() {
        console.log("hello");
        $("#sidebar").css("right", "0px");
    })

    $("#cart-close").on("click", function() {
        console.log("hello");
        $("#sidebar").css("right", "-500px");
    })

    $("#add-to-cart-btn").on("click", function() {
        addItem();
        console.log(cartItems);
    })
})