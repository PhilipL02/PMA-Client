import React, { createContext, useContext, useState, useEffect } from 'react';

import { clsx } from '../utils/utils';

const contextCreateTask = createContext();

const CreateTaskProvider = ({ children }) => {

    const [shouldSelectAssignedToUser, setSelectAssignedToUser] = useState()
    const [assignedToUser, setAssignedToUser] = useState()

    return(
        <contextCreateTask.Provider value={{ assignedToUser, setAssignedToUser, shouldSelectAssignedToUser, setSelectAssignedToUser }}>
            {shouldSelectAssignedToUser && <div className='darkOverlay' onClick={() => setSelectAssignedToUser(false)}></div>}
            {children}
        </contextCreateTask.Provider>
    )
}

export const useCreateTask = () => useContext(contextCreateTask);

export default CreateTaskProvider;
