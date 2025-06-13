import styles from "./Header.module.css";
import SearchBar from "./SearchBar";
import Entry from "./Button";
import { useAuth } from "../../context/AuthContext";

interface HeaderProps {
  onAccountClick: () => void;
  onSearchTitle?: (searchTerm: string) => void;
  onSearchActor?: (searchTerm: string) => void;
  onSort?: () => void;
}

function Header({ onAccountClick, onSearchTitle, onSearchActor, onSort }: HeaderProps) {
  const { user } = useAuth();

  return (
    <>
      <header>
        <h1 className={styles.header}>
          веб-програма для зберігання інформації про фільми
        </h1>
      </header>
      <nav>
        <section className={styles.left_side}>
          <SearchBar
            placeholder="Пошук за назвою фільма"
            onSearch={onSearchTitle || (() => { })}
          />
          <SearchBar
            placeholder="Пошук за актором"
            onSearch={onSearchActor || (() => { })}
          />
          <Entry onClick={onSort} name="Сортування А-Я...A-Z" />
        </section>
        <section className={styles.right_side}>
          <Entry
            onClick={onAccountClick}
            name={user ? "Вийти" : "Аккаунт"}
            className={user ? styles.greenButton : ""}
          />
        </section>
      </nav>
    </>
  );
}

export default Header;