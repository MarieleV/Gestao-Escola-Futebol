// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    host: '0.0.0.0', // Permite acessar pela rede local se precisar
    port: 5173,      // Porta padrão do Vite (se quiser, pode mudar)
    strictPort: false
  }
});