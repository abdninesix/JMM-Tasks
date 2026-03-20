import React from 'react';
import Navbar from '../Components/Navbar';

export default function Dashboard({ products }) {
    return (
        <div>
            <Navbar />
            <div style={{ padding: '2rem' }}>
                <h1>Product Inventory</h1>
                <table border="1" width="100%" style={{ borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ background: '#f4f4f4' }}>
                            <th>ID</th>
                            <th>Name</th>
                            <th>SKU</th>
                            <th>Price</th>
                            <th>Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id}>
                                <td style={{ padding: '8px' }}>{product.id}</td>
                                <td style={{ padding: '8px' }}>{product.name}</td>
                                <td style={{ padding: '8px' }}>{product.sku}</td>
                                <td style={{ padding: '8px' }}>${product.price}</td>
                                <td style={{ padding: '8px' }}>{product.stock_quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}