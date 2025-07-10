export interface ProjectT {
    id: number;
    title: string;
    description: string;
    area_m2: number;
    floors: number;
    material: string;
    roof: string | null;
    style: string | null;
    price: number;
    image_preview: string;
    model_3d_url: string;
    plan_pdf_url: string;
    userId: number | null;
}

export type ProjectsT = ProjectT[];

export type NewProjectT = {
    title: string;
    description: string;
    area_m2: number;
    floors: number;
    material: string;
    price: number;
    image_preview: string;
    model_3d_url: string;
    plan_pdf_url: string;
};

export type objectFav = {
    id: number;
    project: ProjectT;
};

export type InitialStateT = {
    projects: ProjectsT;
    projectsFiltered: ProjectsT;
    loading: boolean;
    error: string | null;
    isAddModalOpen: boolean;
    isSecondModalOpen: boolean;
    selectedProjectId: number | null;
    showProjectState: boolean;
    rangeFilter: number;
    filters: filtersStatesT
};

export type filtersStatesT = {
    area_m2: { min: number, max: number } | null,
    price: number | null,
    material: string | null,
    style: string | null,
    floors: number | null,
}
