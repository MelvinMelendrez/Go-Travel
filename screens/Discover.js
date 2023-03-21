import { Text, View, Image, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useNavigation } from "@react-navigation/native"
import { Attractions, Avatar, Hotels, NotFound, Restaurants } from '../assets';
import MenuContainer from '../components/MenuContainer';
import { Entypo } from '@expo/vector-icons';
import ItemCardContainer from '../components/ItemCardContainer';
import { getPlacesData } from '../api';


const Discover = () => {
    const navigation = useNavigation();

    const [type, setType] = useState("restaurants")
    const [ IsLoading, setIsLoading] = useState(false)
    const [mainData, setMainData] = useState([])
    const [bl_lat, setBl_lat] = useState(null)
    const [bl_lng, setBl_lng] = useState(null)
    const [tr_lat, setTr_lat] = useState(null)
    const [tr_lng, setTr_lng] = useState(null)

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerShown: false
        });
    },[]);

    useEffect(() => {
        setIsLoading(true);
        getPlacesData(bl_lat, bl_lng, tr_lat, tr_lng, type).then((data) => {
          setMainData(data);
          setInterval(() => {
            setIsLoading(false);
          }, 2000);
          
        })
      }, [ bl_lat, bl_lng, tr_lat, tr_lng, type ])

    return (
      <SafeAreaView className="flex-1 bg-white relative">
        <View className="flex-row items-center justify-between px-8">
            <View>
                <Text className="text-[40px] text-[#0B646B] font-bold">Discover</Text>
                <Text className="text-[#527283] text-[36px]">The beauty today</Text>
            </View>
            <View className="w-12 h-12 bg-gray-400 rounded-md items-center">
                <Image 
                  source={Avatar}
                  className="w-full h-full rounded-md object-cover"
                />
            </View>
        </View>

        <View className="flex-row items-center bg-white mt-4 mx-4 rounded-xl py-1 px-4 shadow-lg">
            <GooglePlacesAutocomplete
              GooglePlacesDetailsQuery={{fields : "geometry"}}
              placeholder='Search'
              fetchDetails={true}
              onPress={(data, details = null) => {
                    console.log(details?.geometry?.viewport);
                    setBl_lat(details?.geometry?.viewport?.southwest?.lat);
                    setBl_lng(details?.geometry?.viewport?.southwest?.lng);
                    setTr_lat(details?.geometry?.viewport?.northeast?.lat);
                    setTr_lng(details?.geometry?.viewport?.northeast?.lng);
              }}
              query={{
                    key: 'AIzaSyD6kX3iErsmn3RPeRTidExp6KpfOSPrX8E',
                    language: 'en', 
            }}
    />
        </View>

        {/* Menu Container */}
        {IsLoading ? <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#0B646B" />
        </View> :
        <ScrollView >
            <View className="flex-row items-center justify-between px-8 mt-8 ">
                <MenuContainer
                  key={"hotel"}
                  title="Hotels"
                  imageSrc={Hotels}
                  type={type}
                  setType={setType}
                ></MenuContainer>

                <MenuContainer
                  key={"attractions"}
                  title="Attractions"
                  imageSrc={Attractions}
                  type={type}
                  setType={setType}
                ></MenuContainer>

                <MenuContainer
                  key={"restaurants"}
                  title="Restaurants"
                  imageSrc={Restaurants}
                  type={type}
                  setType={setType}
                ></MenuContainer>
            </View>

            <View>
                <View className="flex-row items-center justify-between px-4 mt-8">
                    <Text className="text-[#2C7379] text-[28px] font-bold"> Top Tips</Text>
                    <TouchableOpacity className="flex-row items-center justify-center space-x-2">
                        <Text className="text-[#A0C4C7] text-[20px] font-bold">Explore</Text>
                        <Entypo name="arrow-long-right" size={24} color="#A0C4C7" />
                    </TouchableOpacity>
                </View>
                <View className="px-4 mt-8 flex-row justify-evenly flex-wrap">
                    {mainData?.length > 0 ? (
                    <>
                        {mainData?.map((data, i ) => (

                            <ItemCardContainer 
                             key={i} 
                             imageSrc={
                                data?.photo?.images?.medium?.url ?
                                data?.photo?.images?.medium?.url :
                                "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
                            }
                             title={data?.name}
                             location={data?.location_string}
                             data={data}
                             />

                        ))}
                    </>
                    ) : (
                        <>
                        <View className="w-full h-[300px] items-center space-y-8 justify-center">
                            <Image 
                                source={NotFound} 
                                className="w-32 h-32 object-cover" />
                                <Text className="text-2xl text-[#428288] font-semibold">
                                    Opps...No Data Found
                                </Text>
                        </View>
                        </>
                    )
                    
                    }
                </View>
            </View>
        </ScrollView>
        }
      </SafeAreaView>
    )
  
}

export default Discover