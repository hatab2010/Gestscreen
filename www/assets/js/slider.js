    let carriage = $(".slider__item-list"),
        offsetTop = 0,
        itemHeight,
        sliderOffset = 0,
        isActive = false;

    $(window).on("load", function(){
        $("body").css("height", 900000);
        window.scrollTo(0, 999999/2)
        offsetTop = $(document).scrollTop();
        itemHeight = $(".slider__item").outerHeight(true);
        isActive = true;
    })

    $(document).on("scroll", function(e){

    })

    $(document).on("scroll", function(e){
        if (!isActive) return;

        let currentOffsetTop  = $(window).scrollTop();
        let offsetDelta = offsetTop - currentOffsetTop;
        if (Math.abs(offsetDelta) > 10000) {
            offsetTop = currentOffsetTop;
            return;
        }

        if (currentOffsetTop < 1000 || currentOffsetTop > 800000){
            window.scrollTo(0, 999999/2)
        }

        sliderOffset += offsetDelta;
        offsetTop = currentOffsetTop;

        if (sliderOffset > 0){
            upendLastSlide();
            setActiveSlide();
        }

        if (sliderOffset < -itemHeight)
        {
            upendFirstSlide();
            setActiveSlide();
        }

        carriage.css("top", sliderOffset);
        activeAlert();
    });

    function upendLastSlide(){
        let lastEl = $(".slider__item").last();
        $(".slider__item-list").prepend(lastEl);
        $(".slider__item-list").addClass("transition--disable");
        sliderOffset -= itemHeight;
        carriage.css("top", sliderOffset);
        let t = $(".slider__item-list")[0].offsetHeight; //Trigger a reflow, flushing the CSS changes
        $(".slider__item-list").removeClass("transition--disable");
    }

    function upendFirstSlide(){
        let firstEl = $(".slider__item").first();
        $(".slider__item-list").append(firstEl);
        $(".slider__item-list").addClass("transition--disable");
        sliderOffset += itemHeight;
        carriage.css("top", sliderOffset);
        let t = $(".slider__item-list")[0].offsetHeight; //Trigger a reflow, flushing the CSS changes
        $(".slider__item-list").removeClass("transition--disable");
    }

    function setActiveSlide(){
        let items = $(".slider__item");
        items.removeClass("slider__item--active");
        items.eq(1).addClass("slider__item--active");
    }

    let alertDisable;
    let alert = $(".alert");
    function activeAlert(){
        alert.addClass("alert--active");
        if (alertDisable) clearTimeout(alertDisable);

        alertDisable = setTimeout(function(){
            alert.removeClass("alert--active");
        }, 1000)
    }

    function test(){
    }

    function setCurrentSlide(id){
        let index = $(".slider__item").index($("#"+id));
    }

    function refreshScrollProperty(){
        $(document).scrollTop(2000);
    }

    function setCenter(){

    }
