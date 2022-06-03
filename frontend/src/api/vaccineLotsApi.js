import axiosClient from "./axiosClient";

const vaccineLotEndpoint ='vaccine/lots'

const vaccineLotsApi = {
    getAll: () => axiosClient.get(vaccineLotEndpoint),
    create: (params) => axiosClient.post (vaccineLotEndpoint, params),
    getOne: (id) => axiosClient.get(`${vaccineLotEndpoint}/${id}`),
    update: (id, params) => axiosClient.put(`${vaccineLotEndpoint}/${id}`, params),
    delete: (id) => axiosClient.delete(`${vaccineLotEndpoint}/${id}`),

}

export default vaccineLotsApi