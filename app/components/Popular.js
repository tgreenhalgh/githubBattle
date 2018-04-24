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
    this.setState(() => ({ selectedLanguage: lang }));
  }

  render() {
    let languages = ['All', 'JavaScript', 'Ruby', 'Java', 'Go', 'Python'];
    return (
      <ul className="languages">
        <p>Selected language: {this.state.selectedLanguage}</p>
        {languages.map(
          lang => (
            // NOTE: in a new function, so `this` is undefined
            // bind - alreadt set context, so null, then lang as first param
            // bind passes the function, when onClick happens, it is invoked
            <li onClick={this.updateLanguage.bind(null, lang)} key={lang}>
              {lang}
            </li>
          ),
          this, // second arg for map - passes the context into map
        )}
      </ul>
    );
  }
}

module.exports = Popular;
