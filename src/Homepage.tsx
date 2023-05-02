import bankfind from './bankfind.svg';
import './Homepage.css';
import Search from './components/Search';
import axios from 'axios';
import {useState,} from 'react';

const HomePage = (): JSX.Element => {
  const [data, setData] = useState<[]>();
  const [error, setError] = useState<string>();

  const searchByName = async (name: string | undefined) => {
    try {
      const data = await axios.get(
        `http://banks.data.fdic.gov/api/institutions?filters=NAME:${name}`
      );
      setData(data.data.data);
    } catch (err) {
      let msg = (err as Error).message;
	  setError(msg);
	  setTimeout(() => {
		setError('');
	  }, 1000)
    }
  };

  const handleSearch = (name: string | undefined) => {
     searchByName(name);
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
    </main>
  );
};

export default HomePage;
