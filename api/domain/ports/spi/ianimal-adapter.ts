import type {
  AnimalPostIn,
  AnimalPostOut,
  AnimalPatchIn,
  AnimalProfileImagesSchema,
  LineagePostIn,
  LineagePostOut,
  PagedAnimalPostOut,
} from '../../types/animal';

interface IAnimalAdapter {
  getAnimal(id: number): Promise<AnimalPostOut>;
  getAnimals(page?: number): Promise<PagedAnimalPostOut>;
  createAnimal(animal: AnimalPostIn): Promise<AnimalPostOut>;
  updateAnimal(animalId: number, animal: AnimalPatchIn): Promise<AnimalPostOut>;
  getAnimalImages(animalId: number): Promise<AnimalProfileImagesSchema[]>;
  uploadAnimalImage(animalId: number, files: FormData): Promise<void>;
  getLineages(): Promise<LineagePostOut[]>;
  createLineage(lineage: LineagePostIn): Promise<LineagePostOut>;
  getAnimalByCode(code: string): Promise<AnimalPostOut>;
}

export type { IAnimalAdapter };
