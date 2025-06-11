import React from "react"
import styles from "./Header.module.css";
import SearchBar from "./SearchBar";
import Entry from "./Button";
function Header() {

  return (
    <>
      <header  >
        веб-програмa для зберігання інформації про фільми
      </header>
      <nav>
        <section className={styles.left_side}>
          <SearchBar placeholder="Пошук за назвою фільма"></SearchBar>
          <SearchBar placeholder="Пошук за актором"></SearchBar>
        </section >

        <section className={styles.right_side}>
          <Entry></Entry>
        </section>
      </nav >
    </>
  )
}

export default Header