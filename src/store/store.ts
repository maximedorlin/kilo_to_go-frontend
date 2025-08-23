import { configureStore } from "@reduxjs/toolkit";
import homePageReducer from "./slices/homePageSlice";
import { AuthenticationApi } from "./apis/auth/authentication.api";
import AuthSlice from "@/store/slices/authslice";
import tableMapSlice from "@/store/slices/tableCQL.slice";
import themeSlice from "@/store/slices/themeSlice";
import MapSlice from "@/store/slices/mapSlice";
import descentSlice from "@/store/slices/descent.slice";
import AllTableSlice from "@/store/slices/tables-pagiations-slices/all-table-slices";
import mapSlice from "./slices/form-map/mapSlice";
import NeesheetTableSlice from "./slices/tables-pagiations-slices/needsheet-table.slices";
import GeoTableSlice from "./slices/tables-pagiations-slices/geoTable.slice";
import { FetchFileAPI } from "./apis/fetchFile";
import { ParticipantsApi } from "./apis/participants.api";
import publicLightingViewParamsSlice from "./slices/publicLightingViewParamsSlice";
import { EquipementApi } from "./apis/sanitary/equipement.api";
import { ConsumablesApi } from "./apis/sanitary/consumables.api";
import { InfrastructuresApi } from "./apis/sanitary/infrastructures.api";
import { PersonnelApi } from "./apis/sanitary/personnel.api";
import GeoSelectedIdsSlice from "./slices/tables-pagiations-slices/geoSelectedIds.slice";
import { EquipmentNoPageApi } from "./apis/sanitary/equipment_no_page";
import { DiseaseApi } from "./apis/administrative-deases.api";
import { GroupsApi } from "./apis/auth/groups.api";
import { PermissionApi } from "./apis/auth/permissions.api";
import { ConsumablesApiNoPage } from "./apis/sanitary/consumables-no-page.api";
import { InfrastructuresApiNoPage } from "./apis/sanitary/infrastructures-no-page.api";
import { PersonnelApiNoPage } from "./apis/sanitary/personnel-no-page.api";
import { PersonnalNoPageApi } from "./apis/sanitary/personnal_no_page";
import { PersonnelAdminApi } from "./apis/administrative-personnel.api";
import { UserApi } from './apis/kilotogo/User.Api';
import { AnnonceApi } from './apis/kilotogo/Annonce.Api';

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    tableMap: tableMapSlice,
    theme: themeSlice,
    decent: descentSlice,
    publicLightingViewParams: publicLightingViewParamsSlice,

    // wasteCollectionViewParams: wasteCollectionViewParamsSlice,
    // wasteCollectionViewParams: wasteCollectionViewParamsSlice,
    // wasteCollectionViewParams: wasteCollectionViewParamsSlice,
    isHomePage: homePageReducer,
    map: mapSlice,
    mapSlice: MapSlice,
    needSheetTable: NeesheetTableSlice,
    // observationSheetTable: NeesheetTableSlice,
    geoTable: GeoTableSlice,
    AllTableSlice: AllTableSlice,
    geoSelectedIds: GeoSelectedIdsSlice,
    [AuthenticationApi.reducerPath]: AuthenticationApi.reducer,
    [GroupsApi.reducerPath]: GroupsApi.reducer,
    [ParticipantsApi.reducerPath]: ParticipantsApi.reducer,
    [FetchFileAPI.reducerPath]: FetchFileAPI.reducer,
    [EquipementApi.reducerPath]: EquipementApi.reducer,
    [ConsumablesApi.reducerPath]: ConsumablesApi.reducer,
    [InfrastructuresApi.reducerPath]: InfrastructuresApi.reducer,
    [PersonnelApi.reducerPath]: PersonnelApi.reducer,
    [EquipmentNoPageApi.reducerPath]: EquipmentNoPageApi.reducer,
    [DiseaseApi.reducerPath]: DiseaseApi.reducer,
    [PermissionApi.reducerPath]: PermissionApi.reducer,
    [ConsumablesApiNoPage.reducerPath]: ConsumablesApiNoPage.reducer,
    [InfrastructuresApiNoPage.reducerPath]: InfrastructuresApiNoPage.reducer,
    [PersonnelApiNoPage.reducerPath]: PersonnelApiNoPage.reducer,
    [PersonnalNoPageApi.reducerPath]: PersonnalNoPageApi.reducer,
    [PersonnelAdminApi.reducerPath]: PersonnelAdminApi.reducer,

    [UserApi.reducerPath] : UserApi.reducer,
    [AnnonceApi.reducerPath]:AnnonceApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      AuthenticationApi.middleware,
      GroupsApi.middleware,
      PersonnelAdminApi.middleware,
      FetchFileAPI.middleware,
      PersonnelApi.middleware,
      InfrastructuresApi.middleware,
      ConsumablesApi.middleware,
      EquipementApi.middleware,
      EquipmentNoPageApi.middleware,
      DiseaseApi.middleware,
      PermissionApi.middleware,
      ParticipantsApi.middleware,
      ConsumablesApiNoPage.middleware,
      InfrastructuresApiNoPage.middleware,
      PersonnelApiNoPage.middleware,
      PersonnalNoPageApi.middleware,
      AnnonceApi.middleware,
      UserApi.middleware,
    ),
  devTools: false,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
