// import { ClaimFeatureCollection } from "@/interfaces/public-lighting/corrective-maintenance/claim.interface";
// import { DescentGeoserver } from "@/interfaces/public-lighting/preventive-maintenance/descent.interface";
// import { StreetHightFeatureCollection } from "@/interfaces/public-lighting/street-light/street-light.interface";
// import { LampMeterFeatureCollection } from "@/interfaces/public-lighting/streetlamp-consumption/lampmeter.interface";
// import { CabinetFeatureCollection } from "@/interfaces/public-lighting/streetlamp-consumption/cabinet.interface";
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { DrainFeatureCollection } from "@/interfaces/road/drain-network/drain.interface";
// import {
//   SignalisationDegradationFeatureCollection,
//   SignalisationFeatureCollection,
//   SignalisationInterventionFeatureCollection,
//   SignalisationNeedsFeatureCollection,
// } from "@/interfaces/road/signalisation/signalisation.interface";
// import { RoadSectionFeatureCollection } from "@/interfaces/road/road-network/road-network.interface";
// import { RoadDegradationFeatureCollection } from "@/interfaces/road/road-network/road-degradation.interface";
// import { SportHighFeature } from "@/interfaces/urban-planning/equipments/sports-venues/sport-sites.interface";
// import { SchoolFeatureCollection } from "@/interfaces/urban-planning/equipments/schools/schools.interface";
// import { LandfillFeatureCollection } from "@/interfaces/waste-collections/landfills/landfill.interface";
// import { GreenSpaceFeatureCollection } from "@/interfaces/urban-planning/green-space/green-space.interface";
// import { EntertainmentFeatureCollection } from "@/interfaces/urban-planning/equipments/entertainment-space/entertainment-space.interface";
// import { RavineFeatureCollection } from "@/interfaces/urban-planning/equipments/ravine/ravine.interface";
// import { BrtLineFeatureCollection } from "@/interfaces/urban-planning/equipments/brt-line/brt-line.interface";
// import { FeederLineFeatureCollection } from "@/interfaces/urban-planning/equipments/feeder-line/feeder-line.interface";
// import { SanitaryEstablishmentFeatureCollection } from "@/interfaces/sanitary/establishments.interface";
// import { HealthAreaFeatureCollection } from "@/interfaces/sanitary/healt-area.interface";
// import { HealthDistrictFeatureCollection } from "@/interfaces/sanitary/healt-district.interface";
// import { HydrantFeatureCollection } from "@/interfaces/urban-planning/equipments/hydrant/hydrants.interface";
// import { WorkOfArtFeatureCollection } from "@/interfaces/urban-planning/equipments/work-of-art/work-of-art.interface";
// import { CollectionPointFeatureCollection } from "@/interfaces/waste-collections/collection-points/collection-point.interface";
// import { CollectionPointRequestFeatureCollection } from "@/interfaces/waste-collections/collection-points/request.interface";
// import { TransferStationHighFeature } from "@/interfaces/waste-collections/transfer-station.interface";
// import { LandUsePlanFeatureCollection } from "@/interfaces/urban-planning/land-use-plan/land-use-plan.interface";
// import { DiagnosticFeatureCollection } from "@/interfaces/public-lighting/corrective-maintenance/diagnostics.interface";
// import { NeedExpressionSheetFeatureCollection } from "@/interfaces/public-lighting/public-lighting.interface";
// import { InterventionFeatureCollection } from "@/interfaces/public-lighting/corrective-maintenance/intervention.interface";
// import { CollectionRouteFeatureCollection } from "@/interfaces/waste-collections/collection-route/collection-route.interface";
// import { DescentProgramFeatureCollection } from "@/interfaces/sanitary/descent-programms.interface";
// import {
//   QuarterFeatureCollection,
//   SubdivisionHighFeatureCollection,
// } from "@/interfaces/administrative.interface";
// import { SanitaryInterventionFeatureCollection } from "@/interfaces/sanitary/sanitary-intervention.interface";
// import { IdgClaimFeatureCollection } from "@/interfaces/idg-data.interface";
// import { DrainBlockageFeatureCollection } from "@/interfaces/road/drain-network/drain-blockage.interface";
// import { DrainNeedsFeatureCollection } from "@/interfaces/road/drain-network/drain-needs.interface";
// import { DrainInterventionFeatureCollection } from "@/interfaces/road/drain-network/drain-intervention.interface";
// import { RoadDiagnosticFeatureCollection } from "@/interfaces/road/road-network/road-diagnostic.interface";
// import { RoadNeedsFeatureCollection } from "@/interfaces/road/road-network/road-needs.interface";
// import { RoadInterventionFeatureCollection } from "@/interfaces/road/road-network/road-intervention.interface";

