import { Component } from 'react';
import Characters from './components/characters';
import Banner from './components/banner';
import Layout from './components/layout';
import Navbar from './components/navbar';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Loader from "react-loader-spinner";

const styles = {
  autocomplete: {
    margin: 'auto',
  },
  dropdowsContainer: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  spinner: {
    margin: 'auto',
    textAlign: 'center',
    marginTop: '40px'
  }
}


class App extends Component {
  state = {
    characters: [],
    spinner: true
  }

  async componentDidMount() {
    this.getAllCharacters();
  }

  async getAllCharacters() {
    const response = await fetch(`https://rickandmortyapi.com/api/character`);
    const json = await response.json();
    this.setState({ characters: json.results, spinner: false });
  }

  onChangeCharacters = (event, values) => {
    this.setState({ spinner: true });
    if (values) {
      this.onRenderCharacters(values);
    } else {
      this.getAllCharacters();
    }
  }

  async onRenderCharacters(values) {
    const { id } = values;
    const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    const json = await response.json();

    setTimeout(() => {
      this.setState({ characters: json, spinner: false });
    }, 1000);
  }

  render() {
    return (
      <div>
        <Navbar />
        <Banner />
        <Layout>
          <div style={styles.dropdowsContainer}>
            <Autocomplete
              style={styles.autocomplete}
              disablePortal
              id="characters"
              options={this.state.characters ? this.state.characters : []}
              autoHighlight
              sx={{ width: 400 }}
              onChange={this.onChangeCharacters}
              getOptionLabel={(option) => `${option.name}`}
              renderInput={(params) => <TextField {...params} label="Search for name" />}
            />
          </div>
          {
            this.state.spinner === true &&
            <div style={styles.spinner}>
              <Loader
                type="Puff"
                color="#00BFFF"
                height={100}
                width={100}
                timeout={3000}
              />
            </div>
          }
          {
            this.state.spinner === false &&
            <Characters
              characters={this.state.characters}
            />
          }
        </Layout>
      </div>
    )
  }
}

export default App;