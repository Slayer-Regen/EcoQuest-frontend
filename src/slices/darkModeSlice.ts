import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DarkModeState {
    isDarkMode: boolean;
}

const initialState: DarkModeState = {
    isDarkMode: localStorage.getItem('darkMode') === 'true',
};

const darkModeSlice = createSlice({
    name: 'darkMode',
    initialState,
    reducers: {
        toggleDarkMode: (state) => {
            state.isDarkMode = !state.isDarkMode;
            localStorage.setItem('darkMode', String(state.isDarkMode));

            // Apply to document
            if (state.isDarkMode) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        },
        setDarkMode: (state, action: PayloadAction<boolean>) => {
            state.isDarkMode = action.payload;
            localStorage.setItem('darkMode', String(state.isDarkMode));

            // Apply to document
            if (state.isDarkMode) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        },
    },
});

export const { toggleDarkMode, setDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;
