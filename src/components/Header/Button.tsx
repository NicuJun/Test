
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

interface EntryProps {
    onAccountClick: () => void;
}
export default function Entry({ onAccountClick }: EntryProps) {
    return (
        <Stack spacing={2} direction="row">
            <Button variant="contained" onClick={onAccountClick}>Аккаунт</Button>
        </Stack>
    );
}
