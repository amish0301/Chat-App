export const serverURI = import.meta.env.VITE_SERVER;
export const signupConfig = {
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

export const loginConfig = {
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
};

export const GeoLocationConfig = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': '3b8b797fb9msh62aa0db262ebf8cp1d45fejsn8d14c406473c',
    'x-rapidapi-host': 'reverse-geocoder.p.rapidapi.com'
  }
}