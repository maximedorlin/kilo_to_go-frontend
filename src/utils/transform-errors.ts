export const transformError = (error: any): string => {
  // Cas où l'erreur est déjà une string
  if (typeof error === "string") return error;

  // Cas des erreurs HTTP/API typiques
  if (typeof error === "object" && error !== null) {
    // RTK Query/GraphQL error format
    if (error.data) {
      // Si data est une string
      if (typeof error.data === "string") return error.data;

      // Si data est un objet, on essaie d'en extraire les infos
      if (typeof error.data === "object") {
        // Essayer les clés communes
        const possibleKeys = ["error", "message", "detail", "title", "reason"];
        for (const key of possibleKeys) {
          if (error.data[key]) {
            if (typeof error.data[key] === "string") return error.data[key];
            if (Array.isArray(error.data[key]))
              return error.data[key].join(", ");
          }
        }

        // Sinon afficher toutes les valeurs string/array de l'objet
        const meaningfulValues = Object.entries(error.data)
          .filter(
            ([_, value]) => typeof value === "string" || Array.isArray(value)
          )
          .map(([key, value]) =>
            Array.isArray(value) ? `${key}: ${value.join(", ")}` : value
          );

        if (meaningfulValues.length > 0) return meaningfulValues.join(" | ");
      }
    }

    // Error standard JavaScript
    if (error.message) return error.message;

    // Axios error format
    if (error.response?.data) {
      const transformed = transformError(error.response.data);
      if (transformed !== "Unknown error") return transformed;
    }

    // Afficher les propriétés pertinentes
    const meaningfulProps = Object.entries(error)
      .filter(
        ([_key, value]) =>
          typeof value === "string" ||
          Array.isArray(value) ||
          (typeof value === "object" && value !== null)
      )
      .map(([key, value]) => {
        if (key === "data" || key === "response") return transformError(value);
        if (Array.isArray(value)) return `${key}: ${value.join(", ")}`;
        if (typeof value === "object") return transformError(value);
        return value;
      });

    if (meaningfulProps.length > 0) return meaningfulProps.join(" | ");
  }

  // Fallback générique
  return "Une erreur est survenue";
};
