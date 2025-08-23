import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PublicLightingViewParamsInterface {
  layerViewParams?: string;
  notSelectStreetLampOnObservation?: boolean;
  notSelectSignOnDegradation?: boolean;
  notSelectEstablishmentOnDescent?: boolean;
  notSelectDrainOnBlockage?: boolean;
  selectedParamId?: string;
}
const initialState: PublicLightingViewParamsInterface = {
  layerViewParams: "",
  notSelectStreetLampOnObservation: true,
  notSelectSignOnDegradation: true,
  notSelectEstablishmentOnDescent: true,
  notSelectDrainOnBlockage: true,
  selectedParamId: "",
};

const publicLightingViewParamsSlice = createSlice({
  name: "publicLightingViewParams",
  initialState,
  reducers: {
    setPublicViewParamsLayerData: (
      state,
      action: PayloadAction<PublicLightingViewParamsInterface>
    ) => {
      state = { ...action.payload };
      return state;
    },
  },
});

export const { setPublicViewParamsLayerData } =
  publicLightingViewParamsSlice.actions;
export default publicLightingViewParamsSlice.reducer;