// //  TOTAL FEATURE :
// export const CoreApi = createApi({
//   reducerPath: "CoreApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: `${process.env.NEXT_PUBLIC_GEOSERVER_URL}cud_sig/`,
//     // prepareHeaders: (headers) => {
//     //   const token = localStorage.getItem("access");
//     //   if (token) {
//     //     const userParsed = JSON.parse(token);
//     //     headers.set("authorization", `Bearer ${userParsed}`);
//     //   }
//     //   return headers;
//     // },
//   }),
//   endpoints: (builder) => ({
//     getGeoClaims: builder.query<ClaimFeatureCollection, string>({
//       query: (path) => ({
//         url: `ows?service=WFS&version=2.0.0&request=GetFeature&${path}`,
//       }),
//     }),
//     getGeoIdgData: builder.query<IdgClaimFeatureCollection, string>({
//       query: (path) => ({
//         url: `ows?service=WFS&version=2.0.0&request=GetFeature&${path}`,
//       }),
//     }),
//     getGeoDiagnostics: builder.query<DiagnosticFeatureCollection, string>({
//       query: (path) => ({
//         url: `ows?service=WFS&version=2.0.0&request=GetFeature&${path}`,
//       }),
//     }),
//     getGeoNeedExpressionSheets: builder.query<
//       NeedExpressionSheetFeatureCollection,
//       string
//     >({
//       query: (path) => ({
//         url: `ows?service=WFS&version=2.0.0&request=GetFeature&${path}`,
//       }),
//     }),
//     getGeoInterventions: builder.query<InterventionFeatureCollection, string>({
//       query: (path) => ({
//         url: `ows?service=WFS&version=2.0.0&request=GetFeature&${path}`,
//       }),
//     }),
//     getAllDecents: builder.query<DescentGeoserver, string>({
//       query: (path) => ({
//         url: `ows?service=WFS&version=2.0.0&request=GetFeature&${path}`,
//       }),
//     }),
//     getAllLampmeter: builder.query<LampMeterFeatureCollection, string>({
//       query: (path) => ({
//         url: `ows?service=WFS&version=2.0.0&request=GetFeature&${path}`,
//       }),
//     }),
//     getGeoCabinet: builder.query<CabinetFeatureCollection, string>({
//       query: (path) => ({
//         url: `ows?service=WFS&version=2.0.0&request=GetFeature&${path}`,
//       }),
//     }),

//     getAllStreetLight: builder.query<StreetHightFeatureCollection, string>({
//       query: (path) => ({
//         url: `ows?service=WFS&version=2.0.0&request=GetFeature&${path}`,
//       }),
//     }),
//     getAllSanitaryEstablishment: builder.query<
//       SanitaryEstablishmentFeatureCollection,
//       string
//     >({
//       query: (path) => ({
//         url: `ows?service=WFS&version=2.0.0&request=GetFeature&${path}`,
//       }),
//     }),
//     getAllSanitaryIntervention: builder.query<
//       SanitaryInterventionFeatureCollection,
//       string
//     >({
//       query: (path) => ({
//         url: `ows?service=WFS&version=2.0.0&request=GetFeature&${path}`,
//       }),
//     }),

//     getGeoSignalisations: builder.query<SignalisationFeatureCollection, string>(
//       {
//         query: (path) => ({
//           url: path,
//         }),
//       }
//     ),

//     getGeoSignalisationdegradation: builder.query<
//       SignalisationDegradationFeatureCollection,
//       string
//     >({
//       query: (path) => ({
//         url: `ows?service=WFS&version=2.0.0&request=GetFeature&${path}`,
//       }),
//     }),

//     getGeoSignalisationneeds: builder.query<
//       SignalisationNeedsFeatureCollection,
//       string
//     >({
//       query: (path) => ({
//         url: `ows?service=WFS&version=2.0.0&request=GetFeature&${path}`,
//       }),
//     }),

//     getGeoSignalisationintervention: builder.query<
//       SignalisationInterventionFeatureCollection,
//       string
//     >({
//       query: (path) => ({
//         url: `ows?service=WFS&version=2.0.0&request=GetFeature&${path}`,
//       }),
//     }),

