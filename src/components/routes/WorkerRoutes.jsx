import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import WorkerBuildings from '../worker/WorkerBuildings';
import TasksForBuilding from '../TaskTable/TasksForBuilding';
import { useGlobal } from '../../providers/GlobalProvider';

const WorkerRoutes = ({ userID, setInvalidToken }) => {

    const { phetch } = useGlobal()

    const [buildings, setBuildings] = useState()
    const [selectedBuilding, setSelectedBuilding] = useState()

    const navigate = useNavigate()

    useEffect(() => {
        if(!userID) return
        getBuildings()
    }, [userID])
    
    async function getBuildings() {
        let response = await phetch('/buildings/get', {
            method: 'POST',
            body: {
                userID,
            }
        })
        console.log(response)
        if(response?.success) setBuildings(response.data)
    }

    useEffect(() => {
        if(!selectedBuilding) return
        navigate('/uppgifter')
    }, [selectedBuilding])

    return (
        <Routes>
            <Route exact path='/minabyggnader' element={
                <WorkerBuildings 
                    userID={userID} 
                    buildings={buildings} 
                    getBuildings={getBuildings} 
                    selectedBuilding={selectedBuilding} 
                    setSelectedBuilding={setSelectedBuilding}
                />
            }/>
            {selectedBuilding && <Route exact path='/uppgifter' element={
                <TasksForBuilding 
                    building={selectedBuilding} 
                    userID={userID} 
                />}
            />}
            <Route path='*' element={<Navigate to='/minabyggnader'/>}/>
        </Routes>
    )
};

export default WorkerRoutes;
