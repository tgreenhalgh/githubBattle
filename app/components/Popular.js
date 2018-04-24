var React = require('react');

class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: 'All',
    };
  }

  render() {
    let languages = ['All', 'JavaScript', 'Ruby', 'Java', 'Go', 'Python'];
    return (
      <ul className="languages">
        {languages.map(lang => <li key={lang}>{lang}</li>)}
      </ul>
    );
  }
}

module.exports = Popular;
