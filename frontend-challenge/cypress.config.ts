import { defineConfig } from 'cypress';

export default defineConfig({
	e2e: {
		setupNodeEvents(on, config) {
			// implementar eventos node
		},
		baseUrl: 'http://localhost:3000',
		// otras configuraciones
	},
});
