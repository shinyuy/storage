import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Main from "./components/main/Main";
import Bucket from "./components/bucket/Bucket";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/buckets/:id" component={Bucket} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
