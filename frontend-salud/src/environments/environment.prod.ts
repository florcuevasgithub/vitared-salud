// En Railway, las variables de entorno se inyectan en tiempo de build
// Para producción, usa la variable de entorno API_URL o el valor por defecto
declare const process: {
  env: {
    [key: string]: string;
  };
};

export const environment = {
  production: true,
  // Railway inyectará API_URL durante el build
  apiUrl: (typeof process !== 'undefined' && process.env && process.env['API_URL']) 
    ? process.env['API_URL'] 
    : 'https://vitared-salud-production.up.railway.app'
};
