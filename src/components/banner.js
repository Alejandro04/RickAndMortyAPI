import { Component } from 'react';

const styles = {
  banner: {
    width: '100%',
    textAlign: 'center',
    height: '300px',
    background: '#eee',
  },
  title: {
    margin: 'auto',
    lineHeight: '250px',
    color: '#424242'
  }
}

class Banner extends Component {
  render() {
    return (
      <div style={styles.banner}>
        <h1 style={styles.title}>Rick and Morty</h1>
      </div>
    )
  }
}

export default Banner;