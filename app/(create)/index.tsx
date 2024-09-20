import { ScrollView, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '@/components/CustomButton';
import { router } from 'expo-router';
import RegisterAnimal from '@/app/(create)/register-animal';
import RegisterLinaje from '@/app/(create)/register-linaje';
import AssignPercentages from '@/app/(create)/assign-percentages';
import CustomHeaderSteps from '@/components/CustomHeaderSteps';
import { useState, useEffect } from 'react';
import type { Brood } from '@/types/animalExtraTypes';
import SummaryBroods from './sumary-broods';
import type { AnimalPostIn, LineagePostOut } from '@/api/domain';
import { useAutoAPI } from '@/hooks/useAutoAPI';
import { animalInstance } from '@/api/loader';

const Create = () => {
  const [step, setStep] = useState(1);
  const [buttonTitle, setButtonTitle] = useState('Continuar');
  const [serverLineajes, setServerLineages] = useState<LineagePostOut[]>([]);
  const [enableButton, setEnableButton] = useState(false);
  const [skipStepThree, setSkipStepThree] = useState(false);
  const [broods, setBroods] = useState<Brood[]>([
    {
      father_code: '',
      mother_code: '',
      birthdate: '',
      offsprings: [
        {
          code: '',
          sex: '',
        },
      ],
      lineages: [
        {
          id: 0,
          name: '',
          animal_type: 1,
          created_at: '',
          updated_at: '',
          owner_id: 0,
          percentage: 0,
        },
      ],
    },
  ]);
  const [fractions, setFractions] = useState(
    broods.map((brood) => brood.lineages.map(() => 0)),
  );
  const { loading, results, getLineages, createAnimal } =
    useAutoAPI(animalInstance);

  // Ejecuta la llamada API para obtener linajes
  useEffect(() => {
    getLineages();
  }, [getLineages]);

  // Actualiza el estado de los linajes desde el resultado del API
  useEffect(() => {
    setServerLineages(results?.getLineages || []);
  }, [results.getLineages]);

  // Cambia el título del botón cuando esté cargando
  useEffect(() => {
    if (loading) {
      setButtonTitle('Cargando...');
    } else if (step === 4 && loading) {
      setButtonTitle('Guardando...');
    } else {
      setButtonTitle(step === 4 ? 'Guardar' : 'Continuar');
    }
    if (step === 3) {
      // Limpiar los lineajes en blanco
      const newBroods = [...broods];
      newBroods.forEach((brood) => {
        brood.lineages = brood.lineages.filter((linaje) => linaje.id !== 0);
      });
      setBroods(newBroods);
      // Detectar si no hay ningún linaje seleccionado y saltar al paso 4
      let allZero = true;
      broods.forEach((brood) => {
        console.log(brood.lineages);
        if (brood.lineages.length > 0) {
          allZero = false;
        }
      });
      if (skipStepThree && allZero) {
        setSkipStepThree(false);
        setStep(step - 1);
        return;
      }
      if (allZero) {
        setSkipStepThree(true);
        setStep(step + 1);
      }
    }
  }, [loading, step]);

  const handleContinue = async () => {
    if (step === 2) {
      setFractions(broods.map((brood) => brood.lineages.map(() => 0)));
    }
    if (step < 4) {
      setStep(step + 1);
    } else if (step === 4) {
      // Guardar los datos
      const animalsData: AnimalPostIn[] = broods.flatMap((brood) => {
        return brood.offsprings.map((offspring) => ({
          code: offspring.code,
          sex: offspring.sex === 'male' ? 'M' : 'F',
          birthdate: brood.birthdate,
          father_id: brood.father_id,
          mother_id: brood.mother_id,
          lineages: brood.lineages.map((linaje) => ({
            lineage_id: linaje.id,
            percentage: linaje.percentage * 100,
          })),
        }));
      });

      setButtonTitle('Guardando...');

      // Crear los animales en paralelo y esperar a que todos terminen
      Promise.all(
        animalsData.map((animal) =>
          createAnimal(animal).catch((error) => {
            Alert.alert('Error', 'Hubo un error al guardar los animales');
            console.error('Error al guardar los animales:', error.message);
            throw error; // Lanzar el error para que Promise.all lo maneje
          }),
        ),
      )
        .then(() => {
          router.push('../(home)');
        })
        .catch((error) => {
          console.error(
            'Error al completar la creación de los animales:',
            error,
          );
          // Aquí puedes manejar cualquier acción adicional en caso de error.
        })
        .finally(() => {
          setButtonTitle('Guardar');
        });
    } else {
      router.push('../(home)');
    }
  };

  return (
    <SafeAreaView className={'bg-gray-200 h-full py-10'}>
      <ScrollView className={'px-4'}>
        <CustomHeaderSteps
          current_step={step}
          set_current_step={setStep}
          showBackArrow={true}
        />

        {step === 1 && (
          <RegisterAnimal
            broods={broods}
            setBroods={setBroods}
            enableButton={enableButton}
            setEnableButton={setEnableButton}
          />
        )}
        {step === 2 && (
          <RegisterLinaje
            broods={broods}
            setBroods={setBroods}
            serverLineages={serverLineajes}
          />
        )}
        {step === 3 && (
          <AssignPercentages
            broods={broods}
            setBroods={setBroods}
            fractions={fractions}
            setFractions={setFractions}
          />
        )}
        {step === 4 && <SummaryBroods broods={broods} />}
      </ScrollView>

      <View className="absolute bottom-0 w-full h-[100px] justify-center shadow bg-white rounded-tl-xl rounded-tr-xl">
        <CustomButton
          title={buttonTitle}
          handlePress={handleContinue}
          containerStyles="w-80 mx-auto mb-1"
          textStyles="text-white"
          disabled={!enableButton}
        />
      </View>
    </SafeAreaView>
  );
};

export default Create;
