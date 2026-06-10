import ProductList from '../components/products/ProductList';
import ProductForm from '../components/products/ProductForm';

const ProductsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Gestión de Productos
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulario - 1 columna */}
        <div className="lg:col-span-1">
          <ProductForm />
        </div>
        
        {/* Lista - 2 columnas */}
        <div className="lg:col-span-2">
          <ProductList />
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
