import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

interface EntryProps {
    onClick?: () => void;
    name: string;
}

export default function Entry({ onClick, name }: EntryProps) {
    return (
        <Stack spacing={2} direction="row">
            <Button variant="contained" onClick={onClick}>
                {name}
            </Button>
        </Stack>
    );
}