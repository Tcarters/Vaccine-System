import axiosClient from "./axiosClient";

const placeEndpoint = 'place'

const placeApi = {
    getAll: () => axiosClient.get(placeEndpoint),
    create: (params) => axiosClient.post (placeEndpoint, params),
    getOne: (id)=> axiosClient.get(`${placeEndpoint}/${id}`)
}

export default placeApi