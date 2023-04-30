// import {
//     isValid,
//     isExpirationDateValid,
//     isSecurityCodeValid,
//     getCreditCardNameByNumber
// } from 'creditcard.js';

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
let subtotal = 0;
let total = 0;
let shipping = true;

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
    let cartCode = "";
    for(let i=0; i<counter; i++) {
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

const updateReceipt = function() {
    let receiptCode = ""
    for(let i=0; i<counter; i++) {
        receiptCode += "<div class='receipt-item'>";
        receiptCode += "<div>"
        receiptCode += "<span><strong>Blammock</strong></span> <br />";
        receiptCode += "<span>Color: " + cartItems[i].color[0] + "</span> <br />";
        receiptCode += "<span>Quantity: " + cartItems[i].quantity + "</span> <br />";
        receiptCode += "</div>";
        receiptCode += "<div><span><em>$" + cartItems[i].quantity * 60 + "</em></span></div>";
        receiptCode += "</div>";
    }
    if(receiptCode == "") {
        receiptCode = "Your cart is empty";
        $("#purchase-bttn").hide();
    } else {
        receiptCode += "<hr>";
        receiptCode += "<div class='flex-btwn'>";
        receiptCode += "<span><strong>Subtotal</strong></span>";
        receiptCode += "<span><em>$" + subtotal + "</em></span>";
        receiptCode += "</div>";
        receiptCode += "<div class='flex-btwn'>";
        receiptCode += "<span><strong>Tax</strong></span>";
        receiptCode += "<span><em>$" + parseFloat(subtotal*1.095).toFixed(2) + "</em></span>";
        receiptCode += "</div>";
        if(shipping) {
            receiptCode += "<div class='flex-btwn'>";
            receiptCode += "<span><strong>Shipping</strong></span>";
            receiptCode += "<span><em>$15</em></span>";
            receiptCode += "</div>";
        }
        receiptCode += "<hr>";
        receiptCode += "<div class='flex-btwn'>";
        receiptCode += "<span><strong>Total</strong></span>";
        receiptCode += "<span><em>$" + total + "</em></span>";
        receiptCode += "</div>";
    }
    $("#receipt").html(receiptCode);
}

const calcTotal = function() {
    subtotal = counter * 60;
    total = subtotal * 1.095;
    if(shipping) {
        total += 15;
    }
    total = parseFloat(total).toFixed(2);
}

const checkEmail = function() {
    return true;
}

const checkPhone = function() {
    return true;
}

const checkCard = function() {
    return true;
}

$(document).ready(function() {
    updateCart();
    calcTotal();
    updateReceipt();

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
            updateReceipt();
        })
    })

    $("#pickup").hide();
    $(".method").on("click", function() {
        if(this.value == "Pick Up") {
            $("#shipping").fadeOut();
            $("#pickup").fadeIn();
            shipping = false;
        } else {
            $("#pickup").fadeOut();
            $("#shipping").fadeIn();
            shipping = true;
        }
        updateReceipt();
    })

    $("#purchase-bttn").on("click", function() {
        let allFilled = true;
        const userInfo = document.querySelectorAll("[required]");

        userInfo.forEach((i) => {
            if(i.value == "") {
                if(shipping) {
                    allFilled = false;
                } else if(i.parentNode.parentNode.id != "shipping" && i.parentNode.parentNode.parentNode.id != "shipping") {
                        allFilled = false;
                    }
                }
            }
        )

        if(allFilled && checkEmail() && checkPhone() && checkCard()) {
            console.log("yay")
        } else {
            alert("Please ensure you filled out all boxes correctly.");
        }
    })
})
