function Product(){
    const parent = $(".product");
    let isActive = false;
    let _this = this;

    this.load = function(href, callback){
        let cal = callback;
        parent.load("products/"+href+".html",
            function(){
                show(function(){
                    if (callback) callback();
                })
            });
    }

    this.onExit = null;

    $(document).keydown(function(e){
        if (isActive == false) return;

        if (e.keyCode == 13){
            disable();
        }
    })

    function show(callback){
        $(".product").on("transitionend", listener)

        $(".product").addClass("product--show");
        $(".content-wrapper")
            .css("position", "relative")
            .css("overflow", "visible")
            .css("max-height", "initial");

        function listener(){
            isActive = true;
            if(callback) callback();
            $(".product").off("transitionend", listener);
        }
    }

    function disable(){
        if ($(".likes__pop-up").hasClass("likes__pop-up--show"))
            return;

        isActive = false;

        $(parent).on("transitionend", listener);

        function listener(){
            $(".content-wrapper").removeAttr("style");
            if (_this.onExit)
                _this.onExit();
            $(parent).off("transitionend", listener);
        }

        $(".product").removeClass("product--show");

    }
}