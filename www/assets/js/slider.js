function Slider(){
    let _this = this;
    const pseudoHeight = 900000;
    const scrollRefreshDelta = 10000;

    let carriage = $(".slider__item-list"),
        scrollOffset = 0,
        itemHeight,
        sliderOffset = 0,
        isActive = false,
        centerTimer;

    //Events
    $(window).on("load", function () {
        enable();
    })

    $(document).on("scroll", update);

    $(document).keydown(function(e){
        if (isActive === false)
            return;

        if(e.keyCode == 13) //Enter
        {
            linkEnter();
        }
    });

    //Public
    this.isEnable = function(value, callback){
        if (value === true){
            $(".slider").on("transitionend",listener);
            enable();
        }
        else{
            $(".slider").on("transitionend",listener);
            disable();
        }

        function listener(){
            if (callback)
                callback();
            $(".slider").off("transitionend", listener);
        }
    }

    this.onLinkEnter = null;
    this.selectItem = null;

    //Private
    function enable(){
        $("body").css("height", pseudoHeight);
        window.scrollTo(0, pseudoHeight / 2)
        scrollOffset = $(document).scrollTop();
        itemHeight = $(".slider__item").outerHeight(true);

        if (!$(".slider").hasClass("slider--hide")){
            isActive = true;
        }

        $(".slider").on("transitionend", listener)
                    .removeClass("slider--hide")

        function listener(){
            isActive = true;
            $(".slider").off("transitionend", listener);
        }
    }

    function disable(){
        isActive = false;
        $("body").removeAttr("style");
        $(".slider").addClass("slider--hide")
    }

    function linkEnter(){
        if (!isActive) return null;
        let href = $(".slider__item--active").data("href");

        if (_this.onLinkEnter)
            _this.onLinkEnter(href);
    }

    function update(){
        if (!isActive) return;

        if (_this.linkEnter)
            _this.linkEnter("href")

        carriage.stop();
        let currentOffsetTop = $(window).scrollTop();
        let offsetDelta = scrollOffset - currentOffsetTop;
        if (Math.abs(offsetDelta) > scrollRefreshDelta) {
            scrollOffset = currentOffsetTop;
            return;
        }
        // if (centerTimer) clearTimeout(centerTimer);
        // centerTimer = setTimeout(setCenter, 500);

        if (currentOffsetTop < scrollRefreshDelta || currentOffsetTop > pseudoHeight - scrollRefreshDelta) {
            window.scrollTo(0, pseudoHeight / 2)
        }

        sliderOffset += offsetDelta;
        scrollOffset = currentOffsetTop;

        if (sliderOffset > 0) {
            upendLastSlide();
            setActiveSlide();
        }

        if (sliderOffset < -itemHeight) {
            upendFirstSlide();
            setActiveSlide();
        }

        carriage.css("top", sliderOffset);
    }

    function upendLastSlide() {
        let lastEl = $(".slider__item").last();
        $(".slider__item-list").prepend(lastEl);
        sliderOffset -= itemHeight;
        carriage.css("top", sliderOffset);
        //let t = $(".slider__item-list")[0].offsetHeight; //Trigger a reflow, flushing the CSS changes
    }

    function setCenter(){
        let viewCenter = $(".slider").height()/2;
        let activeSlideOffset = $(".slider__item--active").offset().top - $(".slider").offset().top;
        let activeSlideHeight = $(".slider__item--active").height();
        let offset = sliderOffset + viewCenter - activeSlideOffset - activeSlideHeight/2;
        //sliderOffset += offset;
        carriage.animate({"top": offset},{
            duration: 500,
            step: function(now,b){
                sliderOffset = now;
            }
        })
        //carriage.css("top", sliderOffset);
    }

    function upendFirstSlide() {
        let firstEl = $(".slider__item").first();
        $(".slider__item-list").append(firstEl);
        sliderOffset += itemHeight;
        carriage.css("top", sliderOffset);
        //let t = $(".slider__item-list")[0].offsetHeight; //Trigger a reflow, flushing the CSS changes
    }

    function setActiveSlide() {
        let items = $(".slider__item");
        items.removeClass("slider__item--active");
        items.eq(1).addClass("slider__item--active");

        if (_this.selectItem)
            _this.selectItem($(".slider__item--active").attr("id"));
    }
}


