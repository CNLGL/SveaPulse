/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    "@tailwindcss/postcss": {}, // Buradaki ismi değiştirdik
    autoprefixer: {},
  },
};

export default config;
