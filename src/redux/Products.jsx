import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, deleteProduct, updateProduct } from './productActions';

const Products = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  
  // Local state for Form
  const [form, setForm] = useState({ id: null, title: '', price: '' });
  const [isEditing, setIsEditing] = useState(false);

  // Page load hote hi Data aayega
  useEffect(() => {
    // Comment this out agar backend chalu nahi hai toh error dega
    // dispatch(fetchProducts());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      // Update
      dispatch(updateProduct({ id: form.id, productData: { title: form.title, price: form.price } }));
    } else {
      // Create
      dispatch(createProduct({ title: form.title, price: form.price }));
    }
    // Reset Form
    setForm({ id: null, title: '', price: '' });
    setIsEditing(false);
  };

  const handleEdit = (prod) => {
    setForm(prod);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <div className="p-6 text-text-main font-sans">
      <h1 className="text-2xl font-bold mb-6">Manage Products (CRUD Dummy)</h1>
      
      {error && <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4">{error}</div>}

      {/* --- FORM SECTION --- */}
      <div className="bg-bg-surface p-6 rounded-2xl shadow-sm border border-border-ui mb-8 max-w-lg">
        <h2 className="text-lg font-bold mb-4">{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" 
            placeholder="Product Title" 
            value={form.title} 
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full bg-bg-page border border-border-ui rounded-xl px-4 py-3 outline-none focus:border-action-blue"
            required 
          />
          <input 
            type="number" 
            placeholder="Price" 
            value={form.price} 
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="w-full bg-bg-page border border-border-ui rounded-xl px-4 py-3 outline-none focus:border-action-blue"
            required 
          />
          <button type="submit" className="bg-action-blue text-white px-6 py-3 rounded-xl font-medium hover:opacity-90">
            {isEditing ? 'Update Product' : 'Save Product'}
          </button>
        </form>
      </div>

      {/* --- LIST SECTION --- */}
      <div className="bg-bg-surface p-6 rounded-2xl shadow-sm border border-border-ui">
        <h2 className="text-lg font-bold mb-4">Products List {loading && <span className="text-sm font-normal text-text-sec">(Loading...)</span>}</h2>
        <div className="space-y-3">
          {products.length === 0 && !loading ? <p className="text-text-sec">No products found.</p> : null}
          {products.map((prod) => (
            <div key={prod.id} className="flex items-center justify-between p-4 bg-bg-page border border-border-ui rounded-xl">
              <div>
                <p className="font-bold">{prod.title}</p>
                <p className="text-sm text-text-sec">${prod.price}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(prod)} className="px-4 py-2 bg-yellow-500/10 text-yellow-600 rounded-lg text-sm font-medium hover:bg-yellow-500/20">Edit</button>
                <button onClick={() => handleDelete(prod.id)} className="px-4 py-2 bg-red-500/10 text-red-600 rounded-lg text-sm font-medium hover:bg-red-500/20">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;