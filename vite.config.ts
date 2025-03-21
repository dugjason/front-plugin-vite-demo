import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // This ensures the SPA can handle routes correctly
    // historyApiFallback: true,
  },
});
