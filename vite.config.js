import { sveltekit } from '@sveltejs/kit/vite';
import basicSsl from '@vitejs/plugin-basic-ssl';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit(), basicSsl()],
	server: {
		port: 3000,
		https: true,
		// we need to use 3000 for AzureB2C redirects to work
		strictPort: true
	}
};

export default config;
