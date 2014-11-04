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
		var pages = {
			'home' : <HomePage navigate={this.handleNavigate} />,
			'login' : <LoginPage navigate={this.handleNavigate} />,
			'loginEmail' : <LoginEmailPage navigate={this.handleNavigate} />,
			'register' : <RegistrationPage navigate={this.handleNavigate} />,
			'browse' : <BrowsePage navigate={this.handleNavigate} />,
			'details' : <DetailsPage navigate={this.handleNavigate} />
		};

		window.addEventListener('hashchange', function () {
			var key = window.location.hash.slice(1);

			if (!pages.hasOwnProperty(key)) key = 'home';

			this.setState({ currentPage : pages[key] });
		}.bind(this), false);

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

		return (
			<div id='dreamspark-page-wrapper' className='container-fluid'>
				{page}
			</div>
		);
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
	}
});

var HomePage = React.createClass({
	getInitialState: function() {
		return {
			selectedItemIndex : 0
		};
	},
	render: function() {
		var Nav = ReactBootstrap.Nav,
			NavItem = ReactBootstrap.NavItem,
			Jumbotron = ReactBootstrap.Jumbotron,
			TabbedArea = ReactBootstrap.TabbedArea,
			TabPane = ReactBootstrap.TabPane;

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
								<h1>{selectedItem.detailText}</h1>
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
			this.props.navigate('browse');
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
			this.props.navigate('browse');
		} else {
			alert ('Email and password are required fields!');
		}
	}
});

var RegistrationPage = React.createClass({
	render: function() {
		return (
			<div>
				<h1>RegistrationPage Page!</h1>
			</div>
		);
	}
});

var BrowsePage = React.createClass({
	render: function() {
		return (
			<div>
				<h1>Browse page!</h1>
			</div>
		);
	}
});

var DetailsPage = React.createClass({
	render: function() {
		return (
			<div>
				<h1>Details page!</h1>
			</div>
		);
	}
});