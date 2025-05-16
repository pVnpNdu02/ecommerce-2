import React, { useState } from 'react';


function ProductList() {
  const [email, setEmail] = useState('');
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await api.get(`/products/merchant/${email}`);
    setProducts(res.data);
  };

  return (
    <div>
      <h2>Merchant Products</h2>
      <input onChange={(e) => setEmail(e.target.value)} placeholder="Merchant Email" />
      <button onClick={fetchProducts}>Fetch</button>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} - {p.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
