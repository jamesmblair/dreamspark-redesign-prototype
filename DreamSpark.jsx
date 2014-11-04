	/**
 * @jsx React.DOM
 */

var LIPSUM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis laoreet nunc non mi consequat, feugiat aliquet orci rhoncus. Aenean id est mauris. Ut dignissim enim id arcu accumsan, eget facilisis justo maximus. Aliquam vitae urna id massa hendrerit bibendum vitae eget sapien. Duis sit amet ipsum non quam pharetra malesuada sit amet at sem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Phasellus augue tortor, tristique sit amet tempor blandit, rutrum et nisi. Nullam blandit risus neque, at efficitur lacus viverra vel. Ut et felis malesuada velit vehicula fermentum. Donec nec lacus consectetur, efficitur leo semper, fringilla dolor. Aliquam congue sapien in posuere varius. Nunc condimentum metus sit amet iaculis blandit. Morbi pellentesque malesuada enim.";

(function () {
	Array.prototype.contains = function (item) {
		var length = this.length;

		for (var i = 0; i < length; i++) {
			if (this[i] === item) {
				return true;
			}
		}
		return false;
	};
}());

var DreamSpark = React.createClass({
	getInitialState: function() {
		return { 
		};
	},
	componentDidMount: function() {
		// var auth = {
		// 	signIn : this.signIn,
		// 	signOut : this.signOut
		// }

		// var pages = {
		// 	'home' : <HomePage navigate={this.handleNavigate} auth={auth} />,
		// 	'login' : <LoginPage navigate={this.handleNavigate} auth={auth} />,
		// 	'loginEmail' : <LoginEmailPage navigate={this.handleNavigate} auth={auth} />,
		// 	'register' : <RegistrationPage navigate={this.handleNavigate} auth={auth} />,
		// 	'registerEmail' : <RegistrationEmailPage navigate={this.handleNavigate} auth={auth} />,
		// 	'browse' : <BrowsePage navigate={this.handleNavigate} auth={auth} />,
		// 	'details' : <DetailsPage navigate={this.handleNavigate} auth={auth} />
		// };

		this.createPages();

		window.addEventListener('hashchange', this.handleHashChange.bind(this), false);

		this.simulateHashChange('#home');		
	},
	render: function() {
		var page = this.state.currentPage;

		var pageKey = window.location.hash.slice(1);

		var greyPages = [ 'login', 'loginEmail', 'register' ];
		if (greyPages.contains(pageKey)) {
			document.body.style['background-color'] ='#eeeeee';
		} else {
			document.body.style['background-color'] = '#ffffff';
		}

		var signOut = this.state.authenticated ? (
			<li><a href="#" onClick={this.signOut}>Sign Out</a></li>
		) : '';

		return (
			<div>
				<nav className='navbar navbar-inverse' role='navigation' style={{ 'margin-bottom' : '0', 'border-radius' : '0' }}>
					<div className='container-fluid'>
						<div className="navbar-header">
					        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
						        <span className="sr-only">Toggle navigation</span>
						        <span className="icon-bar"></span>
						        <span className="icon-bar"></span>
						        <span className="icon-bar"></span>
					        </button>
					      <a className="navbar-brand" href="#">DreamSpark</a>
					    </div>

					    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
					        <ul className="nav navbar-nav navbar-right">
						        {signOut}
					        </ul>
					    </div>
					</div>
				</nav>

				<div id='dreamspark-page-wrapper' className='container-fluid'>
					{page}
				</div>
			</div>
		);
	},
	createPages: function () {
		var auth = {
			signIn : this.signIn,
			signOut : this.signOut
		}

		this.pages = this.pages ||  {
			'home' : <HomePage navigate={this.handleNavigate} auth={auth} />,
			'login' : <LoginPage navigate={this.handleNavigate} auth={auth} />,
			'loginEmail' : <LoginEmailPage navigate={this.handleNavigate} auth={auth} />,
			'register' : <RegistrationPage navigate={this.handleNavigate} auth={auth} />,
			'registerEmail' : <RegistrationEmailPage navigate={this.handleNavigate} auth={auth} />,
			'browse' : <BrowsePage navigate={this.handleNavigate} auth={auth} />,
			'details' : <DetailsPage navigate={this.handleNavigate} auth={auth} />
		};
	},
	handleHashChange: function () {
		var key = window.location.hash.slice(1);

		if (this.requiresAuth(key) && !this.state.authenticated) {
			window.location.hash = '#login';
			return;
		}

		if (!this.pages.hasOwnProperty(key)) key = 'home';

		this.setState({ currentPage : this.pages[key] });
	},
	handleNavigate: function (newHash) {
		window.location.hash = newHash;
	},
	simulateHashChange: function (newUrl) {
		var oldUrl = window.location.hash,
			event = new HashChangeEvent('hashchange', {
				oldURL: oldUrl,
				newURL: newUrl,
			});

		window.dispatchEvent(event);
	},
	signIn: function (redirect) {
		this.setState({ authenticated : true });

		if (redirect) {
			window.location.hash = redirect;
		}
	},
	signOut: function () {
		alert ('You\'ve been signed out!');

		this.setState({ authenticated : false });
		window.location.hash = 'home';
	},
	requiresAuth: function (hash) {
		return ['browse', 'details'].contains(hash);
	}
});

