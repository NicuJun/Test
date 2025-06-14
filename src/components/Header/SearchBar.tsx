import styles from "./Header.module.css";
import { ChangeEvent } from 'react';

interface SearchBarProps {
    placeholder: string;
    onSearch: (searchTerm: string) => void;
}

function SearchBar({ placeholder, onSearch }: SearchBarProps) {
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        onSearch(event.target.value);
    };

    return (
        <input
            className={styles.SearchBar}
            type="search"
            placeholder={placeholder}
            onChange={handleInputChange}
        />
    );
}

export default SearchBar;