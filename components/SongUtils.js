export const songs = [
    {
        id: 'Celestial Figments',
        title: 'Celestial Figments',
        artist: 'Sleep Songs',
        url: require('./../songs/CelestialFigments.mp3'),
        artwork: require('./../images/Stone.png')
    },
    {
        id: 'Inner Focus',
        title: 'Inner Focus',
        artist: 'Sleep Songs',
        url: require('./../songs/InnerFocus.mp3'),
        artwork: require('./../images/Stone.png')
    },
    {
        id: 'Life in the Streams',
        title: 'Life in the Streams',
        artist: 'Sleep Songs',
        url: require('./../songs/LifeintheStreams.mp3'),
        artwork: require('./../images/Stone.png')
    },
    {
        id: 'River Wonders',
        title: 'River Wonders',
        artist: 'Sleep Songs',
        url: require('./../songs/RiverWonders.mp3'),
        artwork: require('./../images/Stone.png')
    },
    {
        id: 'Sleep Now',
        title: 'Sleep Now',
        artist: 'Sleep Songs',
        url: require('./../songs/SleepNow.mp3'),
        artwork: require('./../images/Stone.png')
    },
    {
        id: 'Sleep Time',
        title: 'Sleep Time',
        artist: 'Sleep Songs',
        url: require('./../songs/SleepTime.mp3'),
        artwork: require('./../images/Stone.png')
    },
    {
        id: 'Slow Snooze',
        title: 'Slow Snooze',
        artist: 'Sleep Songs',
        url: require('./../songs/SlowSnooze.mp3'),
        artwork: require('./../images/Stone.png')
    },
    {
        id: 'Soaring Spirit',
        title: 'Soaring Spirit',
        artist: 'Sleep Songs',
        url: require('./../songs/SoaringSpirit.mp3'),
        artwork: require('./../images/Stone.png')
    },
    {
        id: 'Winter Dreams',
        title: 'Winter Dreams',
        artist: 'Sleep Songs',
        url: require('./../songs/WinterDreams.mp3'),
        artwork: require('./../images/Stone.png')
    }
]

export const getNextSong = id => {
    const index = findIndex(id)
    return index === (songs.length - 1) ? songs[0] : songs[index+1]
}

export const getPreviousSong = id => {
    const index = findIndex(id)
    return index === 0 ? songs[0] : songs[index-1]
}


const findIndex = id => {
    for(let i = 0; i<songs.length;i++){
        if(songs[i].id === id){
            return i
        }
    }
}