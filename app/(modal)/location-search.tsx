import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import MapView from 'react-native-maps';
//import { Colors } from 'react-native/Libraries/NewAppScreen';
import Colors from '@/constants/Colors';
import { useNavigation } from 'expo-router';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Ionicons } from '@expo/vector-icons';

//process.env.EXPO_PUBLIC_GOOGLE_API_KEY

const LocationSearch = () => {
  const navigation = useNavigation();

  const [location, setLocation] = useState({
    latitude: 51.5078788,
    longitude: -0.877321,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });


  return (
    <View style={{ flex: 1 }}>

      <GooglePlacesAutocomplete
        placeholder='Localizar'
        fetchDetails={true}
        onPress={(Data, Detalhes = null) => {
          const point = Detalhes?.geometry?.location;
          if (!point) return;
          setLocation({
            ...location,
            latitude: point.lat,
            longitude: point.lng,
          });
        }}
        query={{
          key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
          language: 'pt-br',
        }}
        renderLeftButton={() => (
          <View style={styles.boxIcon}>
            <Ionicons name="search-outline" size={24} color={Colors.medium} />
          </View>
        )}



        styles={{
          container: {
            flex: 0,
          },
          textInput: {
            backgroundColor: Colors.grey,
            paddingLeft: 35,
            borderRadius: 10,
          },
          textInputContainer: {
            padding: 8,
            backgroundColor: '#fff',

          }
        }}

      />













      <MapView showsUserLocation={true} style={styles.map} region={location} />


      <View style={styles.absoluteBox}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()} >
          <Text style={styles.buttonText}>Confirmar</Text>
        </TouchableOpacity>
      </View>
    </View >
  );
};

const styles = StyleSheet.create({

  map: {
    flex: 1,

  },

  absoluteBox: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
  },

  button: {
    backgroundColor: Colors.primary,
    padding: 16,
    margin: 16,
    alignItems: 'center',
    borderRadius: 8,
  },


  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  boxIcon: {
    position: 'absolute',
    left: 15,
    top: 18,
    zIndex: 1,
  },




});


export default LocationSearch;