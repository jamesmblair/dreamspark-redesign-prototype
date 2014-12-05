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
					      <a className="navbar-brand" href="#">Microsoft DreamSpark</a>
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
		this.setState({ 
			authenticated : true 
		}, function () {
			if (redirect) {
				window.location.hash = redirect;
			}
		});
	},
	signOut: function () {
		this.setState({ 
			authenticated : false 
		}, function () {
			window.location.hash = 'home';
			alert ('You\'ve been signed out!');
		});
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

		var pillsStyle = {
			'padding' : '1.5em 0',
			'font-size' : '1.5em',
			'font-weight' : 'bold',
			'text-align' : 'right'
		};

		var paragraphs = [
			"DreamSpark is simple: it's all about giving students Microsoft professional-level developer and designer tools at no cost so that students can chase their dreams and create the next big breakthrough in technology - or just get a head start on their career.",
			"DreamSpark helps educators teach the latest technologies and experiment in research. Microsoft knows that to make learning more motivating, relevant, and engaging for today's students requires a diverse set of resources. DreamSpark gives educators the resources to ensure their classrooms always have the latest technologies to challenge, motivate, and keep students engaged in new ways.",
			"DreamSpark is also a subscription for Academic Institutions: it provides a cost-effective way to put Microsoft developer tools, platforms and servers in labs and classrooms, and on their students’ and faculty’s computers for learning and research purposes. It reduces lab costs and teaching budgets."
		];

		return (
			<div id='home-page-wrapper'>
				<div className='row image-row'>
					<div className='col-md-2' style={pillsStyle}>
						<ul className="nav nav-pills nav-stacked" role="tablist">
							{navItemNodes}
						</ul>
					</div>
					<div className='col-md-10' style={{ padding : '0' }}>
						<Jumbotron>
							<div style={{ position : 'relative', height : '100%' }}>
								<h1 style={{ 'margin-top' : '0'}}>{selectedItem.detailText}</h1>
								<div id='button-wrapper' style={{ position : 'absolute', bottom : '10px', left : '10px' }}>
									<button className='btn btn-lg btn-default' onClick={this.handleRegisterClick}>Register</button>
									<button className='btn btn-lg btn-default' onClick={this.handleLoginClick} style={{ 'margin-left' : '1em' }} >Log In</button>
								</div>
							</div>
						</Jumbotron>
					</div>
				</div>
				<div className='row'>
					<div className='col-md-4'>
						<img src='/img/microsoft-watch.jpg' style={{ 'width' : '100%' }} />
						<p style={{ 'text-align' : 'justify' }}>{paragraphs[0]}</p>
					</div>
					<div className='col-md-4'>
						<img src='/img/ms_brands.jpg' style={{ 'width' : '100%' }} />
						<p style={{ 'text-align' : 'justify' }}>{paragraphs[1]}</p>
					</div>
					<div className='col-md-4'>
						<img src='/img/microsoft_store.jpg' style={{ 'width' : '100%' }} />
						<p style={{ 'text-align' : 'justify' }}>{paragraphs[2]}</p>
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
	componentDidMount: function() {
		$('.responsive').slick({
			dots: true,
			infinite: false,
			speed: 300,
			slidesToShow: 4,
			slidesToScroll: 4,
			responsive: [
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
						infinite: true,
						dots: true
					}
				},
				{
					breakpoint: 600,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2
					}
				},
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				}
			]
		});
	},
	getInitialState: function() {
		return {
			activeTabIndex : 0 
		};
	},
	render: function() {
		var tabs = [
			'Development Tools',
			'Productivity Applications',
			'Server Software',
			'Operating Systems'
		];

		var tabNodes = tabs.map(function (t, i) {
			var handleTabClick = function () { 
				this.setState({ activeTabIndex : i });
			}.bind(this);

			var className = this.state.activeTabIndex === i ? 'active' : '';
			return <li role="presentation" className={className}><a style={{ 'cursor' : 'pointer' }} onClick={handleTabClick}>{t}</a></li>;
		}.bind(this));

		return (
			<div style={{ 'text-align' : 'center' }}>
				<div className='row'>
					<div className='col-md-8 col-md-offset-2'>
						<br />
						<ul className="nav nav-pills" role="tablist" style={{ 'margin-bottom' : '10px' }}>
							{tabNodes}
						</ul>
							<div className="slidingThing slider responsive">
								<div><img style={{ 'cursor' : 'pointer' }} onClick={this.handleItemClick} src="/img/products/1.jpg"/></div>
								<div><img style={{ 'cursor' : 'pointer' }} onClick={this.handleItemClick} src="/img/products/2.jpg"/></div>
								<div><img style={{ 'cursor' : 'pointer' }} onClick={this.handleItemClick} src="/img/products/3.jpg"/></div>
								<div><img style={{ 'cursor' : 'pointer' }} onClick={this.handleItemClick} src="/img/products/4.jpg"/></div>
								<div><img style={{ 'cursor' : 'pointer' }} onClick={this.handleItemClick} src="/img/products/5.png"/></div>
								<div><img style={{ 'cursor' : 'pointer' }} onClick={this.handleItemClick} src="/img/products/6.jpg"/></div>
								<div><img style={{ 'cursor' : 'pointer' }} onClick={this.handleItemClick} src="/img/products/7.jpg"/></div>
								<div><img style={{ 'cursor' : 'pointer' }} onClick={this.handleItemClick} src="/img/products/8.jpg"/></div>
								<div><img style={{ 'cursor' : 'pointer' }} onClick={this.handleItemClick} src="/img/products/9.jpg"/></div>
							</div>
					</div>
				</div>
			</div>
		);
	},
	handleItemClick: function () {
		this.props.navigate('details');
	}
});

