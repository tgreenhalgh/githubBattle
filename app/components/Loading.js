const React = require('react');
const PropTypes = require('prop-types');

const styles = {
  content: {
    textAlign: 'center',
    fontSize: '35px',
  },
};

class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.loading,
    };
  }
  render() {
    return <p style={styles.content}>{this.state.text}</p>;
  }
}

Loading.propTypes = {
  text: PropTypes.string.isRequired,
};

Loading.defaultProps = {
  text: 'Loading',
};

module.exports = Loading;
