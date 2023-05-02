import {FaSearch} from 'react-icons/fa';
import {useState}from 'react';

interface handleSearchProps {
	handleSearch: (name: string | undefined) => void,
}


const Search = ({handleSearch}:handleSearchProps): JSX.Element => {
	const [name, setName] = useState<string>();

	return (
		<main>
		<section>
			<nav className='header-search'>
				<input type='text' name='search' value={name || ''} placeholder='search'
				onChange={(e) => setName(e.target.value)}/>
				<FaSearch onClick={() => handleSearch(name)}/>
			</nav>
		</section>
		</main>
	)
}

export default Search; 