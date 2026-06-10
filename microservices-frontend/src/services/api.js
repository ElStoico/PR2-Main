import axios from 'axios';
import toast from 'react-hot-toast';

// Configuración base de Axios apuntando al API Gateway
const api = axios.create({
  baseURL: 'http://localhost:8080/api', // API Gateway como punto único de entrada
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de request (opcional: agregar tokens de autenticación)
api.interceptors.request.use(
  (config) => {
    console.log(`[API Request] ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de response para manejo global de errores
api.interceptors.response.use(
  (response) => {
    console.log(`[API Response] ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    // Estrategia de manejo de errores (Option B)
    let errorMessage = 'Ha ocurrido un error inesperado';
    
    if (error.response) {
      // Error del servidor (4xx, 5xx)
      const status = error.response.status;
      errorMessage = error.response.data?.message || 
                     error.response.data?.error || 
                     `Error ${status}: ${error.response.statusText}`;
      
      switch (status) {
        case 404:
          errorMessage = 'Recurso no encontrado';
          break;
        case 500:
          errorMessage = 'Error interno del servidor. Intente nuevamente.';
          break;
        case 503:
          errorMessage = 'Servicio no disponible. Intente más tarde.';
          break;
      }
    } else if (error.request) {
      // Error de red (sin respuesta del servidor)
      errorMessage = 'No se pudo conectar con el servidor. Verifique su conexión.';
    }
    
    // Mostrar toast de error
    toast.error(errorMessage, {
      duration: 4000,
      position: 'top-right',
    });
    
    console.error('[API Error]', error);
    return Promise.reject(error);
  }
);

export default api;

