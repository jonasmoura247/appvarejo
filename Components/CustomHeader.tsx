import { View, Text, StyleSheet, Button, TouchableOpacity, Image } from 'react-native'
import React, { useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { Link } from 'expo-router';
import { TextInput } from 'react-native-gesture-handler';
import BottomSheet from './BottomSheet';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
//import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const SearchBar = () =>

  <View style={styles.searchContainer}>
    <View style={styles.searchSection}>
      <View style={styles.searchField}>
        <Ionicons style={styles.searchIcon} name="search-outline" size={20} color={Colors.primary} />
        <TextInput style={styles.input} placeholder="Procurar" />
      </View>
      <Link href={'/(modal)/filter'} asChild>
        <TouchableOpacity style={styles.optionButton}>
          <Ionicons name="options-outline" size={20} color={Colors.primary} />
        </TouchableOpacity>
      </Link>
    </View>
  </View>;


const CustomHeader = () => {
  const BottomSheetRef = useRef<BottomSheetModal>(null);
  const openModal = () => {
    BottomSheetRef.current?.present();
  }
  const navigation = () => {
    BottomSheetRef.current?.present();
  }


  return (
    <SafeAreaView style={styles.safeAre}>
      <BottomSheet ref={BottomSheetRef} />
      <View style={styles.container}>
        {/*
        <TouchableOpacity>
          <Image style={styles.user} source={require('@/assets/images/user.png')} />
        </TouchableOpacity>
        */}
        <TouchableOpacity style={styles.titleContainer} onPress={openModal}>
          <Text style={styles.title}>Varejo</Text>
          <View style={styles.locationName} >
            <Text style={styles.subtitle}>Maringá-PR</Text>
            <Ionicons name='chevron-down' size={18} color={Colors.primary} />
          </View>
        </TouchableOpacity>

        <Link href={'/(modal)/login'} asChild>
          <TouchableOpacity style={styles.profileButton} >
            <Ionicons name='person-outline' size={20} color={Colors.primary} />
          </TouchableOpacity>
        </Link>
      </View>
      <SearchBar />
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  safeAre: {
    flex: 1,
    backgroundColor: '#fff',
  },

  container: {
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,

    //  alignItems: 'center',
    // justifyContent: 'space-between',
  },

  user: {
    width: 30,
    height: 30,
  },

  titleContainer: {
    flex: 1,
  },

  title: {
    fontSize: 14,
    color: Colors.medium,
  },

  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  profileButton: {
    backgroundColor: Colors.lightGrey,
    padding: 10,
    borderRadius: 50,

  },

  locationName: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  searchContainer: {
    height: 60,
    backgroundColor: '#FFF',
  },

  searchSection: {
    flexDirection: 'row',
    gap: 10,
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
  },

  searchField: {
    flex: 1,
    backgroundColor: Colors.lightGrey,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',

  },

  input: {
    padding: 10,
    color: Colors.mediumDark,
  },


  searchIcon: {
    paddingLeft: 10,
  },


  optionButton: {
    padding: 10,
    borderRadius: 50,
  },







});


export default CustomHeader;