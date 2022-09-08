

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Admin from './components/Admin';
import Treedm from "./components/DanhMuc/Treedm";
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less
function App() {
  return (
    <Router>
    <div className="App">
      <Switch>
     
     
      <Route path="/">
      <Admin/>
      </Route>

      </Switch>
    </div>
    </Router>
  );
}

export default App;
