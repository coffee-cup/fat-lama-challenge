const apiUrl = route => `http://localhost:8080/${route}`;
const transactionsRoute = page => apiUrl(`transactions/${page}`);
const transactionRoute = id => apiUrl(`transaction/${id}`);
const userRoute = id => apiUrl(`user/${id}`);

export const getTransactions = (page = 0) =>
  fetch(transactionsRoute(page), { method: 'GET', mode: 'cors' })
    .then(res => res.json())
    .catch(console.error);

export const getTransactionById = id =>
  fetch(transactionRoute(id), { method: 'GET', mode: 'cors' })
    .then(res => res.json())
    .catch(console.error);

export const getUser = id =>
  fetch(userRoute(id), { method: 'GET', mode: 'cors' })
    .then(res => res.json())
    .catch(console.error);

export const updateTransactionStatus = (id, status) =>
  fetch(transactionRoute(id), {
    method: 'PUT',
    mode: 'cors',
    body: JSON.stringify({ status })
  })
    .then(res => res.json())
    .catch(console.error);
