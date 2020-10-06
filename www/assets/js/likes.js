function Likes(){
    let isBlock = false;

    $(window).on("load", function (){
        loadCash();
    });

    $(document).keydown(function(e){
        if(e.keyCode === 76) //L
        {
            switchPopUp();
        }
        else if (e.keyCode === 13 && _this.isPopUpShow == true){
            confirm();
            hidePopUp();
        }
        else{
            hidePopUp();
        }
    });

    let _this = this;
    let currentId = null;
    this.isPopUpShow = false;
    let data = new Array();

    this.setProduct = function(productId){
        isBlock = false;
        currentId = productId;
        updateLikesCount();
    };

    function updateLikesCount(){
        let likesCount;
        if (data[currentId]){
            likesCount = data[currentId];
        } else{
            likesCount = 0;
        }
        $(".likes__count").text(likesCount);
    }

    function switchPopUp(){
        if (_this.isPopUpShow){
            confirm();
            hidePopUp();
        }
        else{
            if (isBlock) return;
            _this.isPopUpShow = true;
            $(".likes__pop-up").addClass("likes__pop-up--show");
        }
    }

    function hidePopUp(){
        $(".likes__pop-up").removeClass("likes__pop-up--show");
        _this.isPopUpShow = false;
    }

    function confirm(){
        if (currentId){
            isBlock = true;
            if (data[currentId]){
                data[currentId] += 1;
            }
            else{
                data[currentId] = 1;
            }
            localStorage.setItem("likesCash", JSON.stringify(data));
            updateLikesCount();
        }
    }

    function loadCash(){
        let result = localStorage.getItem("likesCash");

        if (result){
            data = JSON.parse(result);
        }
    }
}
