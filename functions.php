<?php

// хук события подклюсения скриптов
add_action('wp_enqueue_scripts', 'market_wp_media');

function market_wp_media() {
    wp_enqueue_style('normalize_style', get_template_directory_uri() . '/assets/css/normalize.css', [], null, false);
    wp_enqueue_style('webflow_style', get_template_directory_uri() . '/assets/css/webflow.css', [], null, false);
    wp_enqueue_style('smu-sublime-project_style', get_template_directory_uri() . '/assets/css/smu-sublime-project.webflow.css', [], null, false);

    wp_enqueue_script('webflow_script', get_template_directory_uri() . '/assets/js/webflow.js', [], null, true);
    wp_enqueue_script('jquery_inputmask_bundle', get_template_directory_uri() . '/assets/js/jquery.inputmask.bundle.min.js', [], null, true);
    wp_enqueue_script('phone_ru', get_template_directory_uri() . '/assets/js/phone-ru.min.js', [], null, true);
    wp_enqueue_script('my_common', get_template_directory_uri() . '/assets/js/common.js', [], null, true);
};

// цепляемся к хуку, чтобы получить url до местного обработчика ajax
add_action('wp_head', 'way_js_vars');

function way_js_vars() {

    $vars = array(
        // 'title_form' => $title_form,
        // 'name' => $name,
        // 'phone' => $phone,
        'ajax_url' => admin_url('admin-ajax.php'),
    );
    // var_dump($vars);
    echo "<script>window.wp = " . json_encode($vars) . "</script>";
}

// обработка ajax
add_action('wp_ajax_flatapp', 'simple_ajax_flatapp'); // ajax от админа или авторизованого пользователя
add_action('wp_ajax_nopriv_flatapp', 'simple_ajax_flatapp'); // ajax от неавторизованного пользователя

// сюда нужно вписать токен вашего бота
define('TELEGRAM_TOKEN', '919656472:AAFtg4HI0cmd_fkpdJbSomlBMeJPCGIL9jM');

// сюда нужно вписать ваш внутренний айдишник
define('TELEGRAM_CHATID', '-1001352697643');

// обработка ajax звпроса
function simple_ajax_flatapp() {

    // var_dump($_POST);

    function message_to_telegram($text){
        
        $ch = curl_init();
        curl_setopt_array(
            $ch,
            array(
                CURLOPT_URL => 'https://api.telegram.org/bot' . TELEGRAM_TOKEN . '/sendMessage',
                CURLOPT_POST => TRUE,
                CURLOPT_RETURNTRANSFER => TRUE,
                CURLOPT_TIMEOUT => 10,
                CURLOPT_POSTFIELDS => array(
                    'chat_id' => TELEGRAM_CHATID,
                    'text' => $text,
                ),
                CURLOPT_PROXY => '149.56.15.105:7653',
                CURLOPT_PROXYUSERPWD => 'tgdm:superslivaestbanan',
                CURLOPT_PROXYTYPE => CURLPROXY_SOCKS5,
                CURLOPT_PROXYAUTH => CURLAUTH_BASIC,
            )
        );
        curl_exec($ch);

    };

    //данные из форм
    $title_form = trim($_POST['title_form']);
    $name = trim($_POST['name']);
    $phone = trim($_POST['phone']);
    // данные для сообщения
    $message = array(
        "Заголовок" => $title_form,
        "Имя" => $name,
        "Телефон" => $phone,
    );
    //формируем сообщение
    $text="";
    foreach($message as $key => $value) {
         $text .= "".$key.": ".$value."\n";
    };
    // отправляем ссобщение
    if ($name != "" and $phone != "") {
        message_to_telegram($text);
    }

    $res = array(
        'success' => 'Получилось', 
        'err' => 'Не получилось',
    );
    echo json_encode($res);

    wp_die();
};
?>