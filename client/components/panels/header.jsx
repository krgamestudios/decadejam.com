import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
	render() {
		return (
			<header className='page-header centered'>
				<Link to='/'>Decade Jam!</Link>
			</header>
		);
	}
};

export default Header;
