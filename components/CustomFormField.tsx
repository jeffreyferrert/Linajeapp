import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import { useState, useRef } from 'react';
import { Entypo } from '@expo/vector-icons';

const icons = {
  eye: <Entypo name="eye" size={24} color="black" />,
  eyeHide: <Entypo name="eye-with-line" size={24} color="black" />,
};

type CustomFormFieldProps = {
  title: string;
  placeholder: string;
  value: string;
  handleChange: (value: string) => void;
  otherStyles?: string;
  type?: string;
  readOnly?: boolean; // Añadir prop para readOnly
};
const CustomFormField = ({
  title,
  placeholder,
  value,
  handleChange,
  otherStyles,
  type = 'text',
  readOnly = false,
}: CustomFormFieldProps) => {
  const [isFocus, setIsFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<TextInput>(null);

  return (
    <TouchableWithoutFeedback
      onPress={() => !readOnly && inputRef.current?.focus()}
    >
      <View
        className={`w-80 bg-gray-200 h-14 px-4 rounded-lg mx-auto ${
          readOnly ? 'border-2 border-gray-400' : ''
        } flex flex-row  ${otherStyles}`}
      >
        {(isFocus || value !== '') && (
          <Text className="absolute top-0 px-4 py-1 text-xs text-gray-500 font-semibold">
            {title}
          </Text>
        )}

        <TextInput
          ref={inputRef}
          className={isFocus || value !== '' ? 'h-16' : 'h-14'}
          value={value}
          placeholder={isFocus ? '' : placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChange}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          secureTextEntry={type === 'password' && !showPassword}
          editable={!readOnly} // Deshabilitar si es readOnly
        />

        {type === 'password' && !readOnly && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className={'ml-auto my-auto'}
          >
            {showPassword ? icons.eyeHide : icons.eye}
          </TouchableOpacity>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CustomFormField;
