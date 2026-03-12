<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(), // Generates a random sentence
            'description' => fake()->paragraphs(3, true), // Generates 3 paragraphs of text
            'author' => fake()->name(), // Generates a random person's name
        ];
    }
}
