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
        $(".sidebar").css("style", "0px");
    })
})