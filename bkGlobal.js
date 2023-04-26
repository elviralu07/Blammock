var cartItems = new Map();
localStorage.setItem("cartItems", JSON.stringify(cartItems));
var storedItems = JSON.parse(localStorage.getItem("cartItems"));
var num = 0;

var counter = 0;

const addItem = function(userColor, userQuantity) {
    counter++;
    cartItems.set(counter, {
        color: userColor,
        quantity: userQuantity
    })
    num = 0;
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
        //getCart();
        $("#sidebar").css("right", "0px");
    })

    $("#cart-close").on("click", function() {
        console.log("hello");
        $("#sidebar").css("right", "-500px");
    })

    $("#add-to-cart-btn").on("click", function() {
        addItem("red", 3);
        console.log(cartItems);
        //updateCart();
    })

    $(".quantity-counter").on("click", function() {
        if(this.value == "-" && num > 0) {
            num--;
        } else if (this.value == "+") {
            num++;
        } else {
            console.log("error")
        }
        $("#quantity").html(num);
    })
})