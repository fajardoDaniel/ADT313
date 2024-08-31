$table = array(
    "header" => array(
        "Student ID",
        "Lastname",
        "Middlename",
        "Firstname",
        "Course",
        "Section"
    ),
    "body" => array(
        array(
            "lastname" => "lastname",
            "middlename" => "middlename",
            "firstname" => "firstname",
            "course" => "BSIT",
            "section" => "section"
        ),
        array(
            "lastname" => "lastname",
            "middlename" => "middlename",
            "firstname" => "firstname",
            "course" => "BSIT",
            "section" => "section"
        ),
        array(
            "lastname" => "lastname",
            "middlename" => "middlename",
            "firstname" => "firstname",
            "course" => "BSIT",
            "section" => "section"
        ),
        array(
            "lastname" => "lastname",
            "middlename" => "middlename",
            "firstname" => "firstname",
            "course" => "BSIT",
            "section" => "section"
        ),
        array(
            "lastname" => "lastname",
            "middlename" => "middlename",
            "firstname" => "firstname",
            "course" => "BSIT",
            "section" => "section"
        ),
        array(
            "lastname" => "lastname",
            "middlename" => "middlename",
            "firstname" => "firstname",
            "course" => "BSIT",
            "section" => "section"
        ),
        array(
            "lastname" => "lastname",
            "middlename" => "middlename",
            "firstname" => "firstname",
            "course" => "BSIT",
            "section" => "section"
        ),
        array(
            "lastname" => "lastname",
            "middlename" => "middlename",
            "firstname" => "firstname",
            "course" => "BSIT",
            "section" => "section"
        ),
        array(
            "lastname" => "lastname",
            "middlename" => "middlename",
            "firstname" => "firstname",
            "course" => "BSIT",
            "section" => "section"
        ),
        array(
            "lastname" => "lastname",
            "middlename" => "middlename",
            "firstname" => "firstname",
            "course" => "BSIT",
            "section" => "section"
        )
    )

);

?>

<table border="10">
    <thead>
        <?php for($i = 0; $i < 6; $i++) { ?>
            <th><?php echo $table["header"][$i] ?></th>
        <?php } ?>
    </thead>
    <tbody>
        <?php foreach($table["body"] as $key => $value) { ?>
            <tr>
                <td><?php echo $key + 1 ?></td>
                <td><?php echo $value["lastname"] ?></td>
                <td><?php echo $value["middlename"] ?></td>
                <td><?php echo $value["firstname"] ?></td>
                <td><?php echo $value["course"] ?></td>
                <td><?php echo $value["section"] ?></td>
            </tr>
        <?php } ?>
    </tbody>
</table>