import { create } from 'zustand';
import { animalInstance } from '@/api/loader';
import type { LineagePostOut, LineageData } from '@/api/domain/';

interface AnimalState {
  loading: boolean;
  error: Error | null;
  getRosterLineages: () => Promise<LineagePostOut[] | null>;
  updateAnimalLineage: (
    animalId: number,
    selectedLineages: string[],
    totalPercentage: number,
  ) => Promise<void>;
}

const useAnimalStore = create<AnimalState>((set, get) => ({
  loading: false,
  error: null,
  getRosterLineages: async () => {
    set({ loading: true });
    try {
      const lineages = await animalInstance.getLineages();
      return lineages;
    } catch (err) {
      console.error('Error al obtener los linajes', err);
      set({ error: err as Error });
      return null;
    } finally {
      set({ loading: false });
    }
  },

  updateAnimalLineage: async (
    animalId: number,
    selectedLineages: string[],
    totalPercentage: number,
  ): Promise<void> => {
    if (totalPercentage > 100) {
      throw new Error('El porcentaje total no puede exceder el 100%');
    }
    set({ loading: true });
    const lineages: LineageData[] = selectedLineages.map((linaje) => ({
      lineage_id: parseInt(linaje),
      percentage: 100 / selectedLineages.length,
    }));
    try {
      await animalInstance.updateAnimal(animalId, { lineages });
    } catch (err) {
      console.error('Error al actualizar linajes del animal', err);
      throw err;
    } finally {
      set({ loading: false });
    }
  },
}));

export default useAnimalStore;
