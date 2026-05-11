<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    // Task 1 & 3: Grade Logic
    public function getGradeAttribute()
    {
        if ($this->marks >= 90)
            return 'A+';
        if ($this->marks >= 80)
            return 'A';
        if ($this->marks >= 70)
            return 'B';
        if ($this->marks >= 60)
            return 'C';
        return 'F';
    }

    // Task 1: Pass/Fail Logic
    public function getStatusAttribute()
    {
        return $this->marks >= 40 ? 'Pass' : 'Fail';
    }

    // Task 1 & 3: Scholarship Eligibility
    public function getScholarshipAttribute()
    {
        return ($this->grade == 'A+' && $this->attendance >= 90) ? 'Eligible' : 'Not Eligible';
    }

    // Task 5: String Handling (Username)
    public function getUsernameAttribute()
    {
        return strtolower(explode(' ', $this->name)[0]) . $this->id;
    }
}
