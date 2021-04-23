import React, { Component, lazy } from 'react'
import { Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import Loading from './components/Loading'

const AdminRoute = lazy(() => import('./adminRoute')) 
const Robot = lazy(() => import('./components/Robot')) 
const Register = lazy(() => import("./pages/Register"))
const Login = lazy(() => import("./pages/Login"))
const Setting = lazy(() => import('./pages/Setting')) 

class App extends Component {
  render() {
    return (
      <Router>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route path="/" render={() => 
              <div className="whole">
                  <Switch>   
                    <Route path="/register" component={Register} />
                    <Route path="/login" component={Login} />
                    <Route path="/setting" component={Setting} />
                    <Route path="/admin" component={AdminRoute} />
                    <Redirect to="/login" />
                  </Switch> 
                <Robot/>
              </div>
            }/>
          </Switch>
        </Suspense>
      </Router>
    );
  }
}

export default App;
