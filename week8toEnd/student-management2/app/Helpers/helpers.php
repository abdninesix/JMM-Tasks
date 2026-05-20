<?php

function calculateGrade(float $percentage)
{
    if ($percentage >= 90)
        return 'A+';
    if ($percentage >= 80)
        return 'A';
    if ($percentage >= 70)
        return 'B';
    if ($percentage >= 60)
        return 'C';
    if ($percentage >= 40)
        return 'D';
    return 'F';
}