const React = require('react');
const queryString = require('query-string');
const api = require('../utils/api');
const Link = require('react-router-dom').Link;

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true,
    };
  }
  componentDidMount() {
    const players = queryString.parse(this.props.location.search);
    api.battle([players.playerOneName, players.playerTwoName]).then(results => {
      if (results === null) {
        return {
          error:
            'Looks like there was an error. Check that boths users exist on Github',
          loading: false,
        };
      }
      this.setState(() => ({
        error: null,
        winner: results[0],
        loser: results[1],
        loading: false,
      }));
    });
  }

  render() {
    let error = this.state.error;
    let winner = this.state.winner;
    let loser = this.state.loser;
    let loading = this.state.loading;

    if (loading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return (
        <div>
          <p>{error}</p>
          <Link to="/battle">Reset</Link>
        </div>
      );
    }

    return <div>{JSON.stringify(this.state, null, 2)}</div>;
  }
}

module.exports = Results;
