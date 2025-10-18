"use client"
import React, { createContext, useContext } from "react";
import { useForm,UseFormReturn, FieldValues, DefaultValues } from "react-hook-form";

type FormContextType<T extends FieldValues> = UseFormReturn<T>

const FormContext = createContext<FormContextType<any> | null>(null);

export function useFormContextTyped<T extends FieldValues>() {
  const context = useContext(FormContext);
  if (!context) throw new Error("useFormContextTyped must be used within FormProvider");
  return context as UseFormReturn<T>;
}

export function FormProvider<T extends FieldValues>({ children }: { children: React.ReactNode }) {
  // Defina seus campos conforme o formulário
  const methods = useForm<T>({
    defaultValues: {
      date: new Date().toISOString().slice(0, 10),
    } as unknown as DefaultValues<T>,
  });

  return (
    <FormContext.Provider value={methods}>
      {children}
    </FormContext.Provider>
  );
}