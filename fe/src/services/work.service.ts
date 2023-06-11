import { api, headerAPI } from "../config/axios";
import { IWork } from '../interfaces/Work';


export class WorkService {

    private apiURL = "v1/works";

    public async getAll() {
        try {
            console.log("fetching all ..")
            const response = await api.get<IWork[]>(`${this.apiURL}`)
            return await response.data
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    public async post(data: IWork) {
        try {
            const response = await api.post<IWork>(`${this.apiURL}`, data, headerAPI)
            return await response.data
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    public async getById(id: number) {
        try {
            const response = await api.get<IWork>(`${this.apiURL}/${id}`, headerAPI)
            const data: IWork = response.data
            return data
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    public async put(data: IWork) {
        try {
            const response = await api.put<IWork>(`${this.apiURL}/${data.id}`, data, headerAPI)
            return await response.data
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    public async delete(data: IWork) {
        try {
            const response = await api.delete(`${this.apiURL}/${data.id}`, headerAPI)
            return await response.data
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

}