import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Toast {
    id: string;
    title: string;
    description?: string;
    type: 'success' | 'error' | 'info';
}

interface UiState {
    toasts: Toast[];
    isActivityModalOpen: boolean;
    isRedeemModalOpen: boolean;
}

const initialState: UiState = {
    toasts: [],
    isActivityModalOpen: false,
    isRedeemModalOpen: false,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        addToast: (state, action: PayloadAction<Omit<Toast, 'id'>>) => {
            const id = Date.now().toString();
            state.toasts.push({ ...action.payload, id });
        },
        removeToast: (state, action: PayloadAction<string>) => {
            state.toasts = state.toasts.filter((toast) => toast.id !== action.payload);
        },
        openActivityModal: (state) => {
            state.isActivityModalOpen = true;
        },
        closeActivityModal: (state) => {
            state.isActivityModalOpen = false;
        },
        openRedeemModal: (state) => {
            state.isRedeemModalOpen = true;
        },
        closeRedeemModal: (state) => {
            state.isRedeemModalOpen = false;
        },
    },
});

export const {
    addToast,
    removeToast,
    openActivityModal,
    closeActivityModal,
    openRedeemModal,
    closeRedeemModal,
} = uiSlice.actions;

export default uiSlice.reducer;
