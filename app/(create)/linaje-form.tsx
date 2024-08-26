import { Pressable, Text, View } from 'react-native';
import Checkbox from 'expo-checkbox';
import { useState } from 'react';
import CustomButton from '@/components/CustomButton';

const linajes = [
  'Jumper',
  'Pura Sangre',
  'Cuarto de Milla',
  'Criollo',
  'Albany',
  'Hatch',
];

const LinajeForm = ({ form, setForm }) => {
  const [selectedLinajes, setSelectedLinajes] = useState(form.linajes || []);
  const [assignLinaje, setAssignLinaje] = useState(false);
  const [totalPercentage, setTotalPercentage] = useState(0);

  const handleCheckboxChange = (linaje) => {
    const updatedLinajes = selectedLinajes.includes(linaje)
      ? selectedLinajes.filter((item) => item !== linaje)
      : [...selectedLinajes, linaje];
    setSelectedLinajes(updatedLinajes);
  };

  const handleAssignLinaje = () => {
    setAssignLinaje(true);
  };

  console.log(selectedLinajes);

  if (assignLinaje) {
    return (
      <View>
        <View className={'bg-white p-5 rounded-xl my-5'}>
          {selectedLinajes.map((linaje, index) => (
            <View
              key={index}
              className={'flex-row items-center justify-between mt-2'}
            >
              <Pressable
                className={
                  'bg-yellow-300 w-10 h-12 items-center justify-center '
                }
              >
                <Text>-</Text>
              </Pressable>
              <Text className={'w-40 h-12 bg-purple-600 '}>
                <Text className={'text-center '}>{linaje}</Text>
              </Text>
              <Pressable
                className={
                  'bg-yellow-300 w-10 h-12 items-center justify-center '
                }
              >
                <Text>+</Text>
              </Pressable>
            </View>
          ))}

          <Text
            className={'text-xl font-bold ml-auto'}
            style={{ color: totalPercentage > 100 ? 'red' : 'black' }}
          >
            Total: {totalPercentage}%
          </Text>
        </View>

        <CustomButton
          title={'Siguiente Animal'}
          handlePress={handleAssignLinaje}
          containerStyles={`${selectedLinajes.length === 0 ? 'bg-gray-300' : 'bg-primary'} w-80 mx-auto mt-0`}
          textStyles={'text-white'}
        />
      </View>
    );
  }

  return (
    <View>
      <View className={'bg-white p-5 rounded-xl my-5'}>
        <Text className={'text-base font-bold underline'}>Linaje</Text>

        {linajes.map((linaje, index) => (
          <View
            key={index}
            className={'flex-row items-center justify-between mt-2'}
          >
            <Text className={'ml-2'}>{linaje}</Text>
            <Checkbox
              value={selectedLinajes.includes(linaje)}
              onValueChange={() => handleCheckboxChange(linaje)}
            />
          </View>
        ))}
      </View>

      <CustomButton
        title={'Asignar Linaje'}
        handlePress={handleAssignLinaje}
        containerStyles={`${selectedLinajes.length === 0 ? 'bg-gray-300' : 'bg-primary'} w-80 mx-auto mt-0`}
        textStyles={'text-white'}
      />
    </View>
  );
};

export default LinajeForm;
