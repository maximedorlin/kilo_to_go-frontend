type Coordinate = [number, number];
type LinearRing = Coordinate[];
type PolygonCoordinates = LinearRing[];

/**
 * Génère un filtre CQL WITHIN à partir d'un tableau de coordonnées GeoJSON (Polygon)
 * @param coordinates - Coordonnées GeoJSON de type Polygon : tableau d'anneaux (extérieur + trous)
 * @param geomField - Nom du champ géométrique (par défaut : "geom")
 * @returns Chaîne CQL_FILTER valide
 */
export function generateCQLWithinFilter(
  coordinates: PolygonCoordinates,
  geomField: string = "geom"
): string {
  if (!Array.isArray(coordinates) || coordinates.length === 0) {
    throw new Error("Coordonnées invalides : tableau vide ou mal formé.");
  }

  const cleanedRings: LinearRing[] = coordinates
    .filter(
      (ring): ring is LinearRing => Array.isArray(ring) && ring.length >= 3
    )
    .map((ring) => {
      const first = ring[0];
      const last = ring[ring.length - 1];
      const isClosed = first[0] === last[0] && first[1] === last[1];
      return isClosed ? ring : [...ring, first];
    });

  if (cleanedRings.length === 0) {
    throw new Error("Aucun anneau valide détecté.");
  }

  const wktRings = cleanedRings
    .map((ring) => `(${ring.map(([x, y]) => `${x} ${y}`).join(", ")})`)
    .join(", ");

  const wktPolygon = `POLYGON(${wktRings})`;

  return `WITHIN(${geomField}, ${wktPolygon})`;
}

/**
 * Convertit un objet GeoJSON de type Polygon en WKT
 * @param geojson - Objet GeoJSON de type Polygon
 * @returns Chaîne WKT correspondante
 */
export const geoJSONPolygonToWKT = (geojson: any) => {
  if (
    geojson.type !== "Polygon" ||
    !Array.isArray(geojson.coordinates) ||
    geojson.coordinates.length === 0
  ) {
    throw new Error("Invalid GeoJSON Polygon object");
  }

  // Le GeoJSON peut contenir plusieurs anneaux (un extérieur + des trous)
  const rings = geojson.coordinates.map((ring: any) => {
    const coords = ring
      .map((coord: any) => `${coord[0]} ${coord[1]}`)
      .join(", ");
    return `(${coords})`;
  });

  return `POLYGON (${rings.join(", ")})`;
};

/**
 * Converts a GeoJSON Polygon object to a WKT MultiPolygon string.
 *
 * @param geojson - A GeoJSON object of type Polygon.
 * @throws Will throw an error if the GeoJSON object is not a valid Polygon.
 * @returns A WKT MultiPolygon string representing the given GeoJSON Polygon.
 */

export const geoJSONPolygonToMultiPolygonWKT = (geojson: any) => {
  if (
    geojson.type !== "Polygon" ||
    !Array.isArray(geojson.coordinates) ||
    geojson.coordinates.length === 0
  ) {
    throw new Error("Invalid GeoJSON Polygon object");
  }
  const polygons = [
    geojson.coordinates.map((ring: any) => {
      const coords = ring
        .map((coord: any) => `${coord[0]} ${coord[1]}`)
        .join(", ");
      return `(${coords})`;
    }),
  ];

  return `MULTIPOLYGON (${polygons
    .map((poly) => `(${poly.join(", ")})`)
    .join(", ")})`;
};

/**
 * Converts a GeoJSON Point object to a WKT Point string.
 *
 * @param geojson - A GeoJSON object of type Point.
 * @throws Will throw an error if the GeoJSON object is not a valid Point.
 * @returns A WKT Point string representing the given GeoJSON Point.
 */

export const geoJSONPointToWKT = (geojson: any) => {
  if (
    geojson.type !== "Point" ||
    !Array.isArray(geojson.coordinates) ||
    geojson.coordinates.length !== 2
  ) {
    console.log("Invalid");

    return "";
  }
  const [longitude, latitude] = geojson.coordinates;
  return `POINT (${longitude} ${latitude})`;
};

/**
 * Converts a GeoJSON LineString object to a WKT LineString string.
 *
 * @param geojson - A GeoJSON object of type LineString.
 * @throws Will throw an error if the GeoJSON object is not a valid LineString.
 * @returns A WKT LineString string representing the given GeoJSON LineString.
 */

export const geoJSONLineStringToWKT = (geojson: any) => {
  if (
    geojson.type !== "LineString" ||
    !Array.isArray(geojson.coordinates) ||
    geojson.coordinates.length < 2
  ) {
    throw new Error("Invalid GeoJSON LineString object");
  }

  const coords = geojson.coordinates
    .map((coord: any) => `${coord[0]} ${coord[1]}`)
    .join(", ");

  return `LINESTRING (${coords})`;
};

/**
 * Converts a GeoJSON object to a WKT string.
 *
 * @param geojson - A GeoJSON object of type Polygon, MultiPolygon, Point, or LineString.
 * @throws Will throw an error if the GeoJSON object is not a valid Polygon, MultiPolygon, Point, or LineString.
 * @returns A WKT string representing the given GeoJSON object.
 */
export const geoJSONToWKT = (geojson: any) => {
  if (geojson.type === "Polygon") {
    return geoJSONPolygonToWKT(geojson);
  } else if (geojson.type === "MultiPolygon") {
    return geoJSONPolygonToMultiPolygonWKT(geojson);
  } else if (geojson.type === "Point") {
    return geoJSONPointToWKT(geojson);
  } else if (geojson.type === "LineString") {
    return geoJSONLineStringToWKT(geojson);
  } else {
    throw new Error("Invalid GeoJSON object");
  }
};
