function init(){
    // inetializers
    var navBarHeight=$('.ez-nav-bar').css("height");
    var footerHeight=$('.ez-footer').css("height");
    $('.nav-dd').css("top",navBarHeight);
    var logo=$('.ez-nav-bar .nav-logo');
    var links=$('.ez-nav-bar .nav-link');
    var navButtonIcon=$('.nav-button-icon');
    $('.ez-nav-bar').empty();
    $('.ez-nav-bar').append('<div class="logo-part"></div>');
    $('.ez-nav-bar').append('<div class="links-part"></div>');
    $('.logo-part').append(logo);
    $('.links-part').append('<button class="nav-button" clicked="false"></button>');
    $('.nav-button').append(navButtonIcon);
    $('.links-part').append(links);

    var contentHolderChildren = $(".content-holder").children();
    $(".content-holder").empty();
    $(".content-holder").append('<div class="ez-col content-size-calculator"></div>');
    $(".content-size-calculator").append(contentHolderChildren);
    var navType=$('.ez-nav-bar').css("position");
    if(navType=='fixed')
        $('.content-holder').css("margin-top",navBarHeight);
    if($('.ez-footer').length>0 && $('.ez-nav-bar').length>0)
        $('.content-holder').css("min-height",'calc(100vh - '+navBarHeight+' - '+footerHeight+')');
    else if($('.ez-footer').length>0 && $('.ez-nav-bar').length<1)
        $('.content-holder').css("min-height",'calc(100vh  - '+footerHeight+')');
    else if($('.ez-footer').length<1 && $('.ez-nav-bar').length>0)
        $('.content-holder').css("min-height",'calc(100vh  - '+navBarHeight+')');
    else
        $('.content-holder').css("min-height",'100vh');
    $('.content-holder').css("height",$(".content-size-calculator").height());
    contentHolderChildren = $(".content-size-calculator").children();
    $(".content-holder").empty();
    $(".content-holder").append(contentHolderChildren);

    // flex bases
    var basesElements=$('*').filter(function () {
        return this.className.match(/\bbase-/);
    });
    var ordersElements=$('*').filter(function () {
        return this.className.match(/\border-/);
    });
    var basesClasses=[];
    var ordersClasses=[];
    for(var c=0; c<basesElements.length; c++){
        var classesList=basesElements[c].className.split(' ');
        for(var cc=0; cc<classesList.length; cc++){
            if(classesList[cc]===""){
                classesList.splice(cc, 1);
                cc=0;
            }
        }
        basesClasses.push(classesList);
    }

    for(var c=0; c<ordersElements.length; c++){
        var classesList=ordersElements[c].className.split(' ');
        for(var cc=0; cc<classesList.length; cc++){
            if(classesList[cc]===""){
                classesList.splice(cc, 1);
                cc=0;
            }
        }
        ordersClasses.push(classesList);
    }


    // listeners

    // navbar button listener
    function navbarButtonListenerAction(){
        if (!(navButton_MQ.matches)) {
            $('.nav-button').attr('clicked','false');
            $('.nav-button').css('display','none');
            var links=$('.nav-dd .nav-link');
            $('.nav-dd').remove();
            $('.links-part').append(links);
        }else{
            $('.nav-button').css('display','inline-block');
            var links=$('.links-part .nav-link');
            links.remove()
            $('.ez-nav-bar').append('<div class="nav-dd"></div>');
            $('.nav-dd').css('display','none');
            $('.nav-dd').append(links);
            var navBarHeight=$('.ez-nav-bar').css("height");
            $('.nav-dd').css("top",navBarHeight);
        }
    }

    var navButtonThreshold=$('.ez-nav-bar').attr('threshold');
    if(!(navButtonThreshold)){
        navButtonThreshold='1250';
    }
    var navButton_MQ = window.matchMedia("(max-width: "+navButtonThreshold+"px)");
    navbarButtonListenerAction(navButton_MQ);
    navButton_MQ.addEventListener("change", () => {
        navbarButtonListenerAction(navButton_MQ);
    });


    // flex bases listeners

    function setBases(screens2Check){
        for(var c1=0;c1<basesElements.length;c1++){
            for(var c2=0;c2<screens2Check.length;c2++){
                for(var c3=0;c3<basesClasses[c1].length;c3++){
                    if (basesClasses[c1][c3].substring(0,5)=='base-'){
                        classInfo=basesClasses[c1][c3].split('-');
                        if(classInfo[2]==screens2Check[c2]){
                            basesElements.eq(c1).css('flex-basis',classInfo[1]+'%');
                        }
                    }
                }
            }
        }
        $('.content-holder').css("height",$(".content-size-calculator").height());
    }

    function setOrders(screens2Check){
        for(var c1=0;c1<ordersElements.length;c1++){
            for(var c2=0;c2<screens2Check.length;c2++){
                for(var c3=0;c3<ordersClasses[c1].length;c3++){
                    if (ordersClasses[c1][c3].substring(0,6)=='order-'){
                        classInfo=ordersClasses[c1][c3].split('-');
                        if(classInfo[2]==screens2Check[c2]){
                            ordersElements.eq(c1).css('order',classInfo[1]);
                        }
                    }
                }
            }
        }
        $('.content-holder').css("height",$(".content-size-calculator").height());
    }

    var smScreens = window.matchMedia("(max-width:768px)");
    if (smScreens.matches) {
        setBases(['sm']);
        setOrders(['sm']);
    }
    smScreens.addEventListener("change", () => {
        if (smScreens.matches) {
            setBases(['sm']);
            setOrders(['sm']);
        }
    });


    var mdScreens = window.matchMedia("(max-width:992px) and (min-width:769px)");
    if (mdScreens.matches) {
        setBases(['sm','md']);
        setOrders(['sm','md']);
    }
    mdScreens.addEventListener("change", () => {
        if (mdScreens.matches) {
            setBases(['sm','md']);
            setOrders(['sm','md']);
        }
    });


    var lgScreens = window.matchMedia("(max-width:1200px) and (min-width:993px)");
    if (lgScreens.matches) {
        setBases(['sm','md','lg']);
        setOrders(['sm','md','lg']);
    }
    lgScreens.addEventListener("change", () => {
        if (lgScreens.matches) {
            setBases(['sm','md','lg']);
            setOrders(['sm','md','lg']);
        }
    });


    var xlScreens = window.matchMedia("(min-width:1201px)");
    if (xlScreens.matches) {
        setBases(['sm','md','lg','xl']);
        setOrders(['sm','md','lg','xl']);
    }
    xlScreens.addEventListener("change", () => {
        if (xlScreens.matches) {
            setBases(['sm','md','lg','xl']);
            setOrders(['sm','md','lg','xl']);
        }
    });
}


// events listeners
$('.ez-nav-bar').on('click tap touch','.nav-button',function() {
    var ispressed=false;
    var x=$('.nav-button').attr('clicked');
    if(x=='false'){
        ispressed=false;
        $('.nav-button').attr('clicked','true');
    }else{
        ispressed=true;
        $('.nav-button').attr('clicked','false');
    }
    if(ispressed){
        $('.nav-dd').css('display','none');
    }else{
        $('.nav-dd').css('display','flex');
        var navBarHeight=$('.ez-nav-bar').css("height");
        $('.nav-dd').css("top",navBarHeight);
        var navBarPadding=[$('.ez-nav-bar').css("padding-left"),$('.ez-nav-bar').css("padding-right")];
        $('.nav-dd').css("padding-left",navBarPadding[0]);
        $('.nav-dd').css("padding-right",navBarPadding[1]);
    }
})

init();