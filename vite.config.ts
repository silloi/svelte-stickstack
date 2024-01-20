import { sveltekit } from '@sveltejs/kit/vite';
import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit(),
		VitePWA({
			registerType: 'autoUpdate',
			devOptions: {
				enabled: true
			},
			includeAssets: ['favicon.png', 'apple-touch-icon.png', 'memo.svg'],
			manifest: {
				name: 'Stickstack',
				short_name: 'Stickstack',
				description: 'Sticky-like stackable todo app',
				icons: [
					{
						src: 'android-chrome-192x192.png',
						sizes: '192x192',
						type: 'image/png'
					}
				]
			}
		})
	]
});
