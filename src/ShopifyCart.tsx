import React, { useState, useEffect } from 'react';
import shopifyApi from './shopifyApi';

type CartItem = {
  id: string;
  title: string;
  quantity: number;
};

const ShopifyCart: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    // Fetch the cart from Shopify when the component mounts
    shopifyApi.get('/cart.js')
      .then((response) => {
        setCart(response.data.items);
      })
      .catch((error) => {
        console.error('Error fetching cart:', error);
      });
  }, []);

  const updateCartItemQuantity = (itemId: string, newQuantity: number) => {
    // Make an AJAX request to update the quantity of an item in the cart
    shopifyApi.post('/cart/change.js', { quantity: newQuantity, id: itemId })
      .then((response) => {
        // Update the local cart state
        setCart(response.data.items);
      })
      .catch((error) => {
        console.error('Error updating cart item quantity:', error);
      });
  };

  const removeCartItem = (itemId: string) => {
    // Make an AJAX request to remove an item from the cart
    shopifyApi.post('/cart/update.js', { updates: { [itemId]: 0 } })
      .then((response) => {
        // Update the local cart state
        setCart(response.data.items);
      })
      .catch((error) => {
        console.error('Error removing cart item:', error);
      });
  };

  return (
    <div>
      <h1>Your Shopify Cart</h1>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            <div>
              <strong>{item.title}</strong>
            </div>
            <div>
              Quantity: {item.quantity}
              <button onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}>+</button>
              <button onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}>-</button>
            </div>
            <div>
              <button onClick={() => removeCartItem(item.id)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShopifyCart;