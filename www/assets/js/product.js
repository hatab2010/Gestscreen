function Product(){
    const parent = $(".product");
    let isActive = false;
    let _this = this;

    this.load = function(href){
        parent.load("products/"+href+".html", show);
        
    }

    this.exit = null;

    $(document).keydown(function(e){
        if (isActive == false) return;

        if (e.keyCode == 27){
            disable();
        }
    })

    function show(){
        $(".product").on("transitionend", listener)

        $(".product").addClass("product--show");
        $(".content-wrapper")
            .css("position", "relative")
            .css("overflow", "visible")
            .css("max-height", "initial");

        function listener(){
            isActive = true;
            $(".product").off("transitionend", listener);
        }
    }

    function disable(){
        isActive = false;

        $(parent).on("transitionend", listener);

        function listener(){
            $(".content-wrapper").removeAttr("style");
            if (_this.exit)
                _this.exit();
            $(parent).off("transitionend", listener);
        }

        $(".product").removeClass("product--show");

    }
}