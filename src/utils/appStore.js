import {configureStore} from '@reduxjs/toolkit';
import userSlice from "../utils/userSlice"
import moviesSlice from "../utils/moviesSlice"
import gptSlice from "../utils/gptSlice"
import configSlice from "../utils/configSlice"

const appStore = configureStore({
    reducer: {
        user: userSlice,
        movies: moviesSlice,
        gpt: gptSlice,
        config: configSlice,
    }
})

export default appStore;