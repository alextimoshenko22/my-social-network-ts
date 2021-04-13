//ФАЙЛ ДЛЯ ПРИМЕРА по работе с CONTEXT

import React from 'react'

const StoreContext = React.createContext(null);

export const Provider = (props) => {
    return (
        <StoreContext.Provider value={props.store}>
            { props.children }
        </StoreContext.Provider>
    );
}

export default StoreContext;
