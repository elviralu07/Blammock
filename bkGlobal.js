const bmColors = {
    color1: ["Ivy Green", "darkolivegreen", "Green", "G"],
    color2: ["Ocean Blue", "navy", "Blue", "B"],
    color3: ["Earth Brown", "sienna", "Red", "R"]
}

// The RegEx are by Conta Azul
const creditCards = {
    amex: ["Amex", /^3[47][0-9]{13}$/, 4],
    discover: ["Discover", /^6(?:011|5[0-9]{2}|4[4-9][0-9]{1}|(22(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[01][0-9]|92[0-5]$)[0-9]{10}$))[0-9]{12}$/, 4],
    mastercard: ["Mastercard", /^(603136|603689|608619|606200|603326|605919|608783|607998|603690|604891|603600|603134|608718|603680|608710|604998)|(5[1-5][0-9]{14}|2221[0-9]{12}|222[2-9][0-9]{12}|22[3-9][0-9]{13}|2[3-6][0-9]{14}|27[01][0-9]{13}|2720[0-9]{12})$/, 3],
    visa: ["Visa", /^4[0-9]{12}(?:[0-9]{3})?$/, 3]
}

let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
let counter = cartItems.length;

let qNum = 1;
let color = "";
let subtotal = 0;
let total = 0;
let shipping = true;
let cardName = "";

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
    const emailInput = $("#email").val();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(emailRegex.test(emailInput)) {
        return true;
    } else {
        return false;
    }
}

const checkPhone = function() {
    if(!shipping) {
        return true;
    }

    const phone = $("#phone").val();
    const phoneRegex = /^[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;

    if (phoneRegex.test(phone)) {
        return true;
    } else {
        return false;
    }
}

const checkCard = function() {
    for(const key in creditCards) {
        const cardNum = $("#cc-num").val();
        const numRegex = (creditCards[key][1]);
        const cardExp = $("#cc-exp").val();
        const expRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
        const cardCVV = $("#cc-cvv").val().toString();

        if(numRegex.test(cardNum) && expRegex.test(cardExp) && (cardCVV.length == creditCards[key][2])) {
            cardName = (creditCards[key][0]).toUpperCase();
            return true;
        }
    }
    return false;
}

const checkZip = function() {
    const zipRegex = /^\d{5}(?:[-\s]\d{4})?$/;
    const zip = $("#zip").val();

    if (zipRegex.test(zip)) {
        return true;
    } else {
        return false;
    }
}

const updateReceipt = function() {
    let receiptCode = "<h2 class='text-center'>BLAMMOCK</h2>";

    for (let i = 0; i < counter; i++) {
        receiptCode += "<div class='receipt-item flex-btwn'>";
        receiptCode += "<span>BMK(" + cartItems[i].color[3] + ") x" + cartItems[i].quantity + " " + getItemCode(cartItems[i]) + "</span>";
        receiptCode += "<span> $" + parseFloat(cartItems[i].quantity * 60).toFixed(2) + "</span>";
        receiptCode += "</div>";
    }

    receiptCode += "<div class='receipt-grid'>";
    receiptCode += "<span class='text-right'>SUBTOTAL</span>";
    receiptCode += "<span class='money-column text-right'>$" + parseFloat(subtotal).toFixed(2) + "</span>";
    receiptCode += "</div>";

    receiptCode += "<div class='receipt-grid'>";
    receiptCode += "<span class='text-right'>TAX 9.5%</span>";
    receiptCode += "<span class='money-column text-right'>$" + parseFloat(subtotal * 0.095).toFixed(2) + "</span>";
    receiptCode += "</div>";

    receiptCode += "<div class='receipt-grid'>";
    if(shipping) {
        receiptCode += "<span class='text-right'>SHIPPING</span>";
        receiptCode += "<span class='money-column text-right'>$15.00</span>";
    } else {
        receiptCode += "<span class='text-right'>PICK UP</span>";
        receiptCode += "<span class='money-column text-right'>$0.00</span>";
    }
    receiptCode += "</div>";

    receiptCode += "<div class='receipt-grid''>";
    receiptCode += "<span class='text-right'>TOTAL</span>";
    receiptCode += "<span class='money-column text-right'>$" + parseFloat(total).toFixed(2) + "</span>";
    receiptCode += "</div>";

    receiptCode += "<div class='receipt-grid''>";
    receiptCode += "<span class='text-right'>" + cardName + " TEND</span>";
    receiptCode += "<span class='money-column text-right'>$" + parseFloat(total).toFixed(2) + "</span>";
    receiptCode += "</div>";

    receiptCode += "<br />";
    let timestamp = new Date();
    receiptCode += "<div class='text-center'><span>" 
                    + ("0" + (timestamp.getMonth() + 1)).slice(-2)  + "/"
                    + ("0" + timestamp.getDate()).slice(-2) + "/"
                    + timestamp.getFullYear() + "&nbsp; &nbsp; "
                    + ("0" + timestamp.getHours()).slice(-2) + ":"
                    + ("0" + timestamp.getMinutes()).slice(-2) + ":"
                    + ("0" + timestamp.getSeconds()).slice(-2)
                    + "</span></div>";
    receiptCode += "<div class='text-center'><span># ITEMS SOLD " + counter + "</span></div>";

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
            console.log("error");
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
    updateReceipt();
    $("#order-confirmation").hide();
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

        if(shipping && !checkZip()) {
            allFilled = false;            
        }

        if(allFilled && checkEmail() && checkPhone() && checkCard()) {
            updateReceipt();
            $("#checkout-container").fadeOut();
            $("#loading").html("<img src='media/Blammock Motion Graphic 1.gif'>");
            $("#loading").fadeIn();
            $("#loading").delay(5000).fadeOut();
            $("#order-confirmation").delay(5000).fadeIn();
            $("#checkout-container").hide();
            $("#receipt").delay(5000).animate({
                top: "+=25px"
            }, 800).delay(100).animate({
                top: "+=10px"
            }, 500).animate({
                top: "+=25px"
            }, 500).animate({
                top: "+=10px"
            }, 500).delay(100).animate({
                top: "+=10px"
            }, 500).animate({
                top: "+=100px"
            }, 500);
        } else {
            alert("Please ensure you filled out all boxes correctly.");
        }
    })
})