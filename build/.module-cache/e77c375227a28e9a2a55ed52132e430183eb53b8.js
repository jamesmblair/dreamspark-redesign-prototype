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

var DreamSpark = React.createClass({displayName: 'DreamSpark',
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
			React.createElement("li", null, React.createElement("a", {href: "#", onClick: this.signOut}, "Sign Out"))
		) : '';

		return (
			React.createElement("div", null, 
				React.createElement("nav", {className: "navbar navbar-inverse", role: "navigation", style: { 'margin-bottom' : '0', 'border-radius' : '0'}}, 
					React.createElement("div", {className: "container-fluid"}, 
						React.createElement("div", {className: "navbar-header"}, 
					      React.createElement("a", {className: "navbar-brand", href: "#"}, "DreamSpark")
					    ), 

					    React.createElement("div", {className: "collapse navbar-collapse", id: "bs-example-navbar-collapse-1"}, 
					        React.createElement("ul", {className: "nav navbar-nav navbar-right"}, 
						        signOut
					        )
					    )
					)
				), 

				React.createElement("div", {id: "dreamspark-page-wrapper", className: "container-fluid"}, 
					page
				)
			)
		);
	},
	createPages: function () {
		var auth = {
			signIn : this.signIn,
			signOut : this.signOut
		}

		this.pages = this.pages ||  {
			'home' : React.createElement(HomePage, {navigate: this.handleNavigate, auth: auth}),
			'login' : React.createElement(LoginPage, {navigate: this.handleNavigate, auth: auth}),
			'loginEmail' : React.createElement(LoginEmailPage, {navigate: this.handleNavigate, auth: auth}),
			'register' : React.createElement(RegistrationPage, {navigate: this.handleNavigate, auth: auth}),
			'registerEmail' : React.createElement(RegistrationEmailPage, {navigate: this.handleNavigate, auth: auth}),
			'browse' : React.createElement(BrowsePage, {navigate: this.handleNavigate, auth: auth}),
			'details' : React.createElement(DetailsPage, {navigate: this.handleNavigate, auth: auth})
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

var HomePage = React.createClass({displayName: 'HomePage',
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
			return React.createElement("li", {role: "presentation", className: navItemClass}, React.createElement("a", {href: "#", 'data-index': idx, onClick: this.handleNavSelect}, item.text));
		}, this);

		var selectedItem = items[selectedItemIndex];

		var lipsum = LIPSUM.substring (0, 400) + '...';

		return (
			React.createElement("div", {id: "home-page-wrapper"}, 
				React.createElement("div", {className: "row"}, 
					React.createElement("div", {className: "col-md-2", style: { padding : '0'}}, 
						React.createElement("ul", {className: "nav nav-pills nav-stacked", role: "tablist"}, 
							navItemNodes
						)
					), 
					React.createElement("div", {className: "col-md-10", style: { padding : '0'}}, 
						React.createElement(Jumbotron, null, 
							React.createElement("div", {style: { position : 'relative', height : '100%'}}, 
								React.createElement("h1", {style: { 'margin-top' : '0'}}, selectedItem.detailText), 
								React.createElement("div", {id: "button-wrapper", style: { position : 'absolute', bottom : '10px', left : '10px'}}, 
									React.createElement("button", {className: "wire-btn btn btn-lg", onClick: this.handleRegisterClick}, "Register"), 
									React.createElement("button", {className: "wire-btn btn btn-lg", onClick: this.handleLoginClick, style: { 'margin-left' : '1em'}}, "Log In")
								)
							)
						)
					)
				), 
				React.createElement("div", {className: "row"}, 
					React.createElement("div", {className: "col-md-4"}, 
						React.createElement("img", {src: "/img/microsoft-watch.jpg", style: { 'width' : '100%'}}), 
						React.createElement("p", {style: { 'text-align' : 'justify'}}, lipsum)
					), 
					React.createElement("div", {className: "col-md-4"}, 
						React.createElement("img", {src: "/img/ms_brands.jpg", style: { 'width' : '100%'}}), 
						React.createElement("p", {style: { 'text-align' : 'justify'}}, lipsum)
					), 
					React.createElement("div", {className: "col-md-4"}, 
						React.createElement("img", {src: "/img/microsoft_store.jpg", style: { 'width' : '100%'}}), 
						React.createElement("p", {style: { 'text-align' : 'justify'}}, lipsum)
					)
				)
			)
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

var LoginPage = React.createClass({displayName: 'LoginPage',
	render: function() {
		return (
			React.createElement("div", null, 
				React.createElement("form", {className: "login-form", action: 'javascript:void(0);'}, 
					React.createElement("button", {onClick: this.handleItemClick, className: "btn btn-lg btn-primary btn-block", style: { 'margin-top' : '10px'}, 'data-nav': "oauth"}, "Sign In With Microsoft"), 
					React.createElement("button", {onClick: this.handleItemClick, className: "btn btn-lg btn-primary btn-block", style: { 'margin-top' : '10px'}, 'data-nav': "oauth"}, "Sign In With Google"), 
					React.createElement("button", {onClick: this.handleItemClick, className: "btn btn-lg btn-primary btn-block", style: { 'margin-top' : '10px'}, 'data-nav': "oauth"}, "Sign In With Facebook"), 
					React.createElement("button", {onClick: this.handleItemClick, className: "btn btn-lg btn-primary btn-block", style: { 'margin-top' : '10px'}, 'data-nav': "oauth"}, "Sign In With Twitter"), 
					React.createElement("button", {onClick: this.handleItemClick, className: "btn btn-lg btn-primary btn-block", style: { 'margin-top' : '10px'}, 'data-nav': "email"}, "Sign In With Email")
				)
			)
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

var LoginEmailPage = React.createClass({displayName: 'LoginEmailPage',
	render: function() {
		return (
			React.createElement("div", null, 
				React.createElement("form", {className: "login-form", action: 'javascript:void(0);'}, 
					React.createElement("h2", {style: { 'margin-bottom' : '10px'}}, "Please sign in"), 
			        React.createElement("input", {ref: "email", type: "email", className: "form-control", placeholder: "Email address", required: "", autofocus: ""}), 
			        React.createElement("input", {ref: "password", type: "password", className: "form-control", placeholder: "Password", required: ""}), 
			        React.createElement("button", {onClick: this.handleLoginClick, className: "btn btn-lg btn-primary btn-block", style: { 'margin-top' : '10px'}}, "Sign in")
				)
			)
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

var RegistrationPage = React.createClass({displayName: 'RegistrationPage',
	render: function() {
		return (
			React.createElement("div", null, 
				React.createElement("form", {className: "login-form", action: 'javascript:void(0);'}, 
					React.createElement("button", {onClick: this.handleItemClick, className: "btn btn-lg btn-primary btn-block", style: { 'margin-top' : '10px'}, 'data-nav': "oauth"}, "Register With Microsoft"), 
					React.createElement("button", {onClick: this.handleItemClick, className: "btn btn-lg btn-primary btn-block", style: { 'margin-top' : '10px'}, 'data-nav': "oauth"}, "Register With Google"), 
					React.createElement("button", {onClick: this.handleItemClick, className: "btn btn-lg btn-primary btn-block", style: { 'margin-top' : '10px'}, 'data-nav': "oauth"}, "Register With Facebook"), 
					React.createElement("button", {onClick: this.handleItemClick, className: "btn btn-lg btn-primary btn-block", style: { 'margin-top' : '10px'}, 'data-nav': "oauth"}, "Register With Twitter"), 
					React.createElement("button", {onClick: this.handleItemClick, className: "btn btn-lg btn-primary btn-block", style: { 'margin-top' : '10px'}, 'data-nav': "email"}, "Register With Email")
				)
			)
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

var RegistrationEmailPage = React.createClass({displayName: 'RegistrationEmailPage',
	render: function() {
		return (
			React.createElement("div", null, 
				React.createElement("form", {className: "login-form", action: 'javascript:void(0);'}, 
					React.createElement("h2", {style: { 'margin-bottom' : '10px'}}, "Please sign in"), 
			        React.createElement("input", {ref: "email", type: "email", className: "form-control", placeholder: "Email address", required: "", autofocus: ""}), 
			        React.createElement("input", {ref: "password", type: "password", className: "form-control", placeholder: "Password", required: ""}), 
			        React.createElement("button", {onClick: this.handleLoginClick, className: "btn btn-lg btn-primary btn-block", style: { 'margin-top' : '10px'}}, "Register")
				)
			)
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

var BrowsePage = React.createClass({displayName: 'BrowsePage',
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
	render: function() {
		return (
			React.createElement("div", {style: { 'text-align' : 'center'}}, 
				React.createElement("div", {className: "row"}, 
					React.createElement("div", {className: "col-md-8 col-md-offset-2"}, 
						React.createElement("br", null), 
						React.createElement("ul", {className: "nav nav-pills", role: "tablist"}, 
							React.createElement("li", {role: "presentation", className: "active"}, React.createElement("a", {href: ""}, "Development Tools")), 
							React.createElement("li", {role: "presentation"}, React.createElement("a", {href: ""}, "Productivity Applications")), 
							React.createElement("li", {role: "presentation"}, React.createElement("a", {href: ""}, "Server Software")), 
							React.createElement("li", {role: "presentation"}, React.createElement("a", {href: ""}, "Operating Systems"))
						), 
							React.createElement("div", {className: "slidingThing slider responsive"}, 
								React.createElement("div", null, React.createElement("img", {src: "/img/products/1.jpg"})), 
								React.createElement("div", null, React.createElement("img", {src: "/img/products/2.jpg"})), 
								React.createElement("div", null, React.createElement("img", {src: "/img/products/3.jpg"})), 
								React.createElement("div", null, React.createElement("img", {src: "/img/products/4.jpg"})), 
								React.createElement("div", null, React.createElement("img", {src: "/img/products/5.png"})), 
								React.createElement("div", null, React.createElement("img", {src: "/img/products/6.jpg"})), 
								React.createElement("div", null, React.createElement("img", {src: "/img/products/7.jpg"})), 
								React.createElement("div", null, React.createElement("img", {src: "/img/products/8.jpg"})), 
								React.createElement("div", null, React.createElement("img", {src: "/img/products/9.jpg"}))
							)
					)
				)
			)
		);
	}
});

var DetailsPage = React.createClass({displayName: 'DetailsPage',
	render: function() {
		var productTitle = this.props.productTitle || 'Software Product Title';

		var Jumbotron = ReactBootstrap.Jumbotron;

		return (
			React.createElement("div", null, 
				React.createElement("div", {className: "row"}, 
					React.createElement("div", {class: "col-md-12"}, 
						React.createElement(Jumbotron, null, 
							React.createElement("div", {className: "col-md-4"}, 
								React.createElement("img", {style: { 'width' : '80%', 'height' : '80%', 'margin' : '20px', 'border' : '1px solid #000000'}, src: "http://placehold.it/350x350"})
							), 
							React.createElement("div", {className: "col-md-8", style: { 'height' : '100%'}}, 
								React.createElement("div", {style: { 'position' : 'relative', 'height' : '100%'}}, 
									React.createElement("h1", null, productTitle), 
									React.createElement("div", {id: "button-wrapper", style: { position : 'absolute', bottom : '10px', left : '10px'}}, 
										React.createElement("button", {className: "btn btn-lg"}, "Download Now")
									)
								)
							)
						)
					)
				), 
				React.createElement("div", {className: "row", style: { 'margin-bottom' : '20px'}}, 
					React.createElement("div", {className: "col-md-6", style: { 'border-right' : '1px solid #000000'}}, 
						React.createElement("h3", null, "Notes"), 
						React.createElement("p", {style: { 'text-align' : 'justify'}}, LIPSUM)
					), 
					React.createElement("div", {className: "col-md-6"}, 
						React.createElement("h3", null, "Other Downloads"), 
						React.createElement("p", {style: { 'text-align' : 'justify'}}, 
							React.createElement("ul", {style: { 'list-style' : 'none', 'padding-left' : '0'}}, 
								React.createElement("li", null, React.createElement("a", {href: "javascript:void(0);"}, "Windows (x86)")), 
								React.createElement("li", null, React.createElement("a", {href: "javascript:void(0);"}, "Windows (x64)")), 
								React.createElement("li", null, React.createElement("a", {href: "javascript:void(0);"}, "Mac OS X")), 
								React.createElement("li", null, React.createElement("a", {href: "javascript:void(0);"}, "Linux (x86)")), 
								React.createElement("li", null, React.createElement("a", {href: "javascript:void(0);"}, "Linux (x64)"))
							)
						)
					)
				)
			)
		);
	}
});
