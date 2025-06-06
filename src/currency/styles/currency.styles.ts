import { StyleSheet } from 'react-native';


export const themes = {
    light: {
        background: '#fff',
        text: '#000',
        border: '#ccc',
        button: '#007AFF',
        buttonText: '#fff',
        error: 'red',
    },
    dark: {
        background: '#000',
        text: '#fff',
        border: '#444',
        button: '#1E90FF',
        buttonText: '#000',
        error: '#FF5555',
    },
};

export const spacing = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
};

export const styles = ( theme: 'light' | 'dark' ) =>
    StyleSheet.create( {
        container: {
            flex: 1,
            justifyContent: 'center',
            padding: spacing.md,
            backgroundColor: themes[ theme ].background,
        },
        row: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: spacing.xs,
            position: 'relative',
        },
        currencyContainer: {
            flex: 1,
        },
        label: {
            fontSize: 16,
            marginVertical: spacing.sm,
            color: themes[ theme ].text,
            fontWeight: '400',
        },
        input: {
            borderWidth: 1,
            borderColor: themes[ theme ].border,
            padding: spacing.sm,
            borderRadius: 8,
            fontSize: 16,
            color: themes[ theme ].text,
            backgroundColor: themes[ theme ].background,
            marginBottom: spacing.md,
            paddingVertical: spacing.md,
            paddingHorizontal: spacing.lg,
        },
        result: {
            fontSize: 42,
            // marginTop: spacing.sm,
            textAlign: 'left',
            color: themes[ theme ].text,
            fontWeight: '500',
        },
        resultDiff: {
            fontSize: spacing.lg,
            marginTop: spacing.md,
            textAlign: 'left',
            color: themes[ theme ].text,
            fontWeight: '400',
        },
        picker: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: spacing.md,
            paddingHorizontal: spacing.lg,
            borderRadius: spacing.sm,
            width: '100%',
            backgroundColor: 'rgba(222, 222, 222, 1)',
            elevation: 2,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
        },
        flag: {
            fontSize: 20,
            marginRight: spacing.sm,
        },
        code: {
            fontSize: 16,
            color: themes[ theme ].text,
            fontWeight: '400',
        },
        arrow: {
            fontSize: 16,
            marginLeft: spacing.sm,
            color: themes[ theme ].text,
        },
        swapButtonContainer: {
            paddingHorizontal: spacing.md,
            paddingVertical: spacing.xs,
        },
        swapIcon: {
            fontSize: 30,
            color: themes[ theme ].text,
        },
        searchInput: {
            borderWidth: 1,
            borderColor: themes[ theme ].border,
            padding: spacing.sm,
            borderRadius: 8,
            marginBottom: spacing.md,
            color: themes[ theme ].text,
            backgroundColor: themes[ theme ].background,
            fontSize: 16,
        },
        listItemContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: spacing.lg,
        },
        listItemText: {
            fontSize: 16,
            flex: 1,
            fontWeight: '400',
            color: themes[ theme ].text,
        },
        radio: {
            width: 16,
            height: 16,
            borderRadius: 10,
            borderWidth: 2,
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: themes[ theme ].text,
        },
        radioSelected: {
            backgroundColor: themes[ theme ].text,
            width: spacing.sm - 1,
            height: spacing.sm - 1,
            borderRadius: spacing.sm,
            position: 'absolute',
        },
        refreshButton: {
            backgroundColor: themes[ theme ].button,
            padding: spacing.sm,
            borderRadius: 8,
            alignItems: 'center',
            marginBottom: spacing.md,
            elevation: 2,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
        },
        refreshButtonText: {
            color: themes[ theme ].buttonText,
            fontSize: 16,
            fontWeight: '600',
        },
        toggleButton: {
            backgroundColor: themes[ theme ].button,
            padding: spacing.sm,
            borderRadius: 8,
            alignItems: 'center',
            marginBottom: spacing.md,
            elevation: 2,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
        },
        toggleButtonText: {
            color: themes[ theme ].buttonText,
            fontSize: 16,
            fontWeight: '600',
        },
        loadingText: {
            fontSize: 12,
            textAlign: 'left',
            color: themes[ theme ].text,
        },
        errorText: {
            color: themes[ theme ].error,
            fontSize: 14,
            marginTop: spacing.sm,
            marginBottom: spacing.md,
            textAlign: 'center',
        },
    } );