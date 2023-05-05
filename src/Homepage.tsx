import bankfind from './bankfind.svg';
import './Homepage.css';
import Search from './components/Search';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { FaRegStar } from 'react-icons/fa';
import FavoriteList from './components/FavoriteList';

const HomePage = (): JSX.Element => {
  const [data, setData] = useState<[]>();
  const [error, setError] = useState<string>();
  const [favorites, setFavorites] = useState<[]>(
    JSON.parse(window.localStorage.getItem('favorites') || '[]')
  );

  useEffect(() => {
    window.localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const searchByName = async (name: string | undefined) => {
    try {
      const data = await axios.get(
        `https://banks.data.fdic.gov/api/institutions?filters=NAME:${name}`
      );
      setData(data.data.data);
    } catch (err) {
      let msg = (err as Error).message;
      setError(msg);
      setTimeout(() => {
        setError('');
      }, 1000);
    }
  };

  const handleSearch = (name: string | undefined) => {
    searchByName(name);
  };

  const addToFavorites = (id: string) => {
    const newFavorite = data?.filter(
      (bank: { data: { CERT: string } }) => bank.data.CERT === id
    );

    const findFavorite = favorites?.find(
      (bank: { data: { CERT: string } }) => bank.data.CERT === id
    );

    if (!favorites) {
      //@ts-ignore
      setFavorites(newFavorite);
    } else {
      if (!findFavorite) {
        // @ts-ignore
        setFavorites([...favorites, ...newFavorite]);
      }
    }
  };

  const removeFromFavorites = (id: string) => {
    const filterFavorites = favorites.filter(
      (bank: { data: { CERT: string } }) => bank.data.CERT !== id
    );
    // @ts-ignore
    setFavorites(filterFavorites);
  };

  return (
    <main>
      <header className='App-header'>
        <h1>Financial Institution Manager</h1>
        <Search handleSearch={handleSearch} />
      </header>
      <img src={bankfind} alt='bank find'></img>
      <section>
        <ul>
          {data &&
            data.map(
              (bank: {
                data: {
                  NAME: string;
                  ADDRESS: string;
                  CITY: string;
                  STNAME: string;
                  ZIP: string;
                  WEBADDR: string;
                  CERT: string;
                };
              }) => (
                <li key={bank.data.CERT}>
                  {
                    <>
                      <p>{bank.data.NAME}</p>
                      <FaRegStar
                        onClick={() => addToFavorites(bank.data.CERT)}
                      />
                      <p>{bank.data.ADDRESS}</p>
                      <p>{`${bank.data.CITY},${bank.data.STNAME} ${bank.data.ZIP}`}</p>
                      <p>{bank.data.WEBADDR}</p>
                    </>
                  }
                </li>
              )
            )}
          {error && <p className='error'>{error}</p>}
        </ul>
      </section>
      <section>
        <FavoriteList
          favorites={favorites}
          removeFromFavorites={removeFromFavorites}
        />
      </section>
    </main>
  );
};

export default HomePage;
