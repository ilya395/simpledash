var inputmask = $('.phonemask');

Inputmask.extendDefinitions({
    'f': {"validator": "[9\(\)\.\+/ ]"}
});
    
if (inputmask.length) {
    inputmask.inputmask({
        mask: "+7(f99)999-99-99"
    }); 
};


// обработчик cобытий ajax
// подтверждение
function imOkey(n) {
    var numbersArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    str = n.split('');
    // console.log(str);
    var countNumber = 0;
    for(var i = 0; i < str.length; i++) {
        // if (numbersArray.indexOf(str[i]) == -1) {
        //     countNumber++;
        // }
        for(var j = 0; j < numbersArray.length; j++) {
            if (str[i] == numbersArray[j]) {
                countNumber++;
            };
        };
    };
    // console.log(countNumber);
    if (countNumber == 11) {
        return true;
    } else {
        return false;
    };
};
// слушаем нажатия на главной
$('.footer-callback-btn').on('click', function() {
    $('.simple-info-form input[name=title_for_form]').val('Главная. Просит перезвонить.');
});
$('.ipoteka-callback-btn').on('click', function() {
    $('.simple-info-form input[name=title_for_form]').val('Главная. Интересуется ипотекой.');
});
// главная. форма скачивания.
$('#homeButtomForm').on('click', function(){
    if ($(this).parents('.pdf-download-form')) {
        var data = {
            action: 'flatapp',
            title_form: $('.pdf-download-form input[name=title_for_form]').val(),
            name: $('.pdf-download-form input[name=Name]').val(),
            phone: $('.pdf-download-form input[name=Phone-3]').val()
        };
    };

    answer = imOkey(data["phone"]); 

    console.log(window.wp);
    
    if ( data["name"] != "" && data["phone"] != "" && answer == true ) {
        $.post(window.wp.ajax_url, data, function(res){//url
		
            if (res.success) {
                console.log(res.success);
                console.log('ok!');
                $('.w-form-failed').css('display', 'none');
                $('.section-pop-up .w-form-done-bad-gay').css('display', 'block');
                $('.pdf-download-form input[name=Name]').val('');
                $('.pdf-download-form input[name=Phone-3]').val('')
            } else {
                console.log(res.err);
                console.log('дно...');
                $('.section-pop-up .w-form-done-bad-gay').css('display', 'none');
                $('.w-form-failed').css('display', 'block');
            }
    
        }, 'json'); //html или json
    } else {
        console.log('Чот ни то...');
        $('.section-pop-up .w-form-done-bad-gay').css('display', 'none');
        $('.w-form-failed').css('display', 'block');
    };

});
// главная. остальные формы.
$('#homeLowerButtomForm').on('click', function(){

    if($(this).parents('.simple-info-form')) {
        var data = {
            action: 'flatapp',
            title_form: $('.simple-info-form input[name=title_for_form]').val(),
            name: $('.simple-info-form input[name=Name]').val(),
            phone: $('.simple-info-form input[name=Phone-2]').val()
        };
    };

    console.log(window.wp);
    answer = imOkey(data["phone"]); 
    if ( data["name"] != "" && data["phone"] != "" && answer == true ) {
        $.post(window.wp.ajax_url, data, function(res){//url
		
            if (res.success) {
                console.log(res.success);
                console.log('ok!');
                $('.w-form-failed').css('display', 'none');
                $('.form-block-3 .w-form-done-bad-gay').css('display', 'block');
                $('.simple-info-form input[name=Name]').val('');
                $('.simple-info-form input[name=Phone-2]').val('');
            } else {
                console.log(res.err);
                console.log('дно...');
                $('.form-block-3 .w-form-done-bad-gay').css('display', 'none');
                $('.w-form-failed').css('display', 'block');
            }
    
        }, 'json'); //html или json
    } else {
        console.log('Чот ни то...');
        $('.form-block-3 .w-form-done-bad-gay').css('display', 'none');
        $('.w-form-failed').css('display', 'block');
    };

});
// 
$('#landingButtomForm').on('click', function(){

    var data = {
        action: 'flatapp',
        title_form: $('input[name=title_for_form]').val(),
        name: $('input[name=name]').val(),
        phone: $('input[name=Phone]').val()
    };

    // console.log(data);

    console.log(window.wp);
    answer = imOkey(data["phone"]); 
    if ( data["name"] != "" && data["phone"] != "" && answer == true ) {
        $.post(window.wp.ajax_url, data, function(res){//url
		
            if (res.success) {
                console.log(res.success);
                console.log('ok!');
                $('.w-form-failed').css('display', 'none');
                $('.w-form-done-bad-gay').css('display', 'block');
                $('input[name=name]').val('');
                $('input[name=Phone]').val('');
            } else {
                console.log(res.err);
                console.log('дно...');
                $('.w-form-done-bad-gay').css('display', 'none');
                $('.w-form-failed').css('display', 'block');
            }
    
        }, 'json'); //html или json
    } else {
        console.log('Чот ни то...');
        $('.w-form-done-bad-gay').css('display', 'none');
        $('.w-form-failed').css('display', 'block');
    };

});