import React from "react";
import { StoreContextProvider } from "./store";

import { Calendar } from "./components/Calendar";

function App() {
    return (
        <>
            <StoreContextProvider>
                <div className="wrapper">
                    <Calendar />
                </div>
            </StoreContextProvider>
        </>
    );
}

export default App;
