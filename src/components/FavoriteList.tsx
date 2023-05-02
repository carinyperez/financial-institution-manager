
// add to favorites, remove from favorites, deploy

interface FavoriteListProps {
	favorites: []
}
const FavoriteList = ({favorites}: FavoriteListProps): JSX.Element => {
	return (
		<div>
			Favorites
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
		</div>
	)
}

export default FavoriteList; 