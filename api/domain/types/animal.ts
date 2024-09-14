type AnimalPostIn = {
  code: string;
  name?: string | null;
  mother_id?: number | null;
  father_id?: number | null;
  sex: string;
  birthdate: string;
  weight?: number | null;
  status?: string;
  lineages?: LineageData[];
};

type AnimalPatchIn = {
  lineages?: LineageData[] | null;
  code?: string | null;
  name?: string | null;
  mother_id?: number | null;
  father_id?: number | null;
  sex?: string | null;
  birthdate?: string | null;
  weight?: number | null;
  status?: string | null;
};

type AnimalPostOut = {
  code: string;
  name?: string | null;
  mother?: number | null;
  father?: number | null;
  sex: string;
  birthdate: string;
  weight?: number | null;
  status: string;
  id: number;
  created_at: string;
  updated_at: string;
  owner_id: number;
  thumbnail_profile_image_url?: string | null;
  lineages: LineageData[] | null;
};

type AnimalProfileImagesSchema = {
  image_url: string;
  id?: number | null;
  description?: string | null;
};

type LineagePostIn = {
  name: string;
  animal_type_id: number;
};

type LineagePostOut = {
  name: string;
  animal_type: number;
  id: number;
  created_at: string;
  updated_at: string;
  owner_id: number;
};

type LineageData = {
  lineage_id: number;
  percentage: number;
};

type PagedAnimalPostOut = {
  items: AnimalPostOut[];
  count: number;
};

export type {
  AnimalPostIn,
  AnimalPostOut,
  AnimalPatchIn,
  AnimalProfileImagesSchema,
  LineagePostIn,
  LineagePostOut,
  PagedAnimalPostOut,
};
