type Brood = {
  father_code: string;
  mother_code: string;
  father_id?: number;
  mother_id?: number;
  birthdate: string;
  offsprings: {
    code: string;
    sex: string;
  }[];
  lineages: {
    name: string;
    animal_type: number;
    id: number;
    created_at: string;
    updated_at: string;
    owner_id: number;
    percentage: number;
  }[];
  isSaved?: boolean;
};

export type { Brood };
