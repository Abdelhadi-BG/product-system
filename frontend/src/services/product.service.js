import { 
  getAllProducts as apiGetAllProducts,
  getProductById as apiGetProduct,
  createProduct as apiCreateProduct,
  updateProduct as apiUpdateProduct,
  deleteProduct as apiDeleteProduct
} from './api';

class ProductService {
  getAll() {
    return apiGetAllProducts();
  }

  getProduct(id) {
    return apiGetProduct(id);
  }

  createProduct(product) {
    return apiCreateProduct(product);
  }

  updateProduct(id, product) {
    return apiUpdateProduct(id, product);
  }

  deleteProduct(id) {
    return apiDeleteProduct(id);
  }

  // Search products by name
  searchByName(name) {
    return apiGetAllProducts().then(response => {
      const products = response.data || [];
      const filtered = products.filter(product => 
        product.name.toLowerCase().includes(name.toLowerCase())
      );
      return { data: filtered };
    });
  }

  // Filter products by category
  filterByCategory(category) {
    return apiGetAllProducts().then(response => {
      const products = response.data || [];
      const filtered = products.filter(product => 
        product.category && product.category.toLowerCase() === category.toLowerCase()
      );
      return { data: filtered };
    });
  }
}

export default new ProductService();
