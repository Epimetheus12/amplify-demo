import logo from './logo.svg';
import {useState, useEffect} from 'react'
import axios from "axios";
import './App.css';


function App() {
  const BASE_URL = "http://ebdemo-env.eba-4de9vv9b.us-east-2.elasticbeanstalk.com";
  const [state, setState] = useState({username: '', createdTime: ''});
  const [err, setErr] = useState({err: ''});

  useEffect( () => {
    const instance = axios.create({
      baseURL: BASE_URL,
      timeout: 1000
    });
    instance.get('/user/?id=1').then(
        (data) => {
          setState({username: data.username, createdTime: data.createdTime});
          setErr({err:''});
        }
    ).catch(err => {
      setErr({err: `${err.message}`})
    })
  });


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello {state.username}!
        </p>
        <p>
          Created: {state.createdTime}
        </p>
        <p hidden={err.err.length === 0}>
          Error: {err.err}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
