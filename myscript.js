$(function(){
    //menu toggling.
    $('#toggle-menu').click(function(){
        $('.categories').toggleClass('active');
    });
    $('.categories button').click(function(){
        $(this).toggleClass('active');
    });

    //search bar
    $('#search').on('submit',function(e){
        e.preventDefault();

        let search_term = $('.search-term').val().trim();
        let search_cat = $('.search-cat').val().trim();

        if(search_term === ''){
            alert('please search something..');
        }else if(search_term.length <= 2){
            alert('use at least 3 characters');
        }else{
            if(search_cat != 0){
                location.href = `search.html?search=${search_term}&cat=${search_cat}`;
            }else{
                location.href = `search.html?search=${search_term}`;
            }
        }
    });

    //email validation function
    function EmailIsValid(mail){
        if(mail.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)){
            return true;
        }else{
            return false;
        }
    }

    //login form validation
    $('#login-form').on('submit',function(e){
        e.preventDefault();

        let Uname = $('#username').val().trim();
        let Pword = $('#password').val().trim();

        if(Uname === ""){
            alert('please enter username');
        }else if(Pword === ""){
            alert('please enter password');
        }else{
            if(EmailIsValid(Uname)){
                //here we use api for validate user
                alert('mail is valid');
            }else{
                //code for invalid email.
                alert('mail is invalid');
            }
            
        }
    });
    //load total price of cart
    function LoadTotalPrice(){
        let total_price = 0;
        let total_unit = 0;
        $('#cart-items tbody tr').each(function(){
            total_price += $(this).data('price') * $(this).find('.quantity').val();
            total_unit += Number($(this).find('.quantity').val());
            // alert(total_unit);
        });
        $('.subtotal').html("subtotal ("+total_unit+" item) :- <b>rs. "+total_price+"</b>");
    }

    //loading total price of cart when page load first time
    LoadTotalPrice();

    //unit price increment - decrement
    $('.quantity').on('change',function(){
        if($(this).val() < 1 || $(this).val() > 5){
            alert('quantity limit is 1 to 5');
        }else{
            LoadTotalPrice();
        }
    });

});

//fetch country name using api
let country = document.getElementById('country');
let fetchCountry = async () => {
    try {
        let res = await fetch("https://restcountries.eu/rest/v2/all");
        let data = await res.json();
        let selected = "";
        data.forEach((val) => {
            if(val.callingCodes == 91){
                selected = "selected";
            }else{
                selected = "";
            }
            country.insertAdjacentHTML('beforeend',
            `<option ${selected} value='${val.callingCodes}'>${val.alpha2Code} +${val.callingCodes}</option>`);
        });
    } catch (err) {
        console.log('the error is' + err);
    }

}