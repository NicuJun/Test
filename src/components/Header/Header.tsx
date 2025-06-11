import styles from "./Header.module.css";
import SearchBar from "./SearchBar";
import Entry from "./Button";

interface HeaderProps {
  onAccountClick: () => void;
  onSearchTitle?: (searchTerm: string) => void;
  onSearchActor?: (searchTerm: string) => void;
  onSort?: () => void;
}

function Header({ onAccountClick, onSearchTitle, onSearchActor, onSort }: HeaderProps) {
  return (
    <>
      <header>
        веб-програма для зберігання інформації про фільми
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
          <Entry onClick={onAccountClick} name="Аккаунт" />
        </section>
      </nav>
    </>
  );
}

export default Header;