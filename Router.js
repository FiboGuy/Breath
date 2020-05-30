import React from 'react'
import { Router, Scene, Stack } from 'react-native-router-flux'
import Index from './components/Index'
import SongProfile from './components/SongProfile'
import Timer from './components/player/Timer'

export default () => {
    return (
        <Router>
            <Stack key = "root">
                <Scene key="index" component={Index} title="Index" initial={true} hideNavBar={true}/>
                <Scene key='SongProfile' component={SongProfile} hideNavBar={true} />
                <Scene key='Timer' component={Timer} hideNavBar={true} />
            </Stack>
        </Router>
    )
}

