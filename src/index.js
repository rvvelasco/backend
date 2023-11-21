class ProductManager {
    constructor() {
      this.products = [];
      this.productIdCounter = 1;
    }
  
    addProduct(productData) {
      const { title, description, price, thumbnail, code, stock } = productData;
  
      if (!title || !description || !price || !thumbnail || !code || stock === undefined) {
        console.log('Todos los campos son obligatorios.');
        return;
      }
  
      if (this.products.some(product => product.code === code)) {
        console.log('El código del producto ya existe.');
        return;
      }
  
      const newProduct = {
        id: this.productIdCounter++,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
  
      this.products.push(newProduct);
    }
  
    getProducts() {
      return this.products;
    }
  
    getProductById(id) {
      const product = this.products.find(product => product.id === id);
      if (product) {
        return product;
      } else {
        console.log('Not found');
        return null;
      }
    }
  }
  

  const productManager = new ProductManager();
  

  const productosIniciales = productManager.getProducts();
  console.log('Productos iniciales:', productosIniciales);
  

  productManager.addProduct({
    title: 'producto prueba',
    description: 'Es un producto prueba',
    price: 200,
    thumbnail: 'imagen',
    code: 'P12345',
    stock: 25,
  });
  
 
  const productosDespuésDeAgregar = productManager.getProducts();
  console.log('Productos después de agregar:', productosDespuésDeAgregar);
  

  productManager.addProduct({
    title: 'producto prueba duplicado',
    description: 'Es un producto duplicado',
    price: 250,
    thumbnail: 'imagen2',
    code: 'P12345', 
    stock: 30,
  });
  

  const productoNoEncontrado = productManager.getProductById(3); 
  console.log(productoNoEncontrado);
  
  
  const productoEncontrado = productManager.getProductById(1);
  console.log(productoEncontrado);
  