var DetailsPage = React.createClass({
	render: function() {
		var productTitle = this.props.productTitle || 'Visual Studio 2015';

		var Jumbotron = ReactBootstrap.Jumbotron;

		var vsText = 'Visual Studio is a comprehensive collection of tools and services for developing applications that target the desktop, the web, devices, and the cloud. Whether you are creating your first Windows Store app, or building a website to support the latest browsers, you can leverage your existing skills with Visual Studio’s state-of-the-art development environment for .NET languages, HTML/JavaScript, and C++. For teams working across multiple platforms, Visual Studio provides a flexible collaboration environment for that welcomes connection with other development tools, such as Eclipse and Xcode.';

		return (
			<div>
				<div className='row detail-jumbo-row'>
					<div class='col-md-12'>
						<Jumbotron>
							{/*<div className='col-md-4'>
								<img style={{ 'width' : '80%', 'height' : '80%', 'margin' : '20px', 'border' : '1px solid #000000' }} src='http://placehold.it/350x350' />
							</div>*/}
							<div className='col-md-12' style={{ 'height' : '100%' }}>
								<div style={{ 'position' : 'relative', 'height' : '100%' }}>
									<h1>{productTitle}</h1>
									<div id='button-wrapper' style={{ position : 'absolute', bottom : '10px', left : '10px' }}>
										<button className='btn btn-lg btn-default'>Download Now</button>
									</div>
								</div>
							</div>
						</Jumbotron>
					</div>
				</div>
				<div className='row' style={{ 'margin-bottom' : '20px' }}>
					<div className='col-md-6' style={{ 'border-right' : '1px solid #000000' }}>
						<h3>Application Development</h3>
						<p style={{ 'text-align' : 'justify' }}>{vsText}</p>
					</div>
					<div className='col-md-6'>
						<h3>Hardware Requirements</h3>
						<p style={{ 'text-align' : 'justify' }}>
							<ul>
								<li>1.6 GHz or faster processor</li>
								<li>1 GB of RAM (1.5 GB if running on a virtual machine)</li>
								<li>20 GB of available hard disk space</li>
								<li>5400 RPM hard disk drive</li>
								<li>DirectX 9-capable video card that runs at 1024 x 768 or higher display resolution</li>
							</ul>
						</p>
					</div>
				</div>
			</div>
		);
	}
});
