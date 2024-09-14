import { IAnimalAdapter } from '../domain';
import { HttpClient, httpClient } from './http-client';
import {
  AnimalPostIn,
  AnimalPostOut,
  AnimalPatchIn,
  AnimalProfileImagesSchema,
  LineagePostIn,
  LineagePostOut,
  PagedAnimalPostOut,
} from '../domain/types/animal';

class AnimalRestAdapter implements IAnimalAdapter {
  private httpClient: HttpClient = httpClient;

  async getAnimal(id: number): Promise<AnimalPostOut> {
    const response = await this.httpClient.get(`animals/${id}/`, null, true);
    return response.data;
  }

  async getAnimals(page: number = 1): Promise<PagedAnimalPostOut> {
    const response = await this.httpClient.get('animals/', { page }, true);
    return response.data;
  }

  async createAnimal(animal: AnimalPostIn): Promise<AnimalPostOut> {
    const response = await this.httpClient.post('animals/', animal, true);
    return response.data;
  }

  async updateAnimal(
    animalId: number,
    animal: AnimalPatchIn,
  ): Promise<AnimalPostOut> {
    const response = await this.httpClient.patch(
      `animals/${animalId}/`,
      animal,
      true,
    );
    return response.data;
  }

  async getAnimalImages(
    animalId: number,
  ): Promise<AnimalProfileImagesSchema[]> {
    const response = await this.httpClient.get(
      `animals/${animalId}/profile-images/`,
      null,
      true,
    );
    return response.data;
  }

  async uploadAnimalImage(animalId: number, files: FormData): Promise<void> {
    await this.httpClient.post(
      `animals/${animalId}/profile-images/`,
      files,
      true,
    );
  }

  async getLineages(): Promise<LineagePostOut[]> {
    const response = await this.httpClient.get('animals/lineages', null, true);
    return response.data;
  }

  async createLineage(lineage: LineagePostIn): Promise<LineagePostOut> {
    const response = await this.httpClient.post(
      'animals/lineages',
      lineage,
      true,
    );
    return response.data;
  }

  async getAnimalByCode(code: string): Promise<AnimalPostOut> {
    console.log('code', code);
    const response = await this.httpClient.get(
      'animals/animal',
      { code },
      true,
    );
    return response.data;
  }
}

export { AnimalRestAdapter };
