import proj4 from "proj4";

proj4.defs("EPSG:32632", "+proj=utm +zone=32 +datum=WGS84 +units=m +no_defs");

export function generateInsertXML(
  namespace: string,
  typename: string,
  srs: string,
  properties: Record<string, string>,
  coordinates: [number, number]
): string {
  const [x, y] = coordinates;

  const xmlParts = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<wfs:Transaction service="WFS" version="2.0.0"`,
    `  xmlns:wfs="http://www.opengis.net/wfs/2.0"`,
    `  xmlns:gml="http://www.opengis.net/gml/3.2"`,
    `  xmlns:${namespace}="http://www.opengis.net/${namespace}"`,
    `  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"`,
    `  xsi:schemaLocation="`,
    `    http://www.opengis.net/wfs/2.0 http://schemas.opengis.net/wfs/2.0/wfs.xsd`,
    `    http://www.opengis.net/gml/3.2 http://schemas.opengis.net/gml/3.2.1/gml.xsd">`,
    `  <wfs:Insert>`,
    `    <${namespace}:${typename}>`,
    `      <${namespace}:geom>`,
    `        <gml:Point srsName="${srs}">`,
    `          <gml:pos>${x} ${y}</gml:pos>`,
    `        </gml:Point>`,
    `      </${namespace}:geom>`,
  ];

  for (const [key, value] of Object.entries(properties)) {
    xmlParts.push(`      <${namespace}:${key}>${value}</${namespace}:${key}>`);
  }

  xmlParts.push(
    `    </${namespace}:${typename}>`,
    `  </wfs:Insert>`,
    `</wfs:Transaction>`
  );

  return xmlParts.join("\n");
}

