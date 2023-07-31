export const getToken = () => JSON.parse(localStorage.getItem('user'))?.token?.token;
