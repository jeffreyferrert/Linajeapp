import React from 'react';
import { Modal, View, Text, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import { AntDesign } from '@expo/vector-icons';

interface CustomFilterModalProps {
  visible: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const CustomFilterModal: React.FC<CustomFilterModalProps> = ({
  visible,
  title,
  onClose,
  children,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={{ flex: 1 }}>
        {/* Fondo difuminado */}
        <BlurView
          intensity={70}
          tint="dark"
          style={{ position: 'absolute', width: '100%', height: '100%' }}
        />

        <View className="flex-1 justify-center items-center">
          <View className="bg-white p-6 rounded-lg w-80 shadow-lg">
            <View className="flex-row justify-between">
              <Text className="text-lg font-semibold mb-4">{title}</Text>
              <Pressable onPress={onClose}>
                <AntDesign name="close" size={24} color="black" />
              </Pressable>
            </View>
            {children}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomFilterModal;
