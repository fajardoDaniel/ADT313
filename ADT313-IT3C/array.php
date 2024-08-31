<?php
    $car = array("volvo", "bmw");
    echo $car[1]. "<br>";

    $cars = array(
        "volvo",
        "bmw",
        "toyta",

    );
    $motors = [
        "harley",
        "honda",
        "ducati",

    ];
    echo $motors[2]. "<br>";

    $car2 = array(
        "ford" => "mustang",
        "maserati"=>"unknown",
        "bmw" => "e3",

    );
    echo $car2["bmw"]. "<br>";

    $user = array(
        "firstname" => "Daniel",
        "lastname" => "Fajardo",
        "middlename" => "Aquino",

    );
    echo $user["middlename"];
    ?>