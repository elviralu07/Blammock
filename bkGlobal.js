import {
    isValid,
    isExpirationDateValid,
    isSecurityCodeValid,
    getCreditCardNameByNumber
} from 'creditcard.js';

const bmColors = {
    color1: ["Ivy Green", "darkolivegreen", "Green"],
    color2: ["Ocean Blue", "navy", "Blue"],
    color3: ["Earth Brown", "sienna", "Red"]
}

let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
let counter = cartItems.length;
console.log(cartItems);

let qNum = 1;
let color = "";
let cartCode = "";
let subtotal = "";

const addItem = function(userColor, userQuantity) {
    return new Promise(function(resolve, reject) {
        counter++;
        cartItems.push({
            color: userColor,
            quantity: userQuantity
        });
        qNum = 1;
        $("#quantity").html(qNum);

        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        calcTotal();
        resolve();
    })
}

const removeItem = function(index) {
    return new Promise(function(resolve, reject) {
        counter--;
        cartItems.splice(index, 1);

        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        calcTotal();
        
        resolve();
    })
}

const updateCart = function() {
    cartCode = "";
    for(let i = 0; i < counter; i++) {
        cartCode += "<div class='in-cart-item'>";
        cartCode += "<span><strong>Blammock</strong></span> <br />";
        cartCode += "<span>Color: " + cartItems[i].color[0] + "</span> <br />";
        cartCode += "<span>Quantity: " + cartItems[i].quantity + "</span> <br />";
        cartCode += "<span class='remove-item-bttn' data-index='" + i + "'>X</span>";
        cartCode += "</div>";
    }
    if(cartCode == "") {
        cartCode = "Your cart is empty";
    } else {
        cartCode += "<br /><hr> <a href='bkCheckout.html' id='checkout-bttn'>CHECKOUT</a> <br /><br /><br />"
    }
    $("#cart").html(cartCode);
}

const calcTotal = function() {
    subtotal = counter * 60;
}

$(document).ready(function() {
    updateCart();

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
        $("#sidebar").css("right", "-400px");
    })

    $("#add-to-cart-btn").on("click", function() {
        if (color == "") {
            color = bmColors["color1"];
        }
        addItem(color, qNum).then(function() {
            updateCart();
        })
    })

    $(".option-c").on("click", function() {
        const x = this.id;
        color = bmColors[x];
        $("#main-display").css("background-image", "url('media/bk" + color[2] + ".jpeg')");
    })

    $(".quantity-counter").on("click", function() {
        if(this.value == "-" && qNum > 1) {
            qNum--;
        } else if(this.value == "+") {
            qNum++;
        } else {
            console.log("error")
        }
        $("#quantity").html(qNum)
    })

    $(document).on("click", ".remove-item-bttn", function() {
        const index = $(this).data("index");
        removeItem(index).then(function() {
            updateCart();
        })
    })
})
