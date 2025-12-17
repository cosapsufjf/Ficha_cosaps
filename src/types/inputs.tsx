export interface Inputs{
    //Pacient data
        date : any
        pacient_name: any
        dn:any
        cns:any
        cpf:any
        adress:any
        neighborhood:any
        city:any
        uf:any
        tel:any
        study:any
        Ocupation:any
        Civil_status:any
        number_of_children:any
        Vaccination:any
        Vaccination_details:any
        salary:any
        personal_medics:any
    //Obesity related info
        obesity_complain:any
        gain_tendency:[] | null
        gain_tendency_str:any
        gain_motive:[] | null
        gain_motive_str:any
        treatments:[] | null
        cirurgies_history:any
        medications_history:any
        min_life_weight:any
        max_life_weight:any
        medications:any
        cirurgies:any
        comorbities:[] | null
        comorbities_str:[] | null
        family_history:any
    //Physical avaliation
        weight:any
        height:any
        IMC:any
        PA:any
        Glicemy:any
        waist_circumference:any
        hip_circumference:any
        
    //Comportamental analysis data
        Comportamental_analysis: [] | null
        eat_yesterday:[] | null
        eat_breakfast : any
        eat_snack : any
        eat_lunch : any
        eat_evening_snack: any
        eat_dessert : any
        eat_dinner : any
        meal_place:[] | null
        meal_pace:any
        hunger:string  | null
        mastigation:string  | null
        hungry_period:any
        meals_in_a_day:[] | null
        food_thinking:string  | null
        compulsory_food:string  | null
        TA:string  | null
        
    //PHQ
        PHQ_2_1:any
        PHQ_2_2:any

        PHQ_9_1:any
        PHQ_9_2:any
        PHQ_9_3:any
        PHQ_9_4:any
        PHQ_9_5:any
        PHQ_9_6:any
        PHQ_9_7:any
        PHQ_9_8:any
        PHQ_9_9:any
    // GAD
        GAD_2_1:any
        GAD_2_2:any
        
        GAD_7_1:any
        GAD_7_2:any
        GAD_7_3:any
        GAD_7_4:any
        GAD_7_5:any
        GAD_7_6:any
        GAD_7_7:any
    //Sleep quality
        sleep_schedule:any
        sleep_quality:any
        sleep_disturby:any
        sleep_observations:any
    //Phisycal activity
        PACE:any
        IPAQ:any
        respiratory_system:any 
        gastrointestinal_system:any
        renal_system:any
        neurological_system:any
        osteoarticular_system:any
    //Pain evaluation
        muscular_pain:any
        pain_origin:any
        fracture:any
        team_analisys:any
        session_avaliator:any
    };
    