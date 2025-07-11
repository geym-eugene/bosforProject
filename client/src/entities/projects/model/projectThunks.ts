import {createAsyncThunk} from "@reduxjs/toolkit";
import projectService from "../api/projectService";
import {NewProjectT} from "./projectType";

export const getAllProjectsThunk = createAsyncThunk(
    "/get/projects/",
    async () => await projectService.getAllProjectsService()
);

export const addProjectThunk = createAsyncThunk(
    "/add/project/",
    async (project: NewProjectT) =>
        await projectService.addProjectService(project)
);

export const deleteProjectThunk = createAsyncThunk(
    "/delete/project",
    async (id: number) => {
        await projectService.deleteProjectService(id);
        return id;
    }
);

export const patchProjectThunk = createAsyncThunk(
    "/patch/project/",
    async ({id, data}: { id: number; data: NewProjectT }) =>
        await projectService.patchProjectService(id, data)
);

export const addImagesThunk = createAsyncThunk('/add/photo/', async ({projectID, formData}: {
    projectID: number,
    formData: FormData
}) => {
    const image = await projectService.addImageService(projectID, formData)
    return ({projectID, image})
})


