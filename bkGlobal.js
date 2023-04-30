// import {
//     isValid,
//     isExpirationDateValid,
//     isSecurityCodeValid,
//     getCreditCardNameByNumber
// } from 'creditcard.js';

const bmColors = {
    color1: ["Ivy Green", "darkolivegreen", "Green", "G"],
    color2: ["Ocean Blue", "navy", "Blue", "B"],
    color3: ["Earth Brown", "sienna", "Red", "R"]
}

let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
let counter = cartItems.length;

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

const updateSummary = function() {
    let summaryCode = "";

    for(let i=0; i<counter; i++) {
        summaryCode += "<div class='summary-item'>";
        summaryCode += "<div>"
        summaryCode += "<span><strong>Blammock</strong></span> <br />";
        summaryCode += "<span>Color: " + cartItems[i].color[0] + "</span> <br />";
        summaryCode += "<span>Quantity: " + cartItems[i].quantity + "</span> <br />";
        summaryCode += "</div>";
        summaryCode += "<div><span><em>$" + cartItems[i].quantity * 60 + "</em></span></div>";
        summaryCode += "</div>";
    }

    if(summaryCode == "") {
        summaryCode = "Your cart is empty";
        $("#purchase-bttn").hide();
    } else {
        summaryCode += "<hr>";
        summaryCode += "<div class='flex-btwn'>";
        summaryCode += "<span><strong>Subtotal</strong></span>";
        summaryCode += "<span><em>$" + subtotal + "</em></span>";
        summaryCode += "</div>";
        summaryCode += "<div class='flex-btwn'>";
        summaryCode += "<span><strong>Tax</strong></span>";
        summaryCode += "<span><em>$" + parseFloat(subtotal*1.095).toFixed(2) + "</em></span>";
        summaryCode += "</div>";
        if(shipping) {
            summaryCode += "<div class='flex-btwn'>";
            summaryCode += "<span><strong>Shipping</strong></span>";
            summaryCode += "<span><em>$15</em></span>";
            summaryCode += "</div>";
        }
        summaryCode += "<hr>";
        summaryCode += "<div class='flex-btwn'>";
        summaryCode += "<span><strong>Total</strong></span>";
        summaryCode += "<span><em>$" + total + "</em></span>";
        summaryCode += "</div>";
    }

    $("#summary").html(summaryCode);
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

const updateReceipt = function() {
    let receiptCode = "<h2>BLAMMOCK</h2>";

    for (let i = 0; i < counter; i++) {
        receiptCode += "<div class='receipt-item flex-btwn'>";
        receiptCode += "<span>BMK(" + cartItems[i].color[3] + ") x" + cartItems[i].quantity + " " + getItemCode(cartItems[i]) + "</span>";
        receiptCode += "<span> $" + parseFloat(cartItems[i].quantity * 60).toFixed(2) + "</span>";
        receiptCode += "</div>";
    }

    receiptCode += "<div class='text-right'>";
    receiptCode += "<span>SUBTOTAL &nbsp; &nbsp;</span>";
    receiptCode += "<span>$" + parseFloat(subtotal).toFixed(2) + "</span>";
    receiptCode += "</div>";

    receiptCode += "<div class='text-right'>";
    receiptCode += "<span>TAX 9.5% &nbsp; &nbsp; </span>";
    receiptCode += "<span>$" + parseFloat(subtotal * 0.095).toFixed(2) + "</span>";
    receiptCode += "</div>";

    receiptCode += "<div class='text-right'>";
    if(shipping) {
        receiptCode += "<span>SHIPPING &nbsp; &nbsp; </span>";
        receiptCode += "<span>$15.00</span>";
    } else {
        receiptCode += "<span>PICK UP &nbsp; &nbsp; &nbsp;</span>";
        receiptCode += "<span>$0.00</span>";
    }
    receiptCode += "</div>";

    receiptCode += "<div class='text-right'>";
    receiptCode += "<span>TOTAL &nbsp; &nbsp;</span>";
    receiptCode += "<span>$" + parseFloat(total).toFixed(2) + "</span>";
    receiptCode += "</div>";

    $("#receipt").html(receiptCode);
}

const getItemCode = function(item) {
    let code = "00";

    switch(item.color[3]) {
        case 'G':
            code += "556";
            break;
        case 'B':
            code += "080";
            break;
        case 'R':
            code += "105";
            break;
    }

    code += String((Math.random() * 12) * item.quantity).slice(-2);
    
    return code;
}

$(document).ready(function() {
    updateCart();
    calcTotal();
    updateSummary();

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
            updateSummary();
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
        updateSummary();
    })

    $("#loading").hide();
    $("#checkout-container").hide();
    updateReceipt();
    // $("#order-confirmation").hide();
    // $("#purchase-bttn").on("click", function() {
    //     let allFilled = true;
    //     const userInfo = document.querySelectorAll("[required]");

    //     userInfo.forEach((i) => {
    //         if(i.value == "") {
    //             if(shipping) {
    //                 allFilled = true;
    //             } else if(i.parentNode.parentNode.id != "shipping" && i.parentNode.parentNode.parentNode.id != "shipping") {
    //                     allFilled = true;
    //                 }
    //             }
    //         }
    //     )

    //     if(allFilled && checkEmail() && checkPhone() && checkCard()) {
    //         updateReceipt();
    //         $("#checkout-container").fadeOut();
    //         $("#loading").html("<img src='media/Blammock Motion Graphic 1.gif'>");
    //         $("#loading").fadeIn();
    //         $("#loading").delay(5000).fadeOut();
    //         $("#order-confirmation").delay(5000).fadeIn();
    //     } else {
    //         alert("Please ensure you filled out all boxes correctly.");
    //     }
    // })
})