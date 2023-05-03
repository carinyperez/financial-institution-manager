import { FaEdit } from 'react-icons/fa';
import { FaTrash} from 'react-icons/fa';
import './FavoriteList.css';
import {useState} from 'react';

interface FavoriteListProps {
	favorites: [], 
	removeFromFavorites: (id: string) => void,
}
const FavoriteList = ({favorites, removeFromFavorites}: FavoriteListProps): JSX.Element => {
	return (
		<main>
			<h1>Favorites List</h1>
			<section className='favorites'>
			{favorites &&
            favorites.map(
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
				<ul>
					<li key={bank.data.CERT}>
                  {
                    <>
                      <p>{bank.data.NAME}</p>
					  <FaTrash onClick={() => removeFromFavorites(bank.data.CERT)}/>
                      <p>{bank.data.ADDRESS}</p>
                      <p>{`${bank.data.CITY},${bank.data.STNAME} ${bank.data.ZIP}`}</p>
                      <p>{bank.data.WEBADDR}</p>
                    </>
                  }
                </li>
				</ul>
               
              )
            )}
		   </section>
	
		</main>
		
	)
}

export default FavoriteList; 