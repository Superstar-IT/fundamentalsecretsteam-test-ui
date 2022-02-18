import axios from "axios"

const api = 'http://localhost:8080/api/users'

export const saveUser = async (data) => {
    return axios.post(api, data)
        .then((res) => res.data)
        .catch((err) => {
            throw new Error(`Failed to save user.`)
        });
}

export const getUsers = async () => {
    return axios.get(api)
        .then((res) => res.data)
        .catch(() => {
            throw new Error(`Failed to get users.`);
        });
}