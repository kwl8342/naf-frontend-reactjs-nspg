const getConfigValue = (key, defaultValue = '') => {
  let returnValue;

  if (window._env_) {
    returnValue = window._env_[key];
  } else if (!returnValue && process.env) {
    returnValue = process.env[key];
  }
  return returnValue || defaultValue;
};

const config = {
  app: {},
  services: {
    nspg: {
      uri: getConfigValue('REACT_NSPG_API', 'https://dev-network-portal.mdlz.com/nspg/api'),
      accessToken: localStorage.getItem('accessToken'),
      refreshToken: localStorage.getItem('refreshToken'),
      csrfToken: getConfigValue('REACT_NSPG_CSRF_TOKEN')
    },
    arms: {
      uri: getConfigValue('REACT_ARMS_API', 'https://dev-network-portal.mdlz.com/arms/api'),
      accessToken: localStorage.getItem('accessToken'),
      refreshToken: localStorage.getItem('refreshToken')
    }
  }
};

export default config;
