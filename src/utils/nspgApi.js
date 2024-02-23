import axios from 'axios';
import config from '../config';

const nspgUrl = config.services.nspg.uri;

export const secureAxios = async (options, microServiceName) => {
  try {
    let tokenExpireTime = localStorage.getItem('tokenExpire');
    if (new Date() > new Date(tokenExpireTime)) {
      await refreshToken();
    }

    let token = localStorage.getItem('accessToken');
    if (microServiceName) {
      token = await getMsToken(microServiceName);
    }
    options.headers = {
      authorization: `Bearer ${token}`
    };
  } catch (e) {
    console.log(e);
  }

  return axios(options);
};

export const authenticate = async (payload) => {
  return axios({
    method: 'POST',
    url: `${nspgUrl}/token`,
    data: payload,
    withCredentials: true
  })
    .then((response) => {
      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);
      const date = new Date();
      date.setMinutes(date.getMinutes() + 15);
      localStorage.setItem('tokenExpire', date);
    })
    .catch((e) => {
      throw e;
    });
};

export const refreshToken = async () => {
  return axios({
    method: 'POST',
    url: `${nspgUrl}/token/refresh`,
    data: {
      refresh: localStorage.getItem('refreshToken')
    },
    withCredentials: true
  })
    .then((response) => {
      localStorage.setItem('accessToken', response.data.access);
      const date = new Date();
      date.setMinutes(date.getMinutes() + 15);
      localStorage.setItem('tokenExpire', date);
    })
    .catch((e) => {
      console.error(e);
    });
};

export const getMenuData = async () => {
  try {
    const response = await secureAxios({
      method: 'GET',
      url: `${nspgUrl}/core/menus`
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getMsToken = async (ms) => {
  if (ms) {
    let token;
    let memberships = localStorage.getItem('memberships');
    let tokenExpireTime = localStorage.getItem('tokenExpire');
    if (memberships) {
      memberships = JSON.parse(memberships);
    }

    if (!memberships || new Date() > new Date(tokenExpireTime)) {
      const res = await secureAxios({
        method: 'GET',
        url: `${nspgUrl}/core/membership/`
      });
      memberships = res.data.results;
      localStorage.setItem('memberships', JSON.stringify(memberships));
    }

    if (memberships) {
      memberships.forEach((value) => {
        if (value.name.toUpperCase() === ms.toString().toUpperCase()) {
          token = value.token;
        }
      });
    }

    return token;
  }
  return;
};
