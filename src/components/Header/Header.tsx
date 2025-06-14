import React, { useState } from 'react';
import styles from "./Header.module.css";
import SearchBar from "./SearchBar";
import Entry from "./Button";
import { useAuth } from "../../context/AuthContext";
import AddMovieForm from "../AddMovieForm";

interface Movie {
  id: number;
  title: string;
  releaseYear: number;
  format: string;
  stars: string[];
}

interface HeaderProps {
  onAccountClick: () => void;
  onSearchTitle?: (searchTerm: string) => void;
  onSearchActor?: (searchTerm: string) => void;
  onSort?: () => void;
  onAddMovie?: (movie: Omit<Movie, 'id'>) => void;
}

function Header({ onAccountClick, onSearchTitle, onSearchActor, onSort, onAddMovie }: HeaderProps) {
  const { user, isAdmin } = useAuth();
  const [openAddMovie, setOpenAddMovie] = useState(false);

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
          {isAdmin && (
            <Entry
              onClick={() => setOpenAddMovie(true)}
              name="Додати"
              className={styles.greenButton}
            />
          )}
        </section>
        <section className={styles.right_side}>
          <Entry
            onClick={onAccountClick}
            name={user ? "Вийти" : "Аккаунт"}
            className={user ? styles.greenButton : ""}
          />
        </section>
      </nav>
      {isAdmin && (
        <AddMovieForm
          open={openAddMovie}
          onClose={() => setOpenAddMovie(false)}
          onAddMovie={onAddMovie}
        />
      )}
    </>
  );
}

export default Header;