import * as React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage, type AuthProvider } from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';

const providers = [{ id: 'credentials', name: 'Email and Password' }];

const signIn: (provider: AuthProvider, formData: FormData) => void = async (
    provider,
    formData,
) => {
    const promise = new Promise<void>((resolve) => {
        setTimeout(() => {
            alert(
                `Signing in with "${provider.name}" and credentials: ${formData.get('email')}, ${formData.get('password')}, ${formData.get('password')}`,
            );
            resolve();
        }, 300);
    });
    return promise;
};

export default function CredentialsSignInPage() {
    const theme = useTheme();
    return (
        <AppProvider theme={theme}>
            <SignInPage
                signIn={signIn}
                providers={providers}
                slotProps={{ emailField: { autoFocus: false }, form: { noValidate: true } }}
            />
        </AppProvider>
    );
}
