<?php
    function is_valid_json($json_string) {
        json_decode($json_string);
        return json_last_error() == JSON_ERROR_NONE;
    }
?>
