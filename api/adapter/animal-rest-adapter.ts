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
  AnimalFamily,
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

  async getFamily(id: number): Promise<AnimalFamily> {
    const response = await this.httpClient.get(
      `animals/family/${id}`,
      null,
      true,
    );
    return response.data;
  }

  async filterAnimals(
    page: number = 1,
    start_date: string,
    end_date: string,
    search: string,
    lineages_id: number[],
    sex: 'M' | 'F',
  ): Promise<PagedAnimalPostOut> {
    const response = await this.httpClient.get('animals/filter-animals/', {
      page,
      start_date,
      end_date,
      search,
      lineages_id,
      sex,
    });
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
    const response = await this.httpClient.get(
      'animals/animal',
      { code },
      true,
    );
    return response.data;
  }
}

export { AnimalRestAdapter };
