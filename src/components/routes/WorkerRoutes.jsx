import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import WorkerBuildings from '../worker/WorkerBuildings';
import TasksForBuilding from '../TasksForBuilding';

import { phetch } from '../../utils/utils';

const WorkerRoutes = ({ userID, setInvalidToken }) => {

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
        response = await response.json()
        console.log(response)
        if(response.success) setBuildings(response.data)
        if(response.type === 'InvalidToken') setInvalidToken(true)
    }

    useEffect(() => {
        if(!selectedBuilding) return
        navigate('/uppgifter')
    }, [selectedBuilding])

    return (
        <Routes>
            <Route exact path='/byggnader' element={
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
            <Route path='*' element={<Navigate to='/byggnader'/>}/>
        </Routes>
    )
};

export default WorkerRoutes;
