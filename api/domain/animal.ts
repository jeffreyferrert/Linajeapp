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
  AnimalFamily,
} from './types/animal';

class AnimalAPI implements IAnimalAPI {
  constructor(private animalAdapter: IAnimalAdapter) {}

  async getAnimal(id: number): Promise<AnimalPostOut> {
    return await this.animalAdapter.getAnimal(id);
  }
  async getAnimals(page?: number): Promise<PagedAnimalPostOut> {
    return await this.animalAdapter.getAnimals(page);
  }

  async getFamily(id: number): Promise<AnimalFamily> {
    return await this.animalAdapter.getFamily(id);
  }

  async filterAnimals(
    page?: number,
    start_date?: string,
    end_date?: string,
    search?: string,
    lineages_id?: number[],
    sex?: 'male' | 'female' | 'M' | 'F',
  ): Promise<PagedAnimalPostOut> {
    if ((start_date && !end_date) || (!start_date && end_date)) {
      throw new Error('Start date and end date must be provided together');
    }
    if (sex === 'male') sex = 'M';
    if (sex === 'female') sex = 'F';
    if (start_date === '' || end_date === '') {
      start_date = undefined;
      end_date = undefined;
    }
    return await this.animalAdapter.filterAnimals(
      page,
      start_date,
      end_date,
      search,
      lineages_id,
      sex,
    );
  }

  async createAnimal(animal: AnimalPostIn): Promise<AnimalPostOut> {
    return await this.animalAdapter.createAnimal(animal);
  }

  async updateAnimal(
    animalId: number,
    animal: AnimalPatchIn,
  ): Promise<AnimalPostOut> {
    return await this.animalAdapter.updateAnimal(animalId, animal);
  }

  async getAnimalImages(
    animalId: number,
  ): Promise<AnimalProfileImagesSchema[]> {
    return await this.animalAdapter.getAnimalImages(animalId);
  }

  async uploadAnimalImage(animalId: number, files: FormData): Promise<void> {
    return await this.animalAdapter.uploadAnimalImage(animalId, files);
  }

  async getLineages(): Promise<LineagePostOut[]> {
    return await this.animalAdapter.getLineages();
  }

  async createLineage(lineage: LineagePostIn): Promise<LineagePostOut> {
    return await this.animalAdapter.createLineage(lineage);
  }

  async getAnimalByCode(code: string): Promise<AnimalPostOut> {
    return await this.animalAdapter.getAnimalByCode(code);
  }
}

export { AnimalAPI };
