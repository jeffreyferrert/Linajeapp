import React, { useContext, useEffect, useState } from 'react';
import { animalInstance } from '@/api/loader';
import type {
  AnimalPostOut,
  AnimalPostIn,
  AnimalPatchIn,
  LineagePostOut,
  LineageData,
} from '@/api/domain/';

interface DataContextProps {
  forms: AnimalPostOut[];
  createForm: (form: AnimalPostIn) => Promise<void>;
  updateForm: (animalId: number, updatedForm: AnimalPatchIn) => Promise<void>;
  loading: boolean;
  error: Error | null;
  getAnimalById: (id: number) => Promise<AnimalPostOut | null>;
  getRosterLineages: () => Promise<LineagePostOut[] | null>;
  loadMoreAnimals: () => Promise<void>;
  updateAnimalLineage: (
    animalId: number,
    selectedLineages: string[],
    totalPercentage: number,
  ) => Promise<void>;
  loadingMore: boolean;
  hasMore: boolean;
}

const DataContext = React.createContext<DataContextProps | undefined>(
  undefined,
);

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext debe ser usado dentro de un DataProvider');
  }
  return context;
};

const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [forms, setForms] = useState<AnimalPostOut[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchAnimals = async (pageNumber: number) => {
    try {
      const data = await animalInstance.getAnimals(pageNumber);
      // Si es la primera página, reemplazamos los datos; si no, los agregamos
      if (pageNumber === 1) {
        setForms(data.items);
      } else {
        setForms((prevForms) => [...prevForms, ...data.items]);
      }
      // Verificamos si hay más páginas
      if (data.items.length === 0 || data.items.length > data.count) {
        setHasMore(false);
      }
    } catch (err) {
      console.error('Error al obtener animales', err);
      setError(err as Error);
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      await fetchAnimals(1);
      setLoading(false);
    };
    loadInitialData();
  }, []);

  const loadMoreAnimals = async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    const nextPage = page + 1;
    await fetchAnimals(nextPage);
    setPage(nextPage);
    setLoadingMore(false);
  };

  const createForm = async (form: AnimalPostIn) => {
    try {
      const newAnimal = await animalInstance.createAnimal(form);
      setForms((prevForms) => [newAnimal, ...prevForms]);
    } catch (err) {
      console.error('Error al crear animal', err);
    }
  };

  const updateForm = async (animalId: number, updatedForm: AnimalPatchIn) => {
    try {
      const updatedAnimal = await animalInstance.updateAnimal(
        animalId,
        updatedForm,
      );
      setForms((prevForms) =>
        prevForms.map((form) => (form.id === animalId ? updatedAnimal : form)),
      );
    } catch (err) {
      console.error('Error al actualizar animal', err);
    }
  };

  const getAnimalById = async (id: number): Promise<AnimalPostOut | null> => {
    setLoading(true);
    try {
      const animal = await animalInstance.getAnimal(id);
      return animal;
    } catch (err) {
      console.error('Error al obtener el animal por ID', err);
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getRosterLineages = async () => {
    setLoading(true);
    try {
      const lineages = await animalInstance.getLineages();
      return lineages;
    } catch (err) {
      console.error('Error al obtener los linajes', err);
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateAnimalLineage = async (
    animalId: number,
    selectedLineages: string[],
    totalPercentage: number,
  ): Promise<void> => {
    if (totalPercentage > 100) {
      throw new Error('El porcentaje total no puede exceder el 100%');
    }
    setLoading(true);
    // Mapea los linajes seleccionados a la estructura necesaria para el API
    const lineages: LineageData[] = selectedLineages.map((linaje) => ({
      lineage_id: parseInt(linaje), // Aquí se asume que el linaje es un ID, ajustar según tu estructura de datos
      percentage: 100 / selectedLineages.length, // Distribuye el porcentaje de manera uniforme, ajustar según necesidad
    }));
    try {
      // Llama al método de la API para actualizar el animal
      await animalInstance.updateAnimal(animalId, { lineages });
    } catch (err) {
      console.error('Error al actualizar linajes del animal', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <DataContext.Provider
      value={{
        forms,
        createForm,
        updateForm,
        loading,
        error,
        getAnimalById,
        getRosterLineages,
        loadMoreAnimals,
        loadingMore,
        updateAnimalLineage,
        hasMore,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
