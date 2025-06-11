import styles from "./Header.module.css";
import SearchBar from "./SearchBar";
import Entry from "./Button";

interface HeaderProps {
  onAccountClick: () => void;
}

function Header({ onAccountClick }: HeaderProps) {
  return (
    <>
      <header>
        веб-програмa для зберігання інформації про фільми
      </header>
      <nav>
        <section className={styles.left_side}>
          <SearchBar placeholder="Пошук за назвою фільма"></SearchBar>
          <SearchBar placeholder="Пошук за актором"></SearchBar>
        </section>

        <section className={styles.right_side}>
          <Entry onAccountClick={onAccountClick} />
        </section>
      </nav>
    </>
  );
}

export default Header;
