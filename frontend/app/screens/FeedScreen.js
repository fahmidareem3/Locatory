import React from 'react';
import routes from '../navigation/routes';
import { FontAwesome5 } from '@expo/vector-icons';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Pressable
} from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';

import colors from '../config/colors';
import constants from '../config/constants';
import Screen from '../components/Screen';
import Card from '../components/Card';
import CardSection from '../components/CardSection';

const TopBar = () => {
  return (
    <View style={styles.topBar}>
      <View style={styles.greetContainer}>
        <Text style={styles.greet}>Good Evening,</Text>
        <Text style={[styles.greet, styles.greetName]}>Rumel</Text>
      </View>
      <ImageBackground
        style={styles.dp}
        source={{
          uri: 'https://images.unsplash.com/photo-1657214059212-104dac959c56?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
        }}
        resizeMode="cover"
      />
    </View>
  );
};
const SearchBar = () => {
  return (
    <View style={styles.searchContainer}>
      <FontAwesome5
        name="search"
        size={22}
        color="black"
        style={styles.searchIcon}
      />
      <TextInput style={styles.input} placeholder="Search location" />
    </View>
  );
};
const FilterTag = ({ text }) => {
  return (
    <TouchableOpacity style={styles.filterTag}>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};

const FilterBar = () => {
  return (
    <View style={styles.filterContainer}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.filterTag}>
          <Image
            source={require('../assets/icons/filter.png')}
            style={styles.filterIcon}
            resizeMode={'contain'}
          />
          <Text>Filter</Text>
        </View>
        <FilterTag text={'Trending'} />
        <FilterTag text={'Indoors'} />
        <FilterTag text={'Tour'} />
        <FilterTag text={'Restaurants'} />
        <FilterTag text={'Trending'} />
      </ScrollView>
    </View>
  );
};

export default function FeedScreen({ navigation }) {
  const data = [
    {
      title: 'University of Dhaka',
      location: 'Nilkhet Road,Dhaka 1000',
      distance: '0.2Km',
      imaguri:
        'https://images.unsplash.com/photo-1626964143945-b13d22dfe399?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80'
    },
    {
      title: 'Saint Martin Island',
      location: "Cox's Bazar , Chittagong 1000",
      distance: '150.2Km',
      imaguri:
        'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
    },
    {
      title: 'University of Dhaka',
      location: 'Nilkhet Road,Dhaka 1000',
      distance: '0.2Km',
      imaguri:
        'https://images.unsplash.com/photo-1611175522050-9e702da5b464?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1746&q=80'
    }
  ];
  return (
    <Screen style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
      >
        <TopBar />
        <SearchBar />
        <FilterBar />
        {/* <Pressable
        style={styles.secondaryButton}
        onPress={() => navigation.navigate(routes.LOCATION)}
      >
        <Text style={styles.secondaryButtonText}>LocationPage</Text>
      </Pressable> */}
        <CardSection title={'For you'} data={data} navigation={navigation} />
        <CardSection
          title={'Meet with colleagues'}
          data={data}
          navigation={navigation}
        />
        <CardSection
          title={'Most Reviewed'}
          data={data}
          navigation={navigation}
        />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    // paddingHorizontal: constants.CONTAINER_PADDING,
    backgroundColor: 'white'
  },
  dp: {
    width: 35,
    height: 35,
    backgroundColor: 'red',
    borderRadius: 50,
    overflow: 'hidden'
  },
  filterContainer: {
    flexDirection: 'row',
    height: 35,
    overflow: 'scroll',
    marginTop: 10
  },
  filterIcon: {
    width: 14,
    height: 14,
    marginRight: 5
  },
  filterTag: {
    paddingHorizontal: 10,
    backgroundColor: colors.input,
    height: 35,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    flexDirection: 'row'
  },
  greetContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  greet: {
    fontSize: 14,
    fontFamily: 'SFPD-semiBold',
    color: colors.gray
  },
  greetName: {
    marginLeft: 3,
    color: colors.black
  },
  input: {
    backgroundColor: colors.input,
    height: 50,
    borderRadius: 14,
    width: '100%',
    paddingLeft: 50,
    marginTop: 10,
    fontSize: 14,
    fontFamily: 'SFPD-medium'
  },
  scrollContainer: {
    width: '100%',
    paddingHorizontal: constants.CONTAINER_PADDING + 5,
    right: 0
  },
  searchContainer: {
    position: 'relative'
  },
  searchIcon: {
    position: 'absolute',
    zIndex: 8,
    marginTop: 23,
    marginLeft: 15,
    color: colors.gray
  },
  secondaryButtonText: {
    padding: 10,
    backgroundColor: colors.primary,
    color: 'white',
    width: '50%',
    borderRadius: 6,
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center'
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  }
});
