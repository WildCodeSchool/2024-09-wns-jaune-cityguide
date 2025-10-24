import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	server: {
		port: Number(process.env.SERVICE_PORT),
		allowedHosts: true,
		host: true,
		hmr: {
			clientPort: Number(process.env.GATEWAY_PORT),
		},
	},
});
