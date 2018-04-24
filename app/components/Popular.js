var React = require('react');

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
    // setState property
    this.setState(lang => {
      selectedLanguage: lang;
    });
  }

  render() {
    let languages = ['All', 'JavaScript', 'Ruby', 'Java', 'Go', 'Python'];
    return (
      <ul className="languages">
        {languages.map(
          lang => (
            // NOTE: in a new function, so `this` is undefined
            <li onClick={this.updateLanguage} key={lang}>
              {lang}
            </li>
          ),
          this, // second arg for map - passes the context
        )}
      </ul>
    );
  }
}

module.exports = Popular;
