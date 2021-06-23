$(function(){
    if(window.innerWidth < 500){
        $("#content nav").removeClass("active");
    }
    $('#toggle-menu').click(function(){
        $("#content nav").toggleClass("active");
        $(".content-box").toggleClass('active');
    });

    $('.hi-admin').on('click',function(){
        $('.user-options').toggle();
    });
});