import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const ItemScreen = ({route}) => {
    const navigation = useNavigation();

    const data = route?.params?.param;
    
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerShown: false
        });
    },[]);
    
  return (
    <SafeAreaView className="flex-1 bg-white relative">
      <ScrollView className="flex-1 px-4 py-6">
        <View className="relative bg-white shadow-lg">
          <Image 
            source={
              { uri :
                data?.photo?.images?.large?.url ? 
                data?.photo?.images?.large?.url :
                 "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg" 
            }}
            className="w-full h-72 rounded-2xl object-cover"
            />
          <View className="absolute flex-row inset-x-0 top-5 justify-between px-6">
           
            <TouchableOpacity className="w-10 h-10 rounded-md items-center justify-center bg-white" onPress={() => navigation.navigate("Discover")}>
              <Entypo name="chevron-left" size={24} color="#0682BE" />
            </TouchableOpacity>

            <TouchableOpacity className="w-10 h-10 rounded-md items-center justify-center bg-[#0682BE]">
              <FontAwesome name="heartbeat" size={24} color="#fff" />            
            </TouchableOpacity>

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ItemScreen