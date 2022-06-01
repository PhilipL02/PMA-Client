import React, { createContext, useContext, useState } from 'react';

const contextAdminAccordion = createContext();

const AdminAccordionProvider = ({ children }) => {

    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return(
        <contextAdminAccordion.Provider value={{ expanded, handleChange }}>
            {children}
        </contextAdminAccordion.Provider>
    )
}

export const useAdminAccordion = () => useContext(contextAdminAccordion);

export default AdminAccordionProvider;
