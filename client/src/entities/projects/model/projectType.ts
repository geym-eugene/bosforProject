export interface Project {
  id: number
  title: string
  description: string
  area_m2: number
  floors: number
  material: string
  price: string
  model_3d_url: string
  plan_pdf_url: string
}


export type Projects = Project[]

