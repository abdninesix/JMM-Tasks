<?php

function formatName(string $fullName)
{
    return ucwords(strtolower(trim($fullName)));
}