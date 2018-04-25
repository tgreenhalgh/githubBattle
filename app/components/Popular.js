var React = require('react');
var PropTypes = require('prop-types');

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
    };

    // sets `this` to the component instance itself
    this.updateLanguage = this.updateLanguage.bind(this);
  }

  updateLanguage(lang) {
    // `this` is the component instance itself which has a
    this.setState(() => ({ selectedLanguage: lang }));
  }

  render() {
    return (
      <div>
        <SelectLanguage
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage}
        />
      </div>
    );
  }
}

module.exports = Popular;
