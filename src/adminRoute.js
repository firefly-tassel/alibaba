import React, { Component, lazy } from 'react'
import { Route, Switch, Redirect} from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import './adminRoute.less'
const Admin = lazy(() => import("./admin"))
const Home = lazy(() => import('./pages/Home')) 
const Detail = lazy(() => import('./pages/Detail')) 
const Search = lazy(() => import('./pages/Search')) 
const NoMatch = lazy(() => import('./pages/NoMatch')) 
const Collections = lazy(() => import('./pages/Collections')) 
const Quick = lazy(() => import('./pages/Ordinary/quick')) 
const Meal = lazy(() => import('./pages/Ordinary/meal')) 
const Breakfast = lazy(() => import('./pages/Breakfast'))
const Pock = lazy(() => import('./pages/Meat/pock')) 
const Chicken = lazy(() => import('./pages/Meat/chicken')) 
const Duck = lazy(() => import('./pages/Meat/duck')) 
const Beef = lazy(() => import('./pages/Meat/beef')) 
const Mutton = lazy(() => import('./pages/Meat/mutton')) 
const Fish = lazy(() => import('./pages/Fish')) 
const Fruits = lazy(() => import('./pages/Vegetables/fruits')) 
const Roots = lazy(() => import('./pages/Vegetables/roots')) 
const Mushrooms = lazy(() => import('./pages/Vegetables/mushrooms')) 
const Leaves = lazy(() => import('./pages/Vegetables/leaves')) 
const Soup = lazy(() => import('./pages/Soup')) 
const Bake = lazy(() => import('./pages/Bake')) 
const Staple = lazy(() => import('./pages/Staple')) 
const Noodles = lazy(() => import('./pages/Noodles')) 
const Vegetarian = lazy(() => import('./pages/Vegetarian')) 
const Message = lazy(() => import('./pages/Message'))
const Robot = lazy(() => import('./components/Robot')) 
const Topic = lazy(() => import('./pages/Topic')) 
const Publish = lazy(() => import('./pages/Publish')) 

export default class AdminRoute extends Component {
    render() {
        const location = this.props.location
        return (
            <div>
                <Admin>
                    <TransitionGroup>
                        <CSSTransition key={location.key} timeout={1000} classNames="page">
                            <Switch location={location}>
                                <Route path="/admin/common" render={() => (
                                    <Route path="/admin/common/detail/:id" component={Detail} />
                                )} />
                                <Route path="/admin/search" component={Search} />
                                <Route path="/admin/collections" component={Collections} />
                                <Route path="/admin/topic" component={Topic} />
                                <Route path="/admin/publish" component={Publish} />
                                <Route path="/admin/menu" component={NoMatch} />
                                <Route path="/admin/tags" component={NoMatch} />   
                                <Route path="/admin/home" component={Home} />
                                <Route path="/admin/ordinary/quick" component={Quick} />
                                <Route path="/admin/ordinary/meal" component={Meal} />
                                <Route path="/admin/breakfast" component={Breakfast} />
                                <Route path="/admin/meat/pock" component={Pock} />
                                <Route path="/admin/meat/chicken" component={Chicken} />
                                <Route path="/admin/meat/duck" component={Duck} />
                                <Route path="/admin/meat/beef" component={Beef} />
                                <Route path="/admin/meat/mutton" component={Mutton} />
                                <Route path="/admin/fish" component={Fish} />
                                <Route path="/admin/vegetables/fruits" component={Fruits} />
                                <Route path="/admin/vegetables/roots" component={Roots} />
                                <Route path="/admin/vegetables/mushrooms" component={Mushrooms} />
                                <Route path="/admin/vegetables/leaves" component={Leaves} />
                                <Route path="/admin/soup" component={Soup} />
                                <Route path="/admin/bake" component={Bake} />
                                <Route path="/admin/staple" component={Staple} />
                                <Route path="/admin/noodles" component={Noodles} />
                                <Route path="/admin/vegetarian" component={Vegetarian} />
                                <Route path="/admin/message" component={Message} />
                                <Redirect to="/admin/home" />
                            </Switch>
                        </CSSTransition>
                    </TransitionGroup>
                </Admin>
                <Robot/>
            </div>
        )
    }
}
