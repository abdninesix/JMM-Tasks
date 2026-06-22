<?php

function formatName(string $fullName)
{
    return ucwords(strtolower(trim($fullName)));
}

function formatUsername(string $username)
{
    $username = trim($username);
    $username = strtolower($username);
    $username = preg_replace('/\s+/', '_', $username);
    $username = preg_replace('/[^a-z0-9_]/', '', $username);
    $username = preg_replace('/_+/', '_', $username);

    return $username;
}