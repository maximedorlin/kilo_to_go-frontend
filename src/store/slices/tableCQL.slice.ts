import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface tableMapInterface {
  layerUrl: string;
  CQL_FILTER: string;
}
const initialState_1: tableMapInterface = {
  layerUrl: "",
  CQL_FILTER: "",
};
interface Payload {
  key: keyof typeof initialState;
  data: tableMapInterface;
}

const initialState: Record<string, tableMapInterface> = {
  siteSport: initialState_1,
  schools: initialState_1,
  greenSpace: initialState_1,
  entertainment: initialState_1,
  ravine: initialState_1,
  brtLine: initialState_1,
  feederLine: initialState_1,
  hydrant: initialState_1,
  workOfArt: initialState_1,
  landUsePlan: initialState_1,
  landfill: initialState_1,
  roads: initialState_1,
  collectionpoint: initialState_1,
  collectCircuits: initialState_1,
  sanitaryEtablishment: initialState_1,
  healthArea: initialState_1,
  HealthDistrict: initialState_1,
  transfertStation: initialState_1,
  request: initialState_1,
  dropDownProgram: initialState_1,
  idgData: initialState_1,
};

const tableMapSlice = createSlice({
  name: "TableMap",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<Payload>) => {
      state = { ...state, [action.payload.key]: action.payload.data };
      return state;
    },
  },
});

export const { setData } = tableMapSlice.actions;
export default tableMapSlice.reducer;
