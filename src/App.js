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
    borderRadius: '50px'
  },
  dropdowsContainer: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  spinner: {
    margin: 'auto',
    textAlign: 'center',
    marginTop: '40px'
  },
  actionsContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: '40px',
    fontSize: '20px',
    fontWeight: 'bold'
  },
  nextBtn: {
    marginLeft: '10px',
    color: '#FF452B'
  },
  prevBtn: {
    color: '#FF452B'
  },
  textField: {
    color:'#424242'
  }
}


class App extends Component {
  state = {
    characters: [],
    spinner: true,
    nextFlag: true,
    prevFlag: false,
    page: 1
  }

  componentDidMount() {
    this.getAllCharacters();
  }

  async getAllCharacters() {
    const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${this.state.page}`);
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

  Paginate = (value) => {
    if (value === 'next') {
      this.setState({ page: this.state.page + 1, prevFlag: true }, () => {
        this.getAllCharacters();
      });
    }
    if (value === 'prev') {
      if (this.state.page > 1) {
        this.setState({ page: this.state.page - 1 }, () => {
          this.getAllCharacters();
        });
      }

      if (this.state.page === 1) {
        this.setState({ prevFlag: false })
      }
    }
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
              renderInput={(params) =>
                <TextField {...params}
                  placeholder="Search for name"
                  style={styles.textField}
                />}
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
          <div style={styles.actionsContainer}>
            {this.state.prevFlag &&
              <div onClick={() => this.Paginate('prev')} style={styles.prevBtn}>
                Prev
              </div>
            }
            {this.state.nextFlag &&
              <div onClick={() => this.Paginate('next')} style={styles.nextBtn}>
                Next
              </div>
            }
          </div>
        </Layout>
      </div>
    )
  }
}

export default App;