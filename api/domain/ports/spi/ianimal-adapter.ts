import type {
  AnimalPostIn,
  AnimalPostOut,
  AnimalPatchIn,
  AnimalProfileImagesSchema,
  LineagePostIn,
  LineagePostOut,
  PagedAnimalPostOut,
  AnimalFamily,
} from '../../types/animal';

interface IAnimalAdapter {
  getAnimal(id: number): Promise<AnimalPostOut>;
  getAnimals(page?: number): Promise<PagedAnimalPostOut>;
  getFamily(id: number): Promise<AnimalFamily>;
  filterAnimals(
    page?: number,
    start_date?: string,
    end_date?: string,
    search?: string,
    lineages_id?: number[],
    // type?: number,
    // status?: number,
    sex?: 'M' | 'F',
    code?: string,
  ): Promise<PagedAnimalPostOut>;
  createAnimal(animal: AnimalPostIn): Promise<AnimalPostOut>;
  updateAnimal(animalId: number, animal: AnimalPatchIn): Promise<AnimalPostOut>;
  getAnimalImages(animalId: number): Promise<AnimalProfileImagesSchema[]>;
  uploadAnimalImage(animalId: number, files: FormData): Promise<void>;
  getLineages(): Promise<LineagePostOut[]>;
  createLineage(lineage: LineagePostIn): Promise<LineagePostOut>;
  getAnimalByCode(code: string): Promise<AnimalPostOut>;
}

export type { IAnimalAdapter };
