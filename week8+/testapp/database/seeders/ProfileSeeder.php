<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Faker\Factory as Faker;

class ProfileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        $profiles = [];

        for ($i = 0; $i < 20; $i++) {
            $profiles[] = [
                'firstname' => $faker->firstName,
                'lastname' => $faker->lastName,
                'email' => $faker->unique()->safeEmail,
                'passsword' => Hash::make('password123'),
                'image' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        DB::table('profiles')->insert($profiles);
    }
}