//     // getAllSanitaryEstablishment: builder.query<
//     //   SanitaryEstablishmentInterface,
//     //   string
//     // >({
//     //   query: (path) => ({
//     //     url: `ows?service=WFS&version=2.0.0&request=GetFeature&${path}`,
//     //   }),
//     // }),
//     getAllSportSites: builder.query<SportHighFeature, string>({
//       query: (path) => ({
//         url: `ows?service=WFS&version=2.0.0&request=GetFeature&${path}`,
//       }),
//     }),
//     getAllSchools: builder.query<SchoolFeatureCollection, string>({
//       query: (path) => ({
//         url: `ows?service=WFS&version=2.0.0&request=GetFeature&${path}`,
//       }),
//     }),

//     getAllHealthDistrict: builder.query<
//       HealthDistrictFeatureCollection,
//       string
//     >({
//       query: (path) => ({
//         url: `ows?service=WFS&version=2.0.0&request=GetFeature&${path}`,
//       }),
//     }),
//     getAllLandfills: builder.query<LandfillFeatureCollection, string>({
//       query: (path) => ({
//         url: `ows?service=WFS&version=2.0.0&request=GetFeature&${path}`,
//       }),
//     }),
//     getAllSpacesGreen: builder.query<GreenSpaceFeatureCollection, string>({
//       query: (path) => ({
//         url: `ows?service=WFS&version=2.0.0&request=GetFeature&${path}`,
//       }),
//     }),
//     getAllEntertainment: builder.query<EntertainmentFeatureCollection, string>({
//       query: (path) => ({
//         url: `ows?service=WFS&version=2.0.0&request=GetFeature&${path}`,
//       }),
//     }),
//     getAllRavine: builder.query<RavineFeatureCollection, string>({
//       query: (path) => ({
//         url: `ows?service=WFS&version=2.0.0&request=GetFeature&${path}`,
//       }),
//     }),
//     getAllBrtLine: builder.query<BrtLineFeatureCollection, string>({
//       query: (path) => ({
//         url: `ows?service=WFS&version=2.0.0&request=GetFeature&${path}`,
//       }),
//     }),
//     getAllFeederLine: builder.query<FeederLineFeatureCollection, string>({
//       query: (path) => ({
//         url: `ows?service=WFS&version=2.0.0&request=GetFeature&${path}`,
//       }),
//     }),
//     getAllHealthArea: builder.query<HealthAreaFeatureCollection, string>({
//       query: (path) => ({
//         url: `ows?service=WFS&version=2.0.0&request=GetFeature&${path}`,
//       }),
//     }),
//     getAllHydrant: builder.query<HydrantFeatureCollection, string>({
//       query: (path) => ({
//         url: `ows?service=WFS&version=2.0.0&request=GetFeature&${path}`,
//       }),
//     }),
//     getAllWorkOfArt: builder.query<WorkOfArtFeatureCollection, string>({
//       query: (path) => ({
//         url: `ows?service=WFS&version=2.0.0&request=GetFeature&${path}`,
//       }),
//     }),
//     getGeoDrain: builder.query<DrainFeatureCollection, string>({
//       query: (path) => ({
//         url: path,
//       }),
//     }),

//     getGeoDrainBlockage: builder.query<DrainBlockageFeatureCollection, string>({
//       query: (path) => ({
//         url: path,
//       }),
//     }),

//     getGeoDrainNeeds: builder.query<DrainNeedsFeatureCollection, string>({
//       query: (path) => ({
//         url: path,
//       }),
//     }),

//     getGeoDrainIntervention: builder.query<DrainInterventionFeatureCollection, string>({
//       query: (path) => ({
//         url: path,
//       }),
//     }),

//     getGeoRoadNetwork: builder.query<RoadSectionFeatureCollection, string>({
//       query: (path) => ({
//         url: path,
//       }),
//     }),
//     getGeoRoadDegradation: builder.query<
//       RoadDegradationFeatureCollection,
//       string
//     >({
//       query: (path) => ({
//         url: path,
//       }),
//     }),

//     getGeoRoadDiagnostic: builder.query<
//       RoadDiagnosticFeatureCollection,
//       string
//     >({
//       query: (path) => ({
//         url: path,
//       }),
//     }),

//     getGeoRoadNeeds: builder.query<
//       RoadNeedsFeatureCollection,
//       string
//     >({
//       query: (path) => ({
//         url: path,
//       }),
//     }),

