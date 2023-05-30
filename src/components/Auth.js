export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  .then(res => {
    if(res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  })
};

export const authorization = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  .then(res => {
    if(res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  })
};

export const validation = (jwt) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${ jwt }`
    }
  })
  .then(res => {
    if(res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  })
};