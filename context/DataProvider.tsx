import React, { useContext, useEffect, useState } from 'react';
import { animalInstance } from '@/api/loader';
import type { AnimalPostOut, AnimalPostIn, AnimalPatchIn } from '@/api/domain';

interface DataContextProps {
  forms: AnimalPostOut[];
  createForm: (form: AnimalPostIn) => Promise<void>;
  updateForm: (animalId: number, updatedForm: AnimalPatchIn) => Promise<void>;
  loading: boolean;
  error: Error | null;
  getAnimalById: (id: number) => Promise<AnimalPostOut | null>;
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

const DataProvider: React.FC = ({ children }) => {
  const [forms, setForms] = useState<AnimalPostOut[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchAnimals = async () => {
    setLoading(true);
    try {
      const data = await animalInstance.getAnimals();
      setForms(data.items);
    } catch (err) {
      console.error('Error al obtener animales', err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimals();
  }, []);

  const createForm = async (form: AnimalPostIn) => {
    try {
      const newAnimal = await animalInstance.createAnimal(form);
      setForms((prevForms) => [...prevForms, newAnimal]);
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

  return (
    <DataContext.Provider
      value={{ forms, createForm, updateForm, loading, error, getAnimalById }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
