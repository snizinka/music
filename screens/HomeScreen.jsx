import AsyncStorage from "@react-native-async-storage/async-storage"
import { LinearGradient } from "expo-linear-gradient"
import { useEffect, useState } from "react"
import { View, Image, Text, SafeAreaView, StyleSheet, ScrollView, Pressable } from "react-native"
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'

export const HomeScreen = () => {
  const [userProfile, setUserProfile] = useState({})

  const getProfile = async () => {
    const accessToken = await AsyncStorage.getItem("token")
    try {
      const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      const fetchedProfile = await response.json()
      setUserProfile(fetchedProfile)
      return fetchedProfile
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getProfile()
  }, [])

  console.log(userProfile)

  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
      <ScrollView style={{ marginTop: 50 }}>
        <View style={{
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            {userProfile?.images?.length > 0 ? <Image
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                resizeMode: 'cover'
              }}
              source={{ uri: userProfile?.images[0]?.url }} />
              : ''}
            <Text style={{
              marginLeft: 10,
              fontSize: 20,
              fontWeight: 'bold',
              color: 'white',
              width: 200
            }}>Now I'm stuck in the middle, {userProfile?.display_name}</Text>
          </View>
          <MaterialCommunityIcons name="lightning-bolt-outline" size={24} color="white" />
        </View>

        <View style={{
          marginBottom: 10,
          marginHorizontal: 12,
          marginVertical: 5,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10
        }}>
          <Pressable style={{
            backgroundColor: '#2B282828',
            padding: 10,
            borderRadius: 30
          }}>
            <Text style={{
              fontSize: 15,
              color: 'white'
            }}>Music</Text>
          </Pressable>

          <Pressable style={{
            backgroundColor: '#2B282828',
            padding: 10,
            borderRadius: 30
          }}>
            <Text style={{
              fontSize: 15,
              color: 'white'
            }}>Podcasts & Shows</Text>
          </Pressable>
        </View>

        <View>
          <Pressable>
            <LinearGradient>
              <Pressable>
                <AntDesign name="heart" size={24} color="black" />
              </Pressable>
            </LinearGradient>
          </Pressable>
        </View>
      </ScrollView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({

})
