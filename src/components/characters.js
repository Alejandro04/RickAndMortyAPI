import { Component } from 'react';
import Character from './character';

class Characters extends Component {
  render() {
    const { characters } = this.props;  
    return (
      <div className="charactersContainer">
        {characters.length > 0 && characters.map(ch =>
          <Character
            key={ch.id}
            character={ch}
          />
        )}
         {!characters.length &&
          <Character
            key={characters.id}
            character={characters}
          />}
      </div>
    )
  }
}

export default Characters;