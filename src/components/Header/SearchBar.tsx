import React from "react";
import styles from "./Header.module.css"
function SearchBar({ placeholder }: { placeholder: string }) {

    return (
        <>
            <input className={styles.SearchBar} type="search" placeholder={placeholder} />
        </>
    )
}
export default SearchBar