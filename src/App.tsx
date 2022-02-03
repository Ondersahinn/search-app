import "styles/global.scss";
import { Provider } from "react-redux";
import store from "redux/store";
import { Suspense } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';
import { useHistory } from "react-router";
import Home from "pages";
import SearchResult from "pages/searchResult";

function App(): JSX.Element {
  const hist = useHistory();
  const loadingImg = <div className="album-img">
        <img alt="loading" src="https://www.mazakayazilim.com/Content/img/mazaka-logo-index.png" />
    </div>

  return (
    <Provider store={store}>
      <div className="App">
        <Router history={hist}>
          <Switch>
            <Suspense fallback={loadingImg}>
              <Route exact path='/' component={Home} />
              <Route exact path='/searchresult' component={SearchResult} />
            </Suspense>
          </Switch>
        </Router>

      </div>
    </Provider>
  );
}

export default App;