//     getGeoRoadIntervention: builder.query<
//       RoadInterventionFeatureCollection,
//       string
//     >({
//       query: (path) => ({
//         url: path,
//       }),
//     }),
//     getAllCollectionPoints: builder.query<
//       CollectionPointFeatureCollection,
//       string
//     >({
//       query: (path) => ({
//         url: `ows?service=WFS&version=2.0.0&request=GetFeature&${path}`,
//       }),
//     }),
//     getAllNormalCollectionPoint: builder.query<
//       CollectionPointFeatureCollection,
//       string
//     >({
//       query: (path) => ({
//         url: `ows?service=WFS&version=2.0.0&request=GetFeature&${path}`,
//       }),
//     }),
//     getAllLandUsePlan: builder.query<LandUsePlanFeatureCollection, string>({
//       query: (path) => ({
//         url: `ows?service=WFS&version=2.0.0&request=GetFeature&${path}`,
//       }),
//     }),
//     getAllRequests: builder.query<
//       CollectionPointRequestFeatureCollection,
//       string
//     >({
//       query: (path) => ({
//         url: `ows?service=WFS&version=2.0.0&request=GetFeature&${path}`,
//       }),
//     }),
//     getAllTransferCenter: builder.query<TransferStationHighFeature, string>({
//       query: (path) => ({
//         url: `ows?service=WFS&version=2.0.0&request=GetFeature&${path}`,
//       }),
//     }),
//     getAllDescentProgram: builder.query<
//       DescentProgramFeatureCollection,
//       string
//     >({
//       query: (path) => ({
//         url: `ows?service=WFS&version=2.0.0&request=GetFeature&${path}`,
//       }),
//     }),
//     getGeoCollectionRoute: builder.query<
//       CollectionRouteFeatureCollection,
//       string
//     >({
//       query: (path) => ({
//         url: `ows?service=WFS&version=2.0.0&request=GetFeature&${path}`,
//       }),
//     }),
//     getAllSubdivisions: builder.query<SubdivisionHighFeatureCollection, string>(
//       {
//         query: (path) => ({
//           url: `ows?service=WFS&version=2.0.0&request=GetFeature&${path}`,
//         }),
//       }
//     ),
//     getAllQuarters: builder.query<QuarterFeatureCollection, string>({
//       query: (path) => ({
//         url: `ows?service=WFS&version=2.0.0&request=GetFeature&${path}`,
//       }),
//     }),
//   }),
// });

// export const {
//   useGetAllDecentsQuery,
//   useGetAllLampmeterQuery,
//   useGetGeoCabinetQuery,
//   useGetAllStreetLightQuery,
//   useGetGeoClaimsQuery,
//   useGetGeoDrainNeedsQuery,
//   useGetAllSportSitesQuery,
//   useGetGeoSignalisationsQuery,
//   useGetGeoSignalisationdegradationQuery,
//   useGetGeoDrainBlockageQuery,
//   useGetGeoDrainInterventionQuery,
//   useGetGeoRoadDiagnosticQuery,
//   useGetGeoRoadInterventionQuery,
//   useGetGeoRoadNeedsQuery,
//   useGetAllSchoolsQuery,
//   useGetAllSanitaryEstablishmentQuery,
//   useGetAllLandfillsQuery,
//   useGetAllSpacesGreenQuery,
//   useGetAllEntertainmentQuery,
//   useGetAllRavineQuery,
//   useGetAllBrtLineQuery,
//   useGetAllFeederLineQuery,
//   useGetAllHealthDistrictQuery,
//   useGetAllHealthAreaQuery,
//   useGetAllHydrantQuery,
//   useGetAllWorkOfArtQuery,
//   useGetGeoRoadNetworkQuery,
//   useGetAllCollectionPointsQuery,
//   useGetGeoDrainQuery,
//   useGetGeoRoadDegradationQuery,
//   useGetAllNormalCollectionPointQuery,
//   useGetAllRequestsQuery,
//   useGetAllTransferCenterQuery,
//   useGetAllLandUsePlanQuery,
//   useGetAllSubdivisionsQuery,
//   useGetGeoCollectionRouteQuery,
//   useGetAllDescentProgramQuery,
//   useGetAllQuartersQuery,
//   useGetGeoDiagnosticsQuery,
//   useGetGeoNeedExpressionSheetsQuery,
//   useGetGeoInterventionsQuery,
//   useGetAllSanitaryInterventionQuery,
//   useGetGeoIdgDataQuery,
//   useGetGeoSignalisationinterventionQuery,
//   useGetGeoSignalisationneedsQuery,
// } = CoreApi;
