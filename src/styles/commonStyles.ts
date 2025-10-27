import { StyleSheet } from 'react-native';
import { Colors, Spacing, Typography, Radius } from '../app/theme';

export const commonStyles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: Spacing.md,
        backgroundColor: Colors.background,
    },
    title: {
        ...Typography.h2,
        textAlign: 'center',
        marginBottom: Spacing.lg,
    },
    welcomeText: {
        ...Typography.h2,
        textAlign: 'center',
        marginBottom: Spacing.lg,
        color: Colors.primary,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: Colors.primary,
        borderRadius: Radius.md,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Spacing.sm,
    },
    buttonText: {
        color: Colors.white,
        fontSize: 18,
        fontWeight: '600',
    },
    input: {
        width: '100%',
        height: 48,
        borderColor: Colors.border,
        borderWidth: 1,
        borderRadius: Radius.md,
        paddingHorizontal: Spacing.md,
        marginBottom: Spacing.sm,
        fontSize: 16,
        color: Colors.text
    },
    card: {
        backgroundColor: Colors.cardBackground,
        borderRadius: Radius.md,
        padding: Spacing.md,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    loggedInText: {
        textAlign: 'center',
        color: Colors.success,
        marginTop: Spacing.md,
        fontWeight: '600',
    },
});
