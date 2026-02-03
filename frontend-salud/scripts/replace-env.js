// Script para reemplazar variables de entorno en environment.prod.ts
// Vercel ejecutará este script antes del build (prebuild)

const fs = require('fs');
const path = require('path');

const envFile = path.join(__dirname, '../src/environments/environment.prod.ts');

// Vercel inyecta variables de entorno, usamos NG_APP_API_URL
// Si no está definida, usamos el valor por defecto
const apiUrl = process.env.NG_APP_API_URL || 'https://backend-salud.onrender.com';

console.log('🔧 Reemplazando API URL en environment.prod.ts...');
console.log(`   Variable NG_APP_API_URL: ${process.env.NG_APP_API_URL || 'no definida'}`);
console.log(`   URL a usar: ${apiUrl}`);

let content = fs.readFileSync(envFile, 'utf8');

// Reemplazar la URL del API (busca el patrón apiUrl: '...')
const regex = /apiUrl:\s*['"`]([^'"`]*)['"`]/;
if (regex.test(content)) {
  content = content.replace(regex, `apiUrl: '${apiUrl}'`);
  fs.writeFileSync(envFile, content, 'utf8');
  console.log(`✅ Environment file updated with API URL: ${apiUrl}`);
} else {
  console.error('❌ No se encontró el patrón apiUrl en environment.prod.ts');
  process.exit(1);
}
