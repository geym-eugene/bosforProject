import {AxiosInstance} from "axios";
import {NewProjectT, ProjectsT, ProjectT} from "../model/projectType";
import axiosInstance from "@/shared/api/axiosInstanse";

class ProjectService {
    constructor(private readonly client: AxiosInstance) {
    }

    async getAllProjectsService(): Promise<ProjectsT> {
        const response = await this.client.get("/projects/");
        return response.data;
    }

    async addProjectService(data: NewProjectT): Promise<ProjectT> {
        const response = await this.client.post("/projects/", data);
        return response.data;
    }

    async deleteProjectService(id: number): Promise<void> {
        await this.client.delete(`/projects/${id.toString()}`);
    }

    async patchProjectService(id: number, data: NewProjectT): Promise<ProjectT> {
        const response = await this.client.patch(`/projects/${id.toString()}`, data)
        return response.data
    }

    async addImageService(id: number, formData: FormData): Promise<{ id: number, url: string }> {
        const response = await this.client.post(`/project-images/${id}/images`, formData);
        return response.data;
    }
}

export default new ProjectService(axiosInstance)