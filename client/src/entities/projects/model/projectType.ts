export interface ProjectT {
  id: number;
  title: string;
  description: string;
  area_m2: number;
  floors: number;
  material: string;
  price: number;
  image_preview: string;
  model_3d_url: string;
  plan_pdf_url: string;
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

export type InitialStateT = {
  projects: ProjectsT;
  loading: boolean;
  error: string | null;
  isAddModalOpen: boolean;
  isSecondModalOpen: boolean;
  selectedProjectId: number | null;
  allProjects: boolean
};
