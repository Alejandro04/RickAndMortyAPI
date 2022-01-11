import { Component } from 'react';

const styles = {
  characters: {
    border: 'solid 1px #eee',
    boxShadow: '0 5px 5px rgb(0, 0, 0, 0.1)',
    maxWidth: '100%',
    padding: '10px 15px',
    borderRadius: '5px'
  },
  img: {
    width: '100%'
  },
  details:  {
    padding: 0,
    margin: 0
  },
  description: {
    fontWeight: 'bold',
    fontSize: '18px',
    marginTop: '5px'
  }
}

class Character extends Component {
  render() {
    const { character } = this.props;
    return (
      <div style={styles.characters}>
        <img style={styles.img} alt={character.name} src={character.image}></img>
        <p style={styles.description}> {character.name} </p>
        <div>
          <p style={styles.details}> Status: {character.status} </p>
          <p style={styles.details}> Species: {character.species} </p>
        </div>
      </div>
    )
  }
}

export default Character;