export const reduceReducers = (...reducers) => (state, action) =>
    reducers.reduce((acc, nextReducer) => nextReducer(acc, action), state);

export const setEventsToLocalStorage = (events) =>
    localStorage.setItem("events", JSON.stringify(events));
