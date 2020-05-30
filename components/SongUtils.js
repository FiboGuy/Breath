export const songs = [
    {
        id: 'Pausa',
        title: 'Pausa',
        artist: 'Izal',
        url: require('./../songs/Izal-Pausa.mp3')
    },
    {
        id: 'Nuvole Bianche',
        title: 'Nuvole Bianche',
        artist: 'Ludovico Einaudi',
        url: require('./../songs/LudovicoEinaudi-NuvoleBianche.mp3')
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