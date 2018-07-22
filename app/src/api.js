const apiUrl = route => `http://localhost:8080/${route}`;
const transactionRoute = page => apiUrl(`transactions/${page}`);

export const getTransactions = page => {
  const url = transactionRoute((page = 0));
  return fetch(url, { method: 'GET', mode: 'cors' })
    .then(res => res.json())
    .catch(console.error);
};
