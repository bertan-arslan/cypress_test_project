import "./App.css"
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Success from './components/Success';

function App() {
  return(
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/success" component={Success} />
      </Switch>
    </BrowserRouter>
  );
}

export default App