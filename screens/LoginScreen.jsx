import { LinearGradient } from "expo-linear-gradient"
import { View, Text, FlatList, TouchableOpacity, SafeAreaView, Pressable } from "react-native"
import { Entypo } from '@expo/vector-icons'
import * as WebBrowser from 'expo-web-browser';
import { ResponseType, makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

WebBrowser.maybeCompleteAuthSession()

const discovery = {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
}

export const LoginScreen = () => {
    const navigation = useNavigation()

    const [request, response, promptAsync] = useAuthRequest(
        {
            responseType: ResponseType.Token,
            clientId: '2c81ed5906ef450eaea3c2c265307627',
            scopes: [
                'user-read-email',
                'user-library-read',
                'user-read-recently-played',
                'user-top-read',
                'playlist-read-private',
                'playlist-read-collaborative',
                'playlist-modify-public'
            ],
            usePKCE: false,
            redirectUri: 'exp://192.168.0.104:19000/',
        },
        discovery
    )

    useEffect(() => {
        const checkIsAuthenticated = async () => {
            const accessToken = await AsyncStorage.getItem("token");
            const expirationDate = await AsyncStorage.getItem("expirationDate");

            if (accessToken && expirationDate) {
                const currentTime = Date.now()
                moveToMainScreenIfNotExpired(currentTime, expirationDate, navigation)
                
                if (currentTime >= parseInt(expirationDate)) {
                    AsyncStorage.removeItem("token")
                    AsyncStorage.removeItem("expirationDate")
                }
            }
        }

        checkIsAuthenticated()
    }, [])

    useEffect(() => {
        if (response?.type === 'success') {
            const { access_token, expires_in } = response.params
            AsyncStorage.setItem('token', access_token)
            AsyncStorage.setItem('expirationDate', new Date(expires_in).getTime().toString())
            navigation.navigate('Main')
        }
    }, [response])

    function moveToMainScreenIfNotExpired(currentTime, expirationDate, navigation) {
        if (currentTime < parseInt(expirationDate)) {
            navigation.replace("Main")
            return
        }
    }

    return (
        <LinearGradient colors={['#040306', '#131624']} style={{ flex: 1 }}>
            <SafeAreaView>
                <Entypo style={{ textAlign: 'center', marginTop: 80 }} name='spotify' size={80} color='white' />
                <Text style={{
                    color: 'white',
                    fontSize: 40,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginTop: 40
                }}>Millions of Songs Free</Text>
                <Pressable
                    onPress={() => promptAsync()}
                    style={{
                        marginTop: 80,
                        backgroundColor: '#1DB954',
                        padding: 10,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        width: 300,
                        borderRadius: 25,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                    <Text>Sign in with Spotify</Text>
                </Pressable>
            </SafeAreaView>
        </LinearGradient>
    )
}
