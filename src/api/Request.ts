import axios from "axios";

const request = async (
    method: string,
    path: string,
    data = null,
    {
        params = {},
        headers = {},
    } = {}
) => new Promise((resolve, reject) => {

    const url = `https://date.nager.at/api/v3/${path}`;

    axios({
        method,
        url,
        data,
        withCredentials: false,
        params,
        headers,
    }).then((response) =>
        resolve(response)
    ).catch(error => {
        console.log(error.message)
        reject(error.message);
    })
})

const get = async (
    path: string,
    data?: null,
    {
        headers = {}
    } = {}
) => {
    try {
        return await request('get', path, data, {
            headers,
        })
    } catch (err) {
        throw err;
    }

}
export default { request, get };