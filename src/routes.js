import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Auth from './Components/Auth/Auth'
import Posts from './Components/Posts/Posts'
import New from './Components/New/New'

export default (
    <Switch>
        <Route exact path='/' component={Auth} />
        <Route path='/posts' component={Posts} />
        <Route path='/new' component={New} />
    </Switch>
)