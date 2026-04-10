import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // Mantém caminhos de links simbólicos sem resolver para o caminho real
    // Essencial para evitar erros de permissão (EPERM) em perfis de usuário em domínio
    preserveSymlinks: true,
  },
  server: {
    port: 3000, // Altera a porta do Vite (5173) para a padrão do ecossistema React (3000)
    open: true, // Abre o navegador automaticamente ao iniciar o servidor
    host: true, // Permite o acesso externo através do endereço IP na rede local
  },
}); 