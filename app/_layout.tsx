import { CurrencyProvider } from '@/src/currency/store/context/CurrencyContext';
import { globalStyles } from '@/src/styles/globalStyles';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import 'react-native-reanimated';

const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
};

export default function RootLayout ()
{
  const [ loaded ] = useFonts( {
    'SpaceMono': require( '../assets/fonts/SpaceMono-Regular.ttf' ),
    'Inter-Regular': require( '../assets/fonts/Inter_18pt-Regular.ttf' ),
    'Inter-Medium': require( '../assets/fonts/Inter_18pt-Medium.ttf' ),
    'Inter-SemiBold': require( '../assets/fonts/Inter_18pt-SemiBold.ttf' ),
    'Inter-Bold': require( '../assets/fonts/Inter_18pt-Bold.ttf' ),
  } );

  if ( !loaded )
  {
    return null;
  }

  return (
    <CurrencyProvider>
      <ThemeProvider value={customTheme}>
        <View style={globalStyles.container}>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
              name="explore"
              options={{
                headerShown: true,
                headerBackTitleStyle: {
                  fontSize: 16,
                  fontFamily: 'Inter-SemiBold',
                },
                title: 'Currency Select',
                headerTitleStyle: {
                  fontSize: 18,
                  fontFamily: 'Inter-Bold',
                },
              }}
            />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </View>
      </ThemeProvider>
    </CurrencyProvider>
  );
}
