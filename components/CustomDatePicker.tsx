import { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Entypo } from '@expo/vector-icons';

const icons = {
  calendar: <Entypo name="calendar" size={24} color="black" />,
};

type CustomDatePickerProps = {
  title: string;
  value: string;
  handleChange: (value: string) => void;
  otherStyles?: string;
};

const CustomDatePicker = ({
  title,
  value,
  handleChange,
  otherStyles,
}: CustomDatePickerProps) => {
  const [isFocus, setIsFocus] = useState(false);
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate: any) => {
    setShow(Platform.OS === 'ios'); // En iOS el DateTimePicker siempre muestra un modal, en Android solo en eventos de toque.
    if (selectedDate) {
      const currentDate = selectedDate || new Date();
      const formattedDate = currentDate.toISOString().split('T')[0]; // Formato AAAA-MM-DD
      handleChange(formattedDate);
      setIsFocus(true);
    }
  };

  return (
    <View
      className={`w-80 bg-gray-200 h-14 px-4 rounded-lg mx-auto flex flex-row items-center ${otherStyles}`}
    >
      {(isFocus || value !== '') && (
        <Text
          className={
            'absolute top-0 px-4 py-1 text-xs text-gray-500 font-semibold'
          }
        >
          {title}
        </Text>
      )}

      <TouchableOpacity
        onPress={() => setShow(true)}
        className={'flex flex-row items-center w-full'}
      >
        <Text
          className={`flex-grow ${value ? 'text-black' : 'text-gray-500'} mt-2`}
        >
          {value || 'Seleccionar fecha'}
        </Text>
        {icons.calendar}
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={value ? new Date(value) : new Date()}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default CustomDatePicker;
