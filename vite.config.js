import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        tienda: resolve(__dirname, 'tienda.html'),
        producto: resolve(__dirname, 'producto.html'),
        producto_pulso: resolve(__dirname, 'producto_pulso.html'),
        producto_alba: resolve(__dirname, 'producto_alba.html'),
        producto_jabon: resolve(__dirname, 'producto_jabon.html'),
        corporativo: resolve(__dirname, 'corporativo.html'),
        nosotros: resolve(__dirname, 'nosotros.html'),
        contacto: resolve(__dirname, 'contacto.html'),
        carrito: resolve(__dirname, 'carrito.html'),
        checkout: resolve(__dirname, 'checkout.html'),
        producto_vela: resolve(__dirname, 'producto_vela.html'),
        producto_jabon_avena: resolve(__dirname, 'producto_jabon_avena.html'),
      }
    }
  }
})
