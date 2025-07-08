import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialStateT } from "./projectType";
import {
  addProjectThunk,
  deleteProjectThunk,
  getAllProjectsThunk,
  patchProjectThunk,
} from "./projectThunks";

const initialState: InitialStateT = {
  projects: [],
  projectsFiltered: [],
  loading: false,
  error: null,
  isAddModalOpen: false,
  isSecondModalOpen: false,
  selectedProjectId: null,
  showProjectState: true,
};

export const projectsSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    openAddModal(state) {
      state.isAddModalOpen = true;
    },
    closeAddModal(state) {
      state.isAddModalOpen = false;
    },
    openSecondModal(state, action: PayloadAction<number>) {
      state.isSecondModalOpen = true;
      state.selectedProjectId = action.payload;
    },
    closeSecondModal(state) {
      state.isSecondModalOpen = false;
      state.selectedProjectId = null;
    },
    showPage(state) {
      state.showProjectState = false;
    },
    dontShow(state) {
      state.showProjectState = true;
    },
    minHundred(state) {
      state.projectsFiltered = state.projects.filter(
        (project) => project.area_m2 > 100
      );
    },
    noFilter(state) {
      state.projectsFiltered = state.projects;
    },
  },
  extraReducers(builder) {
    //get
    builder.addCase(getAllProjectsThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllProjectsThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getAllProjectsThunk.fulfilled, (state, action) => {
      state.projects = action.payload;
      state.projectsFiltered = action.payload;
      state.loading = false;
      state.error = null;
    });
    //post
    builder.addCase(addProjectThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addProjectThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(addProjectThunk.fulfilled, (state, action) => {
      state.projects.push(action.payload);
      state.projectsFiltered.push(action.payload);
      state.loading = false;
      state.error = null;
    });
    //delete
    builder.addCase(deleteProjectThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteProjectThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(deleteProjectThunk.fulfilled, (state, action) => {
      state.projects = state.projects.filter(
        (project) => project.id !== action.payload
      );
      state.projectsFiltered = state.projectsFiltered.filter(
        (project) => project.id !== action.payload
      );
      state.loading = false;
      state.error = null;
    });
    //patch
    builder.addCase(patchProjectThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(patchProjectThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(patchProjectThunk.fulfilled, (state, action) => {
      const indexNF = state.projects.findIndex(
        (project) => project.id === action.meta.arg.id
      );
      if (indexNF !== -1) {
        state.projects[indexNF] = {
          ...state.projects[indexNF],
          ...action.payload,
        };
      }

      const index = state.projectsFiltered.findIndex(
        (project) => project.id === action.meta.arg.id
      );
      if (index !== -1) {
        state.projectsFiltered[index] = {
          ...state.projectsFiltered[index],
          ...action.payload,
        };
      }
      state.loading = false;
      state.error = null;
    });
  },
});

export default projectsSlice.reducer;

export const {
  openAddModal,
  closeAddModal,
  openSecondModal,
  closeSecondModal,
  showPage,
  dontShow,
  minHundred,
  noFilter,
} = projectsSlice.actions;
