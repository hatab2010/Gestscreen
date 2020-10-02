function Alert(){
    let scrollOffset = $(document).scrollTop();
    const scrollRefreshDelta = 10000;

    $(document).on("scroll", function(){
        showAlert();
    });

    let alertHide,
        alert = $(".alert");

    function showAlert() {
        let currentOffsetTop = $(document).scrollTop();
        let offsetDelta = scrollOffset - currentOffsetTop;
        if (Math.abs(offsetDelta) > scrollRefreshDelta) {
            scrollOffset = currentOffsetTop;
            return;
        }

        alert.addClass("alert--active");
        if (alertHide) clearTimeout(alertHide);

        alertHide = setTimeout(function () {
            alert.removeClass("alert--active");
        }, 500)
    }
}