import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import CustomerBuildings from '../customer/CustomerBuildings';
import TasksForBuilding from '../TasksForBuilding';

import { phetch } from '../../utils/utils';

const CustomerRoutes = ({ userID, setInvalidToken }) => {

    const [selectedBuilding, setSelectedBuilding] = useState()
    const [buildings, setBuildings] = useState()

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
                <CustomerBuildings 
                    userID={userID} 
                    buildings={buildings} 
                    getBuildings={getBuildings} 
                    selectedBuilding={selectedBuilding} 
                    setSelectedBuilding={setSelectedBuilding}
                    setInvalidToken={setInvalidToken}
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

export default CustomerRoutes;
