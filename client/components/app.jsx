import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import PropTypes from 'prop-types';

//styling
import '../style/shared.css';

//components
import Header from './panels/header';
import Footer from './panels/footer';

import MarkdownWrapper from './pages/markdown-wrapper';

//lazy route loading (with error handling)
const onLoading = (props) => {
	//handle lazy errors/warnings
	if (props.error) {
		lazyProps.setWarning(props.error);
	} else if (props.timedOut) {
		lazyProps.setWarning('Timed Out');
	} else if (props.pastDelay) {
		return (
			<div className='page'>
				<p className='centered'>Loading...</p>
			</div>
		);
	}
	return null;
};

//for the linter
onLoading.propTypes = {
	error: PropTypes.bool,
	timedOut: PropTypes.bool,
	pastDelay: PropTypes.bool,
};

const LazyRoute = (lazyProps) => {
	const component = Loadable({
		loader: lazyProps.component,
		loading: onLoading,
		timeout: 10000
	});

	return <Route {...lazyProps} component={component} />;
};

//the app class
class App extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<Header />
				<div className='central'>
					<Switch>
						<LazyRoute exact path='/' component={() => import('./pages/home')} />

						<LazyRoute path='/signup' component={() => import('./pages/signup')} />
						<LazyRoute path='/login' component={() => import('./pages/login')} />
						<LazyRoute path='/passwordchange' component={() => import('./pages/password-change')} />
						<LazyRoute path='/passwordrecovery' component={() => import('./pages/password-recovery')} />
						<LazyRoute path='/passwordreset' component={() => import('./pages/password-reset')} />

						{ /* eslint-disable-next-line require-await */ }
						<LazyRoute path='/privacypolicy' component={async () => () => <MarkdownWrapper url={require('../markdown/privacy-policy.md').default} />} />
						{ /* eslint-disable-next-line require-await */ }
						<LazyRoute path='/credits' component={async () => () => <MarkdownWrapper url={require('../markdown/credits.md').default} />} />

						<LazyRoute path='*' component={() => import('./pages/page-not-found')} />
					</Switch>
				</div>
				<Footer />
			</BrowserRouter>
		);
	}
}

export default App;
