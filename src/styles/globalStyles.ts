import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

export const globalStyles = StyleSheet.create( {
    text: {
        fontFamily: 'Inter-Regular',
    } as TextStyle,
    textMedium: {
        fontFamily: 'Inter-Medium',
    } as TextStyle,
    textSemiBold: {
        fontFamily: 'Inter-SemiBold',
    } as TextStyle,
    textBold: {
        fontFamily: 'Inter-Bold',
    } as TextStyle,
    input: {
        fontFamily: 'Inter-Regular',
    } as TextStyle,
    container: {
        flex: 1,
        backgroundColor: 'white',
    } as ViewStyle,
} ); 