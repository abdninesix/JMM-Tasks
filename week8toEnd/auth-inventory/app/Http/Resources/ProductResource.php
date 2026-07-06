<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'sku' => $this->sku,
            'price' => $this->price,
            'stock_quantity' => $this->stock_quantity,
            'status' => $this->status,
            'category_name' => $this->category->name,
            'category_id' => $this->category_id,
            'is_low_stock' => $this->stock_quantity < 10,
        ];
    }
}
