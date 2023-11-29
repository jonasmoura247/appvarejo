import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import Categorias from '@/Components/Categorias';
import Lojas from '@/Components/Lojas';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';


const Page = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <Categorias />
        <Text style={styles.header}>Seus vizinhos?</Text>
        <Lojas />
        <Text style={styles.header}>Lojas Proximas</Text>
        <Lojas />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  container: {
    top: 80,
    backgroundColor: Colors.lightGrey,
  },

  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 16,

  },
});



export default Page;