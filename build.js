"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var User = function (_React$Component) {
    _inherits(User, _React$Component);

    function User() {
        _classCallCheck(this, User);

        return _possibleConstructorReturn(this, (User.__proto__ || Object.getPrototypeOf(User)).apply(this, arguments));
    }

    _createClass(User, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "user" },
                React.createElement("img", { className: "userAvatar", src: this.props.user.avatar_url }),
                React.createElement(
                    "a",
                    { className: "userLogin", href: this.props.user.html_url, target: "_blank" },
                    this.props.user.login
                )
            );
        }
    }]);

    return User;
}(React.Component);

var UsersList = function (_React$Component2) {
    _inherits(UsersList, _React$Component2);

    function UsersList() {
        _classCallCheck(this, UsersList);

        return _possibleConstructorReturn(this, (UsersList.__proto__ || Object.getPrototypeOf(UsersList)).call(this));
    }

    _createClass(UsersList, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "userList" },
                this.users
            );
        }
    }, {
        key: "users",
        get: function get() {
            return this.props.users.map(function (user) {
                return React.createElement(User, { key: user.id, user: user });
            });
        }
    }]);

    return UsersList;
}(React.Component);

;

var App = function (_React$Component3) {
    _inherits(App, _React$Component3);

    function App() {
        _classCallCheck(this, App);

        var _this3 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

        _this3.onChange = function (e) {
            _this3.setState({ searchText: e.target.value });
        };

        _this3.submit = function (e) {
            e.preventDefault();
            var searchText = _this3.state.searchText;

            var url = "https://api.github.com/search/users?q=" + searchText;

            fetch(url).then(function (response) {
                return response.json();
            }).then(function (responseJson) {
                if (responseJson.items.length > 0) {
                    _this3.setState({ users: responseJson.items, error: null });
                } else {
                    _this3.setState({ error: 'not-found' });
                }
            });
        };

        _this3.state = {
            searchText: '',
            users: []
        };
        return _this3;
    }

    _createClass(App, [{
        key: "render",
        value: function render() {
            var _this4 = this;

            return React.createElement(
                "div",
                null,
                React.createElement(
                    "form",
                    { onSubmit: function onSubmit(event) {
                            return _this4.submit(event);
                        } },
                    React.createElement(
                        "label",
                        { className: "searchLabel", htmlFor: "searchText" },
                        "Search by user name "
                    ),
                    React.createElement("br", null),
                    React.createElement("input", { className: this.state.error, type: "text", id: "searchText", onChange: function onChange(e) {
                            return _this4.onChange(e);
                        }, value: this.state.searchText })
                ),
                React.createElement(UsersList, { users: this.state.users })
            );
        }
    }]);

    return App;
}(React.Component);

;

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));
