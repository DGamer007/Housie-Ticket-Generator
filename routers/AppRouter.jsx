import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Housie from '../components/Housie.jsx'
import Generator from '../components/Generator.jsx'

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact={true} component={Housie} />
                <Route path="/print" exact={true} component={Generator} />
            </Switch>
        </BrowserRouter>
    )
}

export default AppRouter