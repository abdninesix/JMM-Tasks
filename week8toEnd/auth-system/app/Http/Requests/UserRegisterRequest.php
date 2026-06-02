<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRegisterRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'username' => 'required|string|unique:users,username',
            'full_name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8',
            'confirm_password' => 'required|same:password',
            'gender' => 'required|string',
            'dob' => 'required|date',
        ];

        // return [
        //     'username' => [
        //         'required',
        //         'string',
        //         Rule::unique('users', 'username'),
        //     ],

        //     'full_name' => [
        //         'required',
        //         'string',
        //     ],

        //     'email' => [
        //         'required',
        //         'email',
        //         Rule::unique('users', 'email'),
        //     ],

        //     'password' => [
        //         'required',
        //         'min:8',
        //     ],

        //     'confirm_password' => [
        //         'required',
        //         'same:password',
        //     ],

        //     'gender' => [
        //         'required',
        //         'string',
        //     ],

        //     'dob' => [
        //         'required',
        //         'date',
        //     ],
        // ];
    }
}