var HomePage = React.createClass({
	getInitialState: function() {
		return {
			selectedItemIndex : 0
		};
	},
	render: function() {
		var Jumbotron = ReactBootstrap.Jumbotron;

		function handleNavSelect(selectedKey) {
			alert('Selected nav item: ' + selectedKey);
		}

		var items = [
			{ text : 'Students', detailText : 'Dream Spark Students' },
			{ text : 'Institutions', detailText : 'Dream Spark Institutions' },
			{ text : 'FAQ', detailText : 'FAQ' }
		];

		var selectedItemIndex = this.state.selectedItemIndex;

		var cx = React.addons.classSet;

		var navItemNodes = items.map(function (item, idx) {
			var navItemClass = cx({ 'active' : idx === selectedItemIndex });
			return <li role='presentation' className={navItemClass}><a href='#' data-index={idx} onClick={this.handleNavSelect}>{item.text}</a></li>;
		}, this);

		var selectedItem = items[selectedItemIndex];

		var lipsum = LIPSUM.substring (0, 400) + '...';

		return (
			<div id='home-page-wrapper'>
				<div className='row'>
					<div className='col-md-2' style={{ padding : '0' }}>
						<ul className="nav nav-pills nav-stacked" role="tablist">
							{navItemNodes}
						</ul>
					</div>
					<div className='col-md-10' style={{ padding : '0' }}>
						<Jumbotron>
							<div style={{ position : 'relative', height : '100%' }}>
								<h1 style={{ 'margin-top' : '0' }}>{selectedItem.detailText}</h1>
								<div id='button-wrapper' style={{ position : 'absolute', bottom : '10px', left : '10px' }}>
									<button className='btn btn-lg' onClick={this.handleRegisterClick}>Register</button>
									<button className='btn btn-lg' onClick={this.handleLoginClick} style={{ 'margin-left' : '1em' }} >Log In</button>
								</div>
							</div>							
						</Jumbotron>
					</div>
				</div>
				<div className='row'>
					<div className='col-md-4'>
						<img src='http://placehold.it/450x180' style={{ 'width' : '100%' }} />
						<p style={{ 'text-align' : 'justify' }}>{lipsum}</p>
					</div>
					<div className='col-md-4'>
						<img src='http://placehold.it/450x180' style={{ 'width' : '100%' }} />
						<p style={{ 'text-align' : 'justify' }}>{lipsum}</p>
					</div>
					<div className='col-md-4'>
						<img src='http://placehold.it/450x180' style={{ 'width' : '100%' }} />
						<p style={{ 'text-align' : 'justify' }}>{lipsum}</p>
					</div>
				</div>
			</div>
		);
	},
	handleNavSelect: function (e) {
		var index = parseInt(e.target.dataset.index, 10);
		this.setState({ selectedItemIndex : index });
	},
	handleRegisterClick: function () {
		this.props.navigate ('register');
	},
	handleLoginClick: function () {
		this.props.navigate ('login');
	}
});

var LoginPage = React.createClass({
	render: function() {
		return (
			<div>
				<form className='login-form' action={'javascript:void(0);'}>
					<button onClick={this.handleItemClick} className='btn btn-lg btn-primary btn-block' style={{ 'margin-top' : '10px' }} data-nav='oauth'>Sign In With Microsoft</button>
					<button onClick={this.handleItemClick} className='btn btn-lg btn-primary btn-block' style={{ 'margin-top' : '10px' }} data-nav='oauth'>Sign In With Google</button>
					<button onClick={this.handleItemClick} className='btn btn-lg btn-primary btn-block' style={{ 'margin-top' : '10px' }} data-nav='oauth'>Sign In With Facebook</button>
					<button onClick={this.handleItemClick} className='btn btn-lg btn-primary btn-block' style={{ 'margin-top' : '10px' }} data-nav='oauth'>Sign In With Twitter</button>
					<button onClick={this.handleItemClick} className='btn btn-lg btn-primary btn-block' style={{ 'margin-top' : '10px' }} data-nav='email'>Sign In With Email</button>
				</form>
			</div>
		);
	},
	handleItemClick: function (e) {
		var nav = e.target.dataset.nav;

		if (nav === 'oauth') {
			this.props.auth.signIn('browse');
		} else if (nav === 'email') {
			this.props.navigate('loginEmail');
		}
	}
});

var LoginEmailPage = React.createClass({
	render: function() {
		return (
			<div>
				<form className='login-form' action={'javascript:void(0);'}>
					<h2 style={{ 'margin-bottom' : '10px' }}>Please sign in</h2>
			        <input ref='email' type='email' className='form-control' placeholder='Email address' required='' autofocus='' />
			        <input ref='password' type='password' className='form-control' placeholder='Password' required='' />
			        <button onClick={this.handleLoginClick} className='btn btn-lg btn-primary btn-block' style={{ 'margin-top' : '10px' }}>Sign in</button>
				</form>
			</div>
		);
	},
	handleLoginClick: function () {
		if (this.refs.email.getDOMNode().value.trim() && this.refs.password.getDOMNode().value.trim()) {
			this.props.auth.signIn('browse');
		} else {
			alert ('Email and password are required fields!');
		}
	}
});

