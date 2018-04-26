const React = require('react');
const PropTypes = require('prop-types');
const api = require('../utils/api');

function SelectLanguage(props) {
  let languages = ['All', 'JavaScript', 'Ruby', 'Java', 'Go', 'Python'];

  return (
    <ul className="languages">
      {languages.map(lang => (
        <li
          style={lang === props.selectedLanguage ? { color: '#d0021b' } : null}
          // bind - already set context, so null, then lang as first param
          // bind passes the function, when onClick happens, it is invoked
          onClick={props.onSelect.bind(null, lang)}
          key={lang}
        >
          {lang}
        </li>
      ))}
    </ul>
  );
}

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: 'All',
      repos: null,
    };

    // sets `this` to the component instance itself
    this.updateLanguage = this.updateLanguage.bind(this);
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage(lang) {
    // `this` is the component instance itself which has a
    this.setState(() => ({ selectedLanguage: lang }));

    api
      .fetchPopularRepos(lang)
      .then(repos => this.setState(() => ({ repos })))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <SelectLanguage
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage}
        />
        State: {JSON.stringify(this.state.repos, null, 2)}
      </div>
    );
  }
}

module.exports = Popular;
