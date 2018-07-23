const apiUrl = route => `http://localhost:8080/${route}`;
const transactionsRoute = page => apiUrl(`transactions/${page}`);
const transactionRoute = id => apiUrl(`transaction/${id}`);

export const getTransactions = (page = 0) =>
  fetch(transactionsRoute(page), { method: 'GET', mode: 'cors' })
    .then(res => res.json())
    .catch(console.error);

export const getTransactionById = id =>
  fetch(transactionRoute(id), { method: 'GET', mode: 'cors' })
    .then(res => res.json())
    .catch(console.error);
