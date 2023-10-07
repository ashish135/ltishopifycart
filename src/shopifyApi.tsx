import axios from 'axios';

const shopifyApi = axios.create({
  baseURL: 'https://your-shopify-store.myshopify.com', // Replace with your Shopify store URL
  auth: {
    username: 'your-api-key', // Replace with your API key
    password: 'your-api-password', // Replace with your API password
  },
});

export default shopifyApi;