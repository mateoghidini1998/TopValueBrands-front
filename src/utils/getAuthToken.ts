export const getAuthToken = () => {
    const token = localStorage.getItem('access-token');
    return token || undefined;
   };
   