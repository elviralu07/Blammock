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
var cartCode = "";

const addItem = function(userColor, userQuantity) {
    return new Promise(function(resolve, reject) {
        counter++;
        cartItems.set(counter, {
            color: userColor,
            quantity: userQuantity
        })
        qNum = 1;
        $("#quantity").html(qNum);
        resolve();
    })
}

const updateCart = function() {
    cartCode = ""
    for(let i=1; i<=counter; i++) {
        cartCode += "<div class='inCartItem'>"
        cartCode += "<span>Blammock</span> <br />";
        cartCode += "<span>Color: " + cartItems.get(i).color[0] + "</span> <br />";
        cartCode += "<span>Quantity: " + cartItems.get(i).quantity + "</span> <br />";
        cartCode += "</div>"
    }
    $("#cart").html(cartCode);
}

const emptyCart = function() {
    $("#cart").html("You have no items");
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
        $("#sidebar").css("right", "0px");
    })

    $("#cart-close").on("click", function() {
        $("#sidebar").css("right", "-500px");
    })

    $("#add-to-cart-btn").on("click", function() {
        if(color == "") {
            color = bmColors["color1"];
        }
        addItem(color, qNum).then(function() {
            updateCart();
        })
        console.log(cartItems);
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