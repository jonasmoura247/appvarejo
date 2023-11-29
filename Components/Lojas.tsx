import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { lojas } from '@/assets/data/home';
import { Link } from 'expo-router';
import Colors from '@/constants/Colors';

const Lojas = () => {
  return (
    <ScrollView horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        padding: 15,
      }}>
      {lojas.map((lojas, index) => (
        <Link href={'/details'} key={index} asChild>
          <TouchableOpacity>
            <View style={styles.categoryCard}>
              <Image source={lojas.img} style={styles.image} />
              <View style={styles.categoryBox}>
                <Text style={styles.categoryText}>{lojas.name}</Text>
                <Text style={{ color: Colors.green }}>
                  {lojas.rating} {lojas.ratings}
                </Text>
                <Text style={{color: Colors.medium}}>{lojas.distance}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </Link>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  categoryCard: {
    width: 300,
    height: 250,
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
    paddingVertical: 5,
    fontSize: 14,
    fontWeight: 'bold',
    //alignItems: 'center',
  },

  image: {
    flex: 5,
    width: undefined,
    height: undefined,
  },

  imageContainer: {

  },

  categoryBox: {
    flex: 2,
    padding: 10,
  },




});

export default Lojas;