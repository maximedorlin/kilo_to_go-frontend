SELECT DISTINCT
s.id AS streetlamp_id,
s.*
FROM
eclairage_public_streetlamp AS s
JOIN eclairage_public_observationsheet_streetlamps AS link_ls
ON link_ls.streetlamp_id = s.id
JOIN eclairage_public_observationsheet AS obs
ON obs.id = link_ls.observationsheet_id
JOIN eclairage_public_needsheet_observation_sheet AS link_no
ON link_no.observationsheet_id = obs.id
JOIN eclairage_public_intervention AS i
ON i.need_sheet_id = link_no.needsheet_id

SELECT dp.*, ST_Collect(he.geom) AS geom
FROM public.sanitary_dropdownprogram dp
JOIN public.sanitary_healthestablishment he 
  ON he.id = dp.health_establishment_id
GROUP BY dp.id
ORDER BY dp.created_at


SELECT
int.*,
ST_Collect(she.geom) AS geom
FROM
sanitary_intervention int
JOIN
sanitary_dropdownprogram ddp ON ddp.id = int.drop_down_program_id
JOIN
sanitary_healthestablishment she ON she.id = ddp.health_establishment_id
GROUP BY
int.id
ORDER BY
int.id
