export type ProjectT = {
    id: number
    title: string
    description: string
    area_m2: number
    floors: number
    material: string
    roof: string
    style: string
    price: string
    model_3d_url: string
    plan_pdf_url: string
    userId: any
    created_at: string
    updated_at: string
    images: ProjectImage[]
}

export type ProjectsT = ProjectT[];

export type NewProjectT = {
    title: string
    description: string
    area_m2: string
    floors: string
    material: string
    roof: string
    style: string
    price: string
    model_3d_url: string
    plan_pdf_url: string
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
    filters: filtersStatesT;
};

export type filtersStatesT = {
    area_m2: { min: number; max: number } | null;
    price: number | null;
    material: string | null;
    style: string | null;
    floors: number | null;
};

export interface ProjectImage {
    id: number
    url: string
    isPreview: boolean
    created_at: string
    updatedAt: string
}
