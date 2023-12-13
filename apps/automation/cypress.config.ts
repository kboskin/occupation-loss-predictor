import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: 'JqPiDGcXuq',
  viewportHeight: 1080,
  viewportWidth: 1920,
  video: false,
  e2e: {
    baseUrl: 'http://localhost:3000/en',
    excludeSpecPattern: ['**/1-getting-started', '**/2-advanced-examples'],
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}'
  },
});
