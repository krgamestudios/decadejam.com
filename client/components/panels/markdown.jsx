import React from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown/with-html';
import PropTypes from 'prop-types';

class Markdown extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			content: props.content || ''
		};

		if (!props.content) {
			if (!props.url) {
				throw new "Markdown requires either content or a url prop";
			}

			fetch(props.url)
				.then(res => {
					if (res.ok) {
						res.text().then(text => this.setState({ content: text }));
					} else {
						res.error().text().then(text => {
							throw text;
						});
					}
				});
		}
	}

	render() {
		if (this.state.content) {
			return (
				<ReactMarkdown source={this.state.content} escapeHtml={false} {...this.props} />
			);
		}

		return (
			<p className='centered'>Loading markdown...</p>
		);
	}
};

Markdown.propTypes = {
	content: PropTypes.string,
	url: PropTypes.string,
};

export default Markdown;
