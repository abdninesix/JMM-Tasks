<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'email', 'roll_no', 'attendance'];

    public function marks()
    {
        return $this->hasMany(Mark::class);
    }

    public function subjects()
    {
        return $this->belongsToMany(Subject::class, 'marks')->withPivot('score');
    }

    public function averageMark()
    {
        return $this->marks->avg('score') ?? 0;
    }

    public function getGradeAttribute()
    {
        return calculateGrade($this->averageMark());
    }
}
