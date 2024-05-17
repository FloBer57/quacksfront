// src/utils/errorHandler.js

export const handleResponse = (response) => {
  return response.data;
};

export const handleError = (error, navigate) => {
  if (error.response) {
    const { status, data } = error.response;

    // Log the error response
    console.error('API Error:', status, data);

    let errorMessage = 'An error occurred';
    switch (status) {
      case 400:
        errorMessage = 'Bad Request: ' + data;
        break;
      case 401:
        errorMessage = 'Unauthorized: ' + data;
        if (navigate) navigate('/unauthorized'); // Redirige vers la page de login
        break;
      case 403:
        errorMessage = 'Forbidden: ' + data;
        if (navigate) navigate('/forbidden'); // Redirige vers une page interdite
        break;
      case 404:
        errorMessage = 'Not Found: ' + data;
        if (navigate) navigate('/not-found'); // Redirige vers une page non trouvée
        break;
      case 409:
        errorMessage = 'Conflict: ' + data;
        break;
      case 500:
        errorMessage = 'Internal Server Error: ' + data;
        if (navigate) navigate('/error'); // Redirige vers une page d'erreur générale
        break;
      default:
        errorMessage = 'Error: ' + data;
    }
    throw new Error(errorMessage);
  } else {
    // Handle network or other errors
    console.error('Network error:', error.message);
    throw new Error('Network error: ' + error.message);
  }
};
