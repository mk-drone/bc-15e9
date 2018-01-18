
class User extends React.Component {
    render() {
        return (
            <div className="user">
                <img className="userAvatar" src={this.props.user.avatar_url}/>
                <a className="userLogin" href={this.props.user.html_url} target="_blank">{this.props.user.login}</a>
            </div>
        );
    }
}
class UsersList extends React.Component {

    constructor(){
        super()
    }
 
    get users(){
        return this.props.users.map(user => <User key={user.id} user={user} />);
    }

    render(){
        return (
            <div className="userList">
                {this.users}
            </div>
        );
    }
};

class App extends React.Component {

    constructor(){
        super();
        this.state ={
            searchText: '',
            users: []
        };
    }

    onChange = (e) => {
        this.setState({searchText: e.target.value});
    }

    submit = (e) => {
        e.preventDefault();
        const {searchText} = this.state;
        const url = `https://api.github.com/search/users?q=${searchText}`;

        fetch(url)
            .then(response=> response.json())
            .then(responseJson => { 
                if (responseJson.items.length > 0) {
                    this.setState({users: responseJson.items, error:null}) 
                } else {
                    this.setState({error: 'not-found'});
                }
            });
    }

    render() {
        return (
            <div>
                <form onSubmit={event=>this.submit(event)}>
                    <label className="searchLabel" htmlFor="searchText">Search by user name </label>
                    <br/>
                    <input className={this.state.error} type="text" id="searchText" onChange={e=>this.onChange(e)} value= {this.state.searchText}/>
                </form>
                <UsersList users={this.state.users} />
            </div>
        );
    }
};

ReactDOM.render(<App />, document.getElementById('root'));
