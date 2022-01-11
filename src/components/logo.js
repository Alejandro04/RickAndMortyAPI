import { Component } from 'react';

const styles = {
  logo: {
    fontWeight: '700',
    fontSize: '2rem',
    color: '#FF452B'
  },
}

class Logo extends Component {
  render() {

    return (
      <div style={styles.logo}>
        Test for Houm
      </div>
    )
  }
}

export default Logo;