const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.products = this.loadProducts();
  }

  async getLimitedProducts(limit) {
    const allProducts = await this.loadProducts();
     
    if (limit) {
       return allProducts.slice(0, limit).map(product => ({ ...product }));
    } else {
       return allProducts.map(product => ({ ...product }));
    }
   }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.path, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  saveProducts() {
    const data = JSON.stringify(this.products, null, 2);
    fs.writeFileSync(this.path, data, 'utf8');
  }

  addProduct(productData) {
    const { title, description, price, thumbnail, stock } = productData;

    if (!title || !description || !price || !thumbnail || stock === undefined) {
      console.log('Todos los campos son obligatorios.');
      return;
    }

    const newProduct = {
      id: this.products.length + 1,
      title,
      description,
      price,
      thumbnail,
      stock,
    };

    this.products.push(newProduct);
    this.saveProducts();
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find(product => product.id === id);
    if (product) {
      return product;
    } else {
      throw new Error('Not found');
    }
  }

  updateProduct(id, updatedFields) {
    const productIndex = this.products.findIndex(product => product.id === id);

    if (productIndex !== -1) {
      this.products[productIndex] = { ...this.products[productIndex], ...updatedFields, id };
      this.saveProducts();
    } else {
      throw new Error('Not found');
    }
  }

  deleteProduct(id) {
    const initialLength = this.products.length;
    this.products = this.products.filter(product => product.id !== id);
    if (initialLength === this.products.length) {
      throw new Error('Not found');
    }
    this.saveProducts();
  }
}

const productManager = new ProductManager('productos.json');

console.log(productManager.getLimitedProducts());

productManager.addProduct({
  title: 'producto prueba',
  description: 'Este es un producto prueba',
  price: 200,
  thumbnail: 'Sin imagen',
  stock: 25,
});

console.log(productManager.getLimitedProducts());

try {
  const productoEncontrado = productManager.getProductById(1);
  console.log(productoEncontrado);
} catch (error) {
  console.log(error.message);
}

try {
  productManager.updateProduct(1, { price: 250 });
  const productoActualizado = productManager.getProductById(1);
  console.log(productoActualizado);
} catch (error) {
  console.log(error.message);
}

try {
  productManager.deleteProduct(1);
  const productosDespuesDeEliminar = productManager.getLimitedProducts();
  console.log(productosDespuesDeEliminar);
} catch (error) {
  console.log(error.message);
}

module.exports = ProductManager;
