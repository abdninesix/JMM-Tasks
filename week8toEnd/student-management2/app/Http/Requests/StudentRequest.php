<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StudentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'min:3', 'max:50'],
            'email' => [
                'required',
                'email',
                Rule::unique('students', 'email')->ignore($this->route('student')),
            ],

            'roll_no' => [
                'required',
                'numeric',
                Rule::unique('students', 'roll_no')->ignore($this->route('student')),
            ],

            'attendance' => ['required', 'numeric', 'between:0,100'],
            'marks' => ['required', 'array'],
            'marks.*' => ['required', 'numeric', 'between:0,100'],
        ];
    }
}
