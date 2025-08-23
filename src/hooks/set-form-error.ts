"use client";
import { isDataError } from "@/lib/error-handler";
import { UseFormReturn, FieldValues, Path } from "react-hook-form";

export function useSetFormError<T extends FieldValues>(form: UseFormReturn<T>) {
  const setFormError = (error: unknown): void => {
    if (error && typeof error == "object" && "data" in error) {
      const errData = (error as { data?: unknown }).data;

      if (
        typeof errData === "object" &&
        errData !== null &&
        isDataError(errData)
      ) {
        // Appliquer les erreurs de validation au formulaire
        Object.entries(errData).forEach(([key, errors]) => {
          if (Object.keys(form.getValues()).includes(key)) {
            form.setError(
              key as Path<T>, // Utilisation de Path<T> pour garantir la compatibilité des types
              {
                type: "manual", // Type d'erreur
                message: errors.join(", "), // Combine les messages d'erreur
              }
            );
          }
        });
      } else {
        console.error("Erreur inattendue avec des données :", errData);
      }
    }
  };

  return { setFormError };
}
