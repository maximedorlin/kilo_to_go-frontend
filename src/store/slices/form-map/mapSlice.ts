import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MapState {
  geoJSON: string | "";
  geomType: Array<"Point" | "LineString" | "Polygon"> | null;
  isInitial: boolean;
}

const initialState: MapState = {
  geoJSON: "",
  geomType: null,
  isInitial: false,
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setGeoJSON: (state, action: PayloadAction<string | "">) => {
      state.geoJSON = action.payload;
    },
    clearGeoJSON: (state) => {
      state.geoJSON = "";
    },
    setGeomType: (
      state,
      action: PayloadAction<Array<"Point" | "LineString" | "Polygon"> | null>
    ) => {
      state.geomType = action.payload;
    },
    setIsInitial: (state, action: PayloadAction<boolean>) => {
      state.isInitial = action.payload;
    },
  },
});

export const { setGeoJSON, clearGeoJSON, setGeomType, setIsInitial } =
  mapSlice.actions;
export default mapSlice.reducer;
