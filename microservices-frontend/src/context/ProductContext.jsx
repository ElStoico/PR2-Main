import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import productService from '../services/productService';

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts debe usarse dentro de ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar productos al montar el componente
  useEffect(() => {
    fetchProducts();
  }, []);

  /**
   * Obtener todos los productos
   */
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await productService.getAllProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message);
      // El toast ya se muestra en el interceptor de Axios
    } finally {
      setLoading(false);
    }
  };

  /**
   * Agregar un nuevo producto
   */
  const addProduct = async (productData) => {
    setLoading(true);
    try {
      const newProduct = await productService.createProduct(productData);
      setProducts((prev) => [...prev, newProduct]);
      toast.success('Producto creado exitosamente');
      return newProduct;
    } catch (err) {
      throw err; // Re-lanzar para manejo en el componente
    } finally {
      setLoading(false);
    }
  };

  /**
   * Eliminar un producto
   */
  const removeProduct = async (id) => {
    setLoading(true);
    try {
      await productService.deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast.success('Producto eliminado exitosamente');
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Actualizar un producto
   */
  const updateProduct = async (id, productData) => {
    setLoading(true);
    try {
      const updatedProduct = await productService.updateProduct(id, productData);
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? updatedProduct : p))
      );
      toast.success('Producto actualizado exitosamente');
      return updatedProduct;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    products,
    loading,
    error,
    fetchProducts,
    addProduct,
    removeProduct,
    updateProduct,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
