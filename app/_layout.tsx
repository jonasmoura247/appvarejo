import React from 'react';
import { Stack, useNavigation } from 'expo-router';
import CustomHeader from '@/Components/CustomHeader';
import { BottomSheetModalProvider, TouchableOpacity } from '@gorhom/bottom-sheet';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, Image, SectionList } from 'react-native';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function RootLayoutNav() {
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    roundButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <BottomSheetModalProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            header: () => <CustomHeader />,
          }}
        />
        <Stack.Screen
          name="(modal)/filter"
          options={{
            presentation: 'modal',
            headerTitle: 'Filtro',
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: Colors.lightGrey,
            },
            headerLeft: () => (
              <TouchableOpacity onPress={() => {
                navigation.goBack();
              }}>
                <Ionicons name="close-outline" size={30} color={Colors.primary} />
              </TouchableOpacity>
            ),
          }}
        />

        <Stack.Screen
          name="(modal)/location-search"
          options={{
            presentation: 'fullScreenModal',
            headerTitle: 'Localização',
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: Colors.lightGrey,
            },
            headerLeft: () => (
              <TouchableOpacity onPress={() => {
                navigation.goBack();
              }}>
                <Ionicons name="close-outline" size={30} color={Colors.primary} />
              </TouchableOpacity>
            ),
          }}
        />

        <Stack.Screen
          name="(modal)/dish"
          options={{
            presentation: 'modal',
            headerTitle: '',
            headerTransparent: true,
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.roundButton}>
                <Ionicons name="close-outline" size={24} color={Colors.primary} />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen name="(modal)/basket"
          options={{
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}>
                <Ionicons name="arrow-back" size={28} color={Colors.primary} />
              </TouchableOpacity>
            ),
          }}
        />

        <Stack.Screen
          name="(modal)/login"
          options={{
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}>
                <Ionicons name="arrow-back" size={28} color={Colors.primary} />
              </TouchableOpacity>
            ),
          }}
        />

        <Stack.Screen
          name="(modal)/register"
          options={{
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}>
                <Ionicons name="arrow-back" size={28} color={Colors.primary} />
              </TouchableOpacity>
            ),
          }}
        />




      </Stack>
    </BottomSheetModalProvider>
  );
}
