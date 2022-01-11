import { Component } from 'react';

const styles = {
  title: {
    marginTop: '40px'
  }
}

class Title extends Component {
  render() {
    return (
      <h4 style={styles.title}>
        Characters
      </h4>
    )
  }
}

export default Title;