
 const reducer = (state, action) => {
    switch (action.type) {
        case "GET_MUSIC":
            return {
                    music: state.music.filter(music => music.title === action.payload)
                }
    
        case "GET_MUSICS": 
            return {
                musics: [...state.musics]
            }
        default:
            throw new Error()
            break;
    }
}

export default reducer