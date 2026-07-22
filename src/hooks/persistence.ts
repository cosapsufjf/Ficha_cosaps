import { useEffect, useRef } from "react";
import { UseFormReturn, Path } from "react-hook-form";

const STORAGE_KEY = "form_data_patient_evaluation_v1";

const SENSITIVE_FIELDS = [
  "cpf",
  "cns",
  "tel",
  "address",
  "neighborhood",
  "city",
  "uf"
] as const;

type SensitiveField = typeof SENSITIVE_FIELDS[number];

export function useFormPersistence<T extends Record<string, any>>(
  form: UseFormReturn<T>,
  storageKey: string = STORAGE_KEY
) {
  const { watch, reset, getValues, setValue } = form;
  const isMountedRef = useRef(false);
  const isSavingRef = useRef(false);

  function excludeSensitiveFields(values: T): Partial<T> {
    const safeValues = { ...values };
    
    (SENSITIVE_FIELDS as readonly string[]).forEach((field) => {
      delete (safeValues as any)[field];
    });
    
    return safeValues;
  }

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    try {
      const savedData = localStorage.getItem(storageKey);
      
      if (savedData) {
        const parsed = JSON.parse(savedData);
        
        Object.keys(parsed).forEach((key) => {
          if (!SENSITIVE_FIELDS.includes(key as SensitiveField)) {
            setValue(key as Path<T>, parsed[key], { 
              shouldValidate: false, 
              shouldDirty: false 
            });
          }
        });
      }
    } catch (error) {
      console.error("Erro ao recuperar formulário:", error);
      localStorage.removeItem(storageKey);
    }
    
    isMountedRef.current = true;
  }, []);

  useEffect(() => {
    if (!isMountedRef.current || typeof window === "undefined") return;
    
    const subscription = watch((_, { name }) => {
      if (isSavingRef.current) return;
      
      const timeoutId = setTimeout(() => {
        isSavingRef.current = true;
        
        try {
          const allValues = getValues();
          
          const safeValues = excludeSensitiveFields(allValues);
          
          if (Object.keys(safeValues).length > 0) {
            localStorage.setItem(storageKey, JSON.stringify(safeValues));
          } else {
            localStorage.removeItem(storageKey);
          }
        } catch (error) {
          console.error("Erro ao salvar formulário:", error);
        } finally {
          isSavingRef.current = false;
        }
      }, 1500);
      
      return () => clearTimeout(timeoutId);
    });
    
    return () => subscription.unsubscribe();
  }, [watch, getValues, storageKey]);

  const clearForm = () => {
    localStorage.removeItem(storageKey);
    reset();
  };

  const saveManually = () => {
    const allValues = getValues();
    const safeValues = excludeSensitiveFields(allValues);
    if (Object.keys(safeValues).length > 0) 
      localStorage.setItem(storageKey, JSON.stringify(safeValues));
    
  };

  return { clearForm, saveManually };
}