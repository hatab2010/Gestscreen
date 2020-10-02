function Header(){


    $(window).on("load", function(){
        show();
    })

    this.isEnable = function(value){
        if (value === true){
            show();
        }

        if (value === false){
            $(".header").removeClass("header--show");
        }
    }

    function show(){
        $(".header").addClass("header--show");
    }
}