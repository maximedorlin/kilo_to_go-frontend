// import { Filter, Sort } from "@/interfaces/base.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GeoSelectedIdsInterface {
  geoSelectedIds: string[];
  unselectRows: number;
  selelectedFeature?: Record<string, any>;
  mapIsLoading?: boolean;
  mapCount: number;
  initialLayersZIndexStart: number;
}
const initialState: GeoSelectedIdsInterface = {
  geoSelectedIds: [],
  unselectRows: 1,
  mapIsLoading: false,
  mapCount: 0,
  initialLayersZIndexStart: 1000,
};

const GeoSelectedIdsSlice = createSlice({
  name: "geoSelectedIds",
  initialState,
  reducers: {
    setGeoSelectedIds: (
      state,
      action: PayloadAction<Pick<GeoSelectedIdsInterface, "geoSelectedIds">>
    ) => {
      state.geoSelectedIds = action.payload.geoSelectedIds;
      return state;
    },
    SetUnselectRows: (state) => {
      state.unselectRows = state.unselectRows + 1;
      return state;
    },
    setSelectedFeature: (
      state,
      action: PayloadAction<Pick<GeoSelectedIdsInterface, "selelectedFeature">>
    ) => {
      state.selelectedFeature = action.payload.selelectedFeature;
      return state;
    },
    setInitialLayersZIndexStart: (
      state,
      action: PayloadAction<
        Pick<GeoSelectedIdsInterface, "initialLayersZIndexStart">
      >
    ) => {
      state.initialLayersZIndexStart = action.payload.initialLayersZIndexStart;
      return state;
    },
    setMapIsLoading: (
      state,
      action: PayloadAction<Pick<GeoSelectedIdsInterface, "mapIsLoading">>
    ) => {
      console.log(
        "action.payload.mapIsLoading ------",
        action.payload.mapIsLoading
      );

      state.mapIsLoading = action.payload.mapIsLoading;
      return state;
    },
    setMapCount: (state) => {
      state.mapCount = state.mapCount + 1;
      return state;
    },
  },
});

export const {
  setGeoSelectedIds,
  SetUnselectRows,
  setSelectedFeature,
  setMapIsLoading,
  setMapCount,
  setInitialLayersZIndexStart,
} = GeoSelectedIdsSlice.actions;

export default GeoSelectedIdsSlice.reducer;
