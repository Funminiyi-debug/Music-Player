import React, { createContext, useReducer } from 'react'
import reducer from './reducer'

export const myContext = createContext()

const initialState = {
    musics: [
        {
            title: "01. Whatcha Say iM1 - Copy",
            artist: "Jason Derulo"
        },
        {
            title: "Valentino Let me love you",
            artist: "Valentino"
        }
    ],
    loading: false,
    error: null
}

export const DataProvider = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <DataProvider.Provider value={[state, dispatch]}>
        </DataProvider.Provider>
    )

} 
