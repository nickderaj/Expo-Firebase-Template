import RootNavigator from '@/navigator/RootNavigator'
import { store } from '@/redux/store'
import { NavigationContainer } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { preventAutoHideAsync } from 'expo-splash-screen'
import { Provider } from 'react-redux'

preventAutoHideAsync() // show splash screen
export default function App() {
    const [fontsLoaded] = useFonts({ Radiance: require('./assets/fonts/radiance.ttf') })

    if (!fontsLoaded) return null
    return (
        <Provider store={store}>
            <NavigationContainer>
                <RootNavigator />
            </NavigationContainer>
        </Provider>
    )
}
