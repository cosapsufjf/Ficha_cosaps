"use client"
import React, { createContext, useContext} from "react";
import { useForm,UseFormReturn, FieldValues, DefaultValues } from "react-hook-form";
import { actual_Date } from "@/utils/utils";
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
      date: actual_Date(),
      pacient_name: "",
      dn: "",
      cns: "",
      cpf: "",
      adress: "",
      neighborhood: "",
      city: "",
      uf: "",
      salary: null,
      tel: "",
      study: "",
      obesity_complain: "",
      gain_tendency: null,
      gain_tendency_str: "",
      gain_motive: null,
      gain_motive_str: "",
      treatments: null,
      cirurgies_history: "",
      medications_history: "",
      min_life_weight: "",
      max_life_weight: "",
      medications: "",
      cirurgies: "",
      comorbities: null,
      comorbities_str: null,
      family_history: "",
      weight: "",
      height: "",
      IMC: "",
      PA: "",
      Glicemy: "",
      waist_circumference: "",
      hip_circumference: "",
      Comportamental_analysis: null,
      eat_yesterday: null,
      meal_place: null,
      meal_pace: null,
      hunger: null,
      mastigation: null,
      hungry_period: null,
      meals_in_a_day: null,
      food_thinking: null,
      compulsory_food: null,
      TA: "",
      PHQ_2_1: null,
      PHQ_2_2: null,
      PHQ_9_1: null,
      PHQ_9_2: null,
      PHQ_9_3: null,
      PHQ_9_4: null,
      PHQ_9_5: null,
      PHQ_9_6: null,
      PHQ_9_7: null,
      PHQ_9_8: null,
      PHQ_9_9: null,
      GAD_2_1: null,
      GAD_2_2: null,
      GAD_7_1: null,
      GAD_7_2: null,
      GAD_7_3: null,
      GAD_7_4: null,
      GAD_7_5: null,
      GAD_7_6: null,
      GAD_7_7: null,
      sleep_schedule: "",
      sleep_quality: null,
      sleep_disturby: "",
      sleep_observations: "",
      PACE: "",
      IPAQ: null,
      respiratory_system: "",
      gastrointestinal_system: "",
      renal_system: "",
      neurological_system: "",
      osteoarticular_system: "",
      muscular_pain: "",
      pain_origin: "",
      fracture: "",
      team_analisys: "",
      session_avaliator: ""
    } as unknown as DefaultValues<T>,
  });

  return (
    <FormContext.Provider value={methods}>
      {children}
    </FormContext.Provider>
  );
}