var RegistrationPage = React.createClass({
	render: function() {
		return (
			<div>
				<form className='login-form' action={'javascript:void(0);'}>
					<button onClick={this.handleItemClick} className='btn btn-lg btn-primary btn-block' style={{ 'margin-top' : '10px' }} data-nav='oauth'>Register With Microsoft</button>
					<button onClick={this.handleItemClick} className='btn btn-lg btn-primary btn-block' style={{ 'margin-top' : '10px' }} data-nav='oauth'>Register With Google</button>
					<button onClick={this.handleItemClick} className='btn btn-lg btn-primary btn-block' style={{ 'margin-top' : '10px' }} data-nav='oauth'>Register With Facebook</button>
					<button onClick={this.handleItemClick} className='btn btn-lg btn-primary btn-block' style={{ 'margin-top' : '10px' }} data-nav='oauth'>Register With Twitter</button>
					<button onClick={this.handleItemClick} className='btn btn-lg btn-primary btn-block' style={{ 'margin-top' : '10px' }} data-nav='email'>Register With Email</button>
				</form>
			</div>
		);
	},
	handleItemClick: function (e) {
		var nav = e.target.dataset.nav;

		if (nav === 'oauth') {
			this.props.auth.signIn('browse');
		} else if (nav === 'email') {
			this.props.navigate('registerEmail');
		}
	}
});

var RegistrationEmailPage = React.createClass({
	render: function() {
		return (
			<div>
				<form className='login-form' action={'javascript:void(0);'}>
					<h2 style={{ 'margin-bottom' : '10px' }}>Please sign in</h2>
			        <input ref='email' type='email' className='form-control' placeholder='Email address' required='' autofocus='' />
			        <input ref='password' type='password' className='form-control' placeholder='Password' required='' />
			        <button onClick={this.handleLoginClick} className='btn btn-lg btn-primary btn-block' style={{ 'margin-top' : '10px' }}>Register</button>
				</form>
			</div>
		);
	},
	handleLoginClick: function () {
		if (this.refs.email.getDOMNode().value.trim() && this.refs.password.getDOMNode().value.trim()) {
			this.props.auth.signIn('browse');
		} else {
			alert ('Email and password are required fields!');
		}
	}
});

var BrowsePage = React.createClass({
	render: function() {
		return (
			<div style={{ 'text-align' : 'center' }}>
				<div className='row'>
					<div className='col-md-12'>
						<h2>Dev Tools</h2>
					</div>
				</div>
				<div className='row'>
					<div className='col-md-12'>
						<h2>Design Tools</h2>
					</div>
				</div>
				<div className='row'>
					<div className='col-md-12'>
						<h2>Operating Systems</h2>
					</div>
				</div>
				<div className='row'>
					<div className='col-md-12'>
						<h2>Productivity Software</h2>
					</div>
				</div>
			</div>
		);
	}
});

var DetailsPage = React.createClass({
	render: function() {
		var productTitle = this.props.productTitle || 'Software Product Title';

		var Jumbotron = ReactBootstrap.Jumbotron;

		return (
			<div>
				<div className='row'>
					<div class='col-md-12'>
						<Jumbotron>
							<div className='col-md-4'>
								<img style={{ 'width' : '80%', 'height' : '80%', 'margin' : '20px', 'border' : '1px solid #000000' }} src='http://placehold.it/350x350' />
							</div>
							<div className='col-md-8' style={{ 'height' : '100%' }}>
								<div style={{ 'position' : 'relative', 'height' : '100%' }}>
									<h1>{productTitle}</h1>
									<div id='button-wrapper' style={{ position : 'absolute', bottom : '10px', left : '10px' }}>
										<button className='btn btn-lg'>Download Now</button>
									</div>
								</div>
							</div>
						</Jumbotron>
					</div>
				</div>
				<div className='row' style={{ 'margin-bottom' : '20px' }}>
					<div className='col-md-6' style={{ 'border-right' : '1px solid #000000' }}>
						<h3>Notes</h3>
						<p style={{ 'text-align' : 'justify' }}>{LIPSUM}</p>
					</div>
					<div className='col-md-6'>
						<h3>Other Downloads</h3>
						<p style={{ 'text-align' : 'justify' }}>
							<ul style={{ 'list-style' : 'none', 'padding-left' : '0' }}>
								<li><a href='javascript:void(0);'>Windows (x86)</a></li>
								<li><a href='javascript:void(0);'>Windows (x64)</a></li>
								<li><a href='javascript:void(0);'>Mac OS X</a></li>
								<li><a href='javascript:void(0);'>Linux (x86)</a></li>
								<li><a href='javascript:void(0);'>Linux (x64)</a></li>
							</ul>
						</p>
					</div>
				</div>
			</div>
		);
	}
});