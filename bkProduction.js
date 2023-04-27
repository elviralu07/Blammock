$(document).ready(function () {
    $(".thumb").css("opacity", "0.5");

    $(".thumb").on("mouseover", function () {
        $(this).css("opacity", "1.0");
    });
    $(".thumb").on("mouseout", function () {
        $(this).css("opacity", "0.5");
    });

    $(".thumb").on("click", function () {
        $("#viewphoto").hide();
        $("#caption").hide();

        let newSrc = $(this).attr("src");
        $("#viewphoto").attr("src", newSrc);
        $("#viewphoto").fadeIn();

        let newCap = $(this).attr("caption");
        $("#caption").html(newCap);
        $("#caption").fadeIn();

        $(".thumb").css("border-width", "0px");
        $(this).css("border-width", "5px");
    });
});