import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import React from 'react';
import { categorias } from '@/assets/data/home';


const Categorias = () => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        padding: 25,
      }}>
      {categorias.map((category, index) => (
        <View style={styles.categoryCard} key={index}>
          <Image source={category.img} />
          <Text style={styles.categoryText}>{category.text}</Text>
        </View>
      ))}
    </ScrollView >
  );
};


const styles = StyleSheet.create({
  categoryCard: {
    width: 100,
    height: 100,
    backgroundColor: '#fff',
    marginEnd: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    borderRadius: 4,
  },

  categoryText: {
    padding: 6,
    fontSize: 14,
    fontWeight: 'bold',
    alignItems: 'center',
  },
});

export default Categorias;