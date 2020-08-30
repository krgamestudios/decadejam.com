import React from 'react';
import Markdown from '../panels/markdown';
import PropTypes from 'prop-types';

class MarkdownWrapper extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='page'>
				<Markdown url={this.props.url} content={this.props.content} />
			</div>
		);
	}
};

MarkdownWrapper.propTypes = {
	content: PropTypes.string,
	url: PropTypes.string,
};

export default MarkdownWrapper;
