import React from 'react';
import Navbar from '../Components/Navbar';

export default function Dashboard({ products }) {
    return (
        <div>
            <Navbar />
            <div className='p-8'>
                <h1 className='text-2xl text-center p-8'>Product Inventory</h1>
                <table className='border text-left w-full'>
                    <thead>
                        <tr>
                            <th className='p-4'>ID</th>
                            <th className='p-4'>Name</th>
                            <th className='p-4'>SKU</th>
                            <th className='p-4'>Category</th>
                            <th className='p-4'>Price</th>
                            <th className='p-4'>Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id} className={product.stock_quantity < 15 ? 'bg-red-50' : ''}>
                                <td className='p-4'>{product.id}</td>
                                <td className='p-4'>{product.name}</td>
                                <td className='p-4'>{product.sku}</td>
                                <td className='p-4'>{product.category.name}</td>
                                <td className='p-4'>Rs.{product.price}</td>
                                <td className='p-4'>{product.stock_quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}