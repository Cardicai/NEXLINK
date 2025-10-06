
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        space: {
          bg1: '#05070d',
          bg2: '#0d1117',
          panel: '#0f1622',
          panel2: '#131a24',
          ringGold: '#f5c542',
          royal: '#004aad'
        }
      },
      boxShadow: {
        gold: '0 0 24px rgba(245,197,66,0.25)'
      }
    }
  },
  plugins: []
}
export default config
