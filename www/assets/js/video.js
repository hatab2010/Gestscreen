function Video(){
    $(document).on("scroll", function(){
        if (isEnable == false)
            return;
        _this.check();
    });

    let _this = this;
    let isEnable = false;

    this.isEnable = function(value){
        if (value === true){
            isEnable = true;
            _this.check();
        } else{
            isEnable = false;
            _this.stop();
        }
    }

    this.check = function(){
        if ($("video").length == 0) return;
        let scrollTop = $(document).scrollTop();
        let videoOffset = $("video").offset().top;
        let videoHeight = $("video").height();
        let viewHeight = window.innerHeight;

        if (scrollTop + viewHeight > videoOffset + videoHeight/2){
            _this.play();
        }
        else {
            _this.stop();
        }
    }

    this.stop = function(){
        let v = $("video");
        v.trigger("pause");
        v.currentTime = 0;
    }

    this.play = function(){
        if ($("video").is(":hidden")) return;
        $("video").trigger("play");
    }
}