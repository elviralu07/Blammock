const bmColors = {
    color1: ["Ivy Green", "darkolivegreen", "Green"],
    color2: ["Ocean Blue", "navy", "Blue"],
    color3: ["Earth Brown", "sienna", "Red"]
}

var cartItems = new Map();
localStorage.setItem("cartItems", JSON.stringify(cartItems));
var storedItems = JSON.parse(localStorage.getItem("cartItems"));
var counter = 0;

var qNum = 1;
var color = "";

const addItem = function(userColor, userQuantity) {
    counter++;
    cartItems.set(counter, {
        color: userColor,
        quantity: userQuantity
    })
    qNum = 1;
    $("#quantity").html(qNum);
}

$(document).ready(function() {
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
        addItem(color, qNum);
        console.log(cartItems);
        //updateCart();
    })

    $(".option-c").on("click", function() {
        let x = this.id;
        color = bmColors[x];
        console.log(color[0]);
    })

    $(".quantity-counter").on("click", function() {
        if(this.value == "-" && qNum > 1) {
            qNum--;
        } else if (this.value == "+") {
            qNum++;
        } else {
            console.log("error")
        }
        $("#quantity").html(qNum);
    })
})