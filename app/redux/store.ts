import { configureStore } from '@reduxjs/toolkit';
// import authReducer from './auth/authSlide';
import projectReducer from './projects/projectSlide';
import taskReducer from './tasks/taskSlides';
import meetingReducer from './meetings/meetingSlides';
import milestoneReducer from './milestones/milestoneSlides';
import { listenerMiddleware } from './listenerMiddleware';
// import storage from 'redux-persist/lib/storage';
// import { persistStore, persistReducer } from 'redux-persist';

// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: {
        // auth: authReducer,
        projects: projectReducer,
        tasks: taskReducer,
        meetings: meetingReducer,
        milestones: milestoneReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

// ✅ Correct TypeScript types
export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
