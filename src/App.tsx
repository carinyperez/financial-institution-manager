import React from 'react';
import logo from './logo.svg';
import './App.css';
import HomePage from './Homepage';
import {FaSearch} from 'react-icons/fa';

function App() {
  return (
    <div className="App">
      <header className="App-header">
	  	<h1>Financial Institution Manager</h1>
		<nav className='header-search'>
			<input type='text' name='search' value='' placeholder='search'/>
			<FaSearch/>
		</nav>
      </header>
	  <HomePage/>
    </div>
  );
}

export default App;
