import * as React from 'react';
import {
    Button,
    FormControl,
    Checkbox,
    FormControlLabel,
    InputLabel,
    OutlinedInput,
    TextField,
    InputAdornment,
    Link,
    Alert,
    IconButton,
    Box,
    Typography,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useTheme } from '@mui/material/styles';
import { useAuth } from './../../context/AuthContext';

function CustomEmailField({ error }: { error?: string }) {
    return (
        <TextField
            id="input-with-icon-textfield"
            label="Email"
            name="email"
            type="email"
            size="small"
            required
            fullWidth
            error={!!error}
            helperText={error}
            slotProps={{
                input: {
                    startAdornment: (
                        <InputAdornment position="start">
                            <AccountCircle fontSize="inherit" />
                        </InputAdornment>
                    ),
                },
            }}
            variant="outlined"
        />
    );
}

function CustomPasswordField({ error }: { error?: string }) {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent) => event.preventDefault();

    return (
        <FormControl sx={{ my: 2 }} fullWidth variant="outlined">
            <InputLabel size="small" htmlFor="outlined-adornment-password">
                Password
            </InputLabel>
            <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                size="small"
                error={!!error}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            size="small"
                        >
                            {showPassword ? <VisibilityOff fontSize="inherit" /> : <Visibility fontSize="inherit" />}
                        </IconButton>
                    </InputAdornment>
                }
                label="Password"
            />
            {error && (
                <Typography variant="caption" color="error">
                    {error}
                </Typography>
            )}
        </FormControl>
    );
}

function CustomButton({ children }: { children: React.ReactNode }) {
    return (
        <Button
            type="submit"
            variant="outlined"
            color="info"
            size="small"
            disableElevation
            fullWidth
            sx={{ my: 2 }}
        >
            {children}
        </Button>
    );
}

function SignUpLink({ setMode }: { setMode: (mode: 'login' | 'register') => void }) {
    return (
        <Link href="#" onClick={() => setMode('register')} variant="body2">
            Sign up
        </Link>
    );
}

function LoginLink({ setMode }: { setMode: (mode: 'login' | 'register') => void }) {
    return (
        <Link href="#" onClick={() => setMode('login')} variant="body2">
            Log in
        </Link>
    );
}

function ForgotPasswordLink() {
    return (
        <Link href="#" variant="body2">
            {/* Just For future */}
        </Link>
    );
}

function RememberMeCheckbox() {
    const theme = useTheme();
    return (
        <FormControlLabel
            label="Remember me"
            control={
                <Checkbox
                    name="remember"
                    value="true"
                    color="primary"
                    sx={{ padding: 0.5, '& .MuiSvgIcon-root': { fontSize: 20 } }}
                />
            }
            slotProps={{
                typography: {
                    color: 'textSecondary',
                    fontSize: theme.typography.pxToRem(14),
                },
            }}
        />
    );
}

export default function Auth() {
    const theme = useTheme();
    const { login, register } = useAuth();
    const [mode, setMode] = React.useState<'login' | 'register'>('login');
    const [error, setError] = React.useState<{ email?: string; password?: string }>({});
    const [alert, setAlert] = React.useState<string | null>(null);

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email) ? '' : 'Invalid email format';
    };

    const validatePassword = (password: string) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password)
            ? ''
            : 'Password must be at least 8 characters, with 1 uppercase, 1 lowercase, 1 number, and 1 special character';
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError({});
        setAlert(null);

        const formData = new FormData(event.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const remember = formData.get('remember') === 'true';

        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);
        if (emailError || passwordError) {
            setError({ email: emailError, password: passwordError });
            return;
        }

        if (mode === 'login') {
            const success = await login(email, password, remember);
            if (!success) {
                setAlert('Invalid email or password');
            }
        } else {
            const success = await register(email, password, remember);
            if (!success) {
                setAlert('Email already registered');
            } else {
                setAlert('Registration successful! Please log in.');
                setMode('login');
            }
        }
    };

    return (
        <Box
            sx={{
                bgcolor: 'background.paper',
                p: 4,
                borderRadius: 2,
                boxShadow: 24,
                maxWidth: 400,
                mx: 'auto',
            }}
        >
            <Typography variant="h6" sx={{ mb: 2, color: 'black' }}>
                {mode === 'login' ? 'Login' : 'Register'}
            </Typography>
            {alert && (
                <Alert severity={mode === 'login' || alert.includes('successful') ? 'info' : 'error'} sx={{ mb: 2 }}>
                    {alert}
                </Alert>
            )}
            <form onSubmit={handleSubmit} noValidate>
                <CustomEmailField error={error.email} />
                <CustomPasswordField error={error.password} />
                <RememberMeCheckbox />
                <CustomButton>{mode === 'login' ? 'Log In' : 'Register'}</CustomButton>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                    {mode === 'login' ? <SignUpLink setMode={setMode} /> : <LoginLink setMode={setMode} />}
                    <ForgotPasswordLink />
                </Box>
            </form>
        </Box>
    );
}