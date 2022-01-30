import React, { createContext, useContext, useState, useEffect } from 'react';

import { useGlobal } from './GlobalProvider';

const contextData = createContext();

const DataProvider = ({ children }) => {

    const { phetch } = useGlobal()

    const [buildings, setBuildings] = useState()
    const [myTasks, setMyTasks] = useState()
    const [ownedBuildings, setOwnedBuildings] = useState()

    useEffect(() => {
        getBuildings()
        getMyTasks()
    }, [])

    async function getBuildings() {
        let response = await phetch('/buildings/get')
        console.log(response)
        if(response?.success) setBuildings(response.data.buildings)
    }

    async function getMyTasks() {
        let response = await phetch('/tasks/user/get')
        if(response?.success) setMyTasks(response.data.tasks)
    }

    return(
        <contextData.Provider value={{ myTasks, buildings, getBuildings }}>
            {children}
        </contextData.Provider>
    )
}

export const useData = () => useContext(contextData);

export default DataProvider;
