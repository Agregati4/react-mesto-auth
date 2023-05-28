export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
  .then(res => {
    if(res.status === 200) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    alert(`Ошибка при запросе данных с сервера: ${err} - ${err.message}`);
  })
}