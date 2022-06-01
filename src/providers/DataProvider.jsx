import React, { createContext, useContext, useState, useEffect } from 'react';

import { useGlobal } from './GlobalProvider';

const contextData = createContext();

const DataProvider = ({ children }) => {

    const { phetch, userID } = useGlobal()

    const [buildings, setBuildings] = useState()
    const [myTasks, setMyTasks] = useState()
    const [ownedBuildings, setOwnedBuildings] = useState()
    const [memberBuildings, setMemberBuildings] = useState()
    const [ownedTasks, setOwnedTasks] = useState()
    const [idleTasks, setIdleTasks] = useState()

    useEffect(() => {
        getBuildings()
        getMyTasks()
    }, [])

    async function getBuildings() {
        let response = await phetch('/buildings/get')
        console.log(response)
        if(response?.success) setBuildings(response.data.buildings)
    }

    useEffect(() => {
        if(!buildings) return
        console.log(buildings)
        setOwnedBuildings(buildings.filter(b => b.userID === userID))
        setMemberBuildings(buildings.filter(b => b.userID !== userID))
    }, [buildings])

    async function getMyTasks() {
        let response = await phetch('/tasks/user/get')
        if(response?.success) setMyTasks(response.data.tasks)
        response = await phetch('/tasks/get/idle/all')
        if(response?.success) setIdleTasks(response.data.idleTasks)
        response = await phetch('/tasks/owner/get')
        if(response?.success) setOwnedTasks(response.data.tasks)
    }

    return(
        <contextData.Provider value={{ myTasks, ownedTasks, idleTasks, buildings, getMyTasks, getBuildings, setBuildings, ownedBuildings, memberBuildings }}>
            {children}
        </contextData.Provider>
    )
}

export const useData = () => useContext(contextData);

export default DataProvider;
