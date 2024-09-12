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
        "Content-Type": "application/json"
    }
};