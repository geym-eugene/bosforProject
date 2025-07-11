import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {InitialStateT} from "./projectType";
import {addProjectThunk, deleteProjectThunk, getAllProjectsThunk, patchProjectThunk,} from "./projectThunks";

const initialState: InitialStateT = {
    projects: [],
    projectsFiltered: [],
    loading: false,
    error: null,
    isAddModalOpen: false,
    isSecondModalOpen: false,
    selectedProjectId: null,
    showProjectState: true,
    rangeFilter: 0,
    filters: {
        area_m2: {min: null, max: null},
        price: null,
        material: null,
        style: null,
        floors: null,
    }
};

function applyFilters(state: InitialStateT) {
    const {area_m2, price, material, style, floors} = state.filters;

    state.projectsFiltered = state.projects.filter(project => {
        const matchArea = area_m2.min !== null && area_m2.max !== null
            ? project.area_m2 >= area_m2.min && project.area_m2 <= area_m2.max
            : true;

        const matchPrice = price !== null
            ? Number(project.price) >= price
            : true;

        const matchMaterial = material
            ? project.material.toLowerCase() === material.toLowerCase()
            : true;

        const matchStyle = style
            ? project.style.toLowerCase() === style.toLowerCase()
            : true;

        const matchFloors = floors !== null
            ? project.floors === floors
            : true;

        return matchArea && matchPrice && matchMaterial && matchStyle && matchFloors;
    });
}


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
            state.projectsFiltered = state.projectsFiltered.filter(
                (project) => project.area_m2 > 100
            );
        },

        setStyleFilter(state, action: PayloadAction<string | null>) {
            state.filters.style = action.payload;
            applyFilters(state);
        },

        noFilter(state) {
            state.filters = {
                area_m2: {min: null, max: null},
                price: null,
                material: null,
                style: null,
                floors: null,
            };
            state.projectsFiltered = [...state.projects];
        },
        setRangeFilter(state, action: PayloadAction<number>) {
            state.rangeFilter = action.payload;

            state.projectsFiltered = state.projects.filter(
                (el) => Number(el.price) <= state.rangeFilter
            );
        },
        setMaterialFilter(state, action: PayloadAction<string>) {
            state.filters.material = action.payload || null;
            applyFilters(state);
        },

        setAreaFilter(state, action: PayloadAction<{ min: number, max: number } | null>) {
            if (action.payload) {
                state.filters.area_m2 = {
                    min: action.payload.min,
                    max: action.payload.max,
                };
            } else {
                state.filters.area_m2 = {min: null, max: null};
            }
            applyFilters(state);
        },

        setFloorFilter(state, action: PayloadAction<number | null>) {
            state.filters.floors = action.payload;
            applyFilters(state);
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
            action.payload.area_m2 = Number(action.payload.area_m2)
            action.payload.floors = Number(action.payload.floors)
            action.payload.price = Number(action.payload.price)
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
    }
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
    setRangeFilter,
    setMaterialFilter,
    setAreaFilter,
    setFloorFilter,
    setStyleFilter,
} = projectsSlice.actions;

