import { IAnimalAPI } from './ports/api/animal';
import { IAnimalAdapter } from './ports/spi/ianimal-adapter';
import {
  AnimalPostIn,
  AnimalPostOut,
  AnimalPatchIn,
  AnimalProfileImagesSchema,
  LineagePostIn,
  LineagePostOut,
  PagedAnimalPostOut,
} from './types/animal';

class AnimalAPI implements IAnimalAPI {
  constructor(private animalAdapter: IAnimalAdapter) {}

  async getAnimals(page?: number): Promise<PagedAnimalPostOut> {
    return this.animalAdapter.getAnimals(page);
  }

  async createAnimal(animal: AnimalPostIn): Promise<AnimalPostOut> {
    return this.animalAdapter.createAnimal(animal);
  }

  async updateAnimal(
    animalId: number,
    animal: AnimalPatchIn,
  ): Promise<AnimalPostOut> {
    return this.animalAdapter.updateAnimal(animalId, animal);
  }

  async getAnimalImages(
    animalId: number,
  ): Promise<AnimalProfileImagesSchema[]> {
    return this.animalAdapter.getAnimalImages(animalId);
  }

  async uploadAnimalImage(animalId: number, files: FormData): Promise<void> {
    return this.animalAdapter.uploadAnimalImage(animalId, files);
  }

  async getLineages(): Promise<LineagePostOut[]> {
    return this.animalAdapter.getLineages();
  }

  async createLineage(lineage: LineagePostIn): Promise<LineagePostOut> {
    return this.animalAdapter.createLineage(lineage);
  }

  async getAnimalByCode(code: string): Promise<AnimalPostOut> {
    return this.animalAdapter.getAnimalByCode(code);
  }
}

export { AnimalAPI };
