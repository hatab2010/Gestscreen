let currentPage = {0:{Name: "main"}, 1:{Name:"product"}};

let slider = new Slider();
let product = new Product();
let header = new Header();
let alert = new Alert();
let likes = new Likes();
let video = new Video();

slider.onLinkEnter = function(href){
    if (likes.isPopUpShow == true)
        return;

    slider.isEnable(false, function(){
        product.load(href, function(){
            video.isEnable(true);
        });
    });
    header.isEnable(false);
};

product.onExit = function() {
    if (likes.isPopUpShow == true)
        return;

    video.isEnable(false);
    slider.isEnable(true, function(){

    });
    header.isEnable(true);
};

slider.selectItem = function(id){
    likes.setProduct(id);
};
