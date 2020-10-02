let currentPage = {0:{Name: "main"}, 1:{Name:"product"}};

let slider = new Slider();
let product = new Product();
let header = new Header();
let alert = new Alert();

slider.onLinkEnter = function(href){
    slider.isEnable(false, function(){
        product.load(href);
    });
    header.isEnable(false);
}

product.exit = function() {
    slider.isEnable(true, function(){

    });
    header.isEnable(true);
}
