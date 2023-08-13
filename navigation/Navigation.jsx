import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { BottomTabs } from './StackNavigator'
import { LoginScreen } from '../screens/LoginScreen'

const Stack = createNativeStackNavigator()

export const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Login' component={LoginScreen} options={{headerShown: false}} />
                <Stack.Screen name='Main' component={BottomTabs} options={{headerShown: false}} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}