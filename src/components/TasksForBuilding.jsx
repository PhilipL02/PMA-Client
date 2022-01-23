import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const TasksForBuilding = ({ userID, phetch }) => {

    const location = useLocation()
    const navigate = useNavigate()

    const [buildingID, setBuildingID] = useState()
    const [building, setBuilding] = useState()

    useEffect(() => {
        setBuildingID(new URLSearchParams(location.search).get('id'))
        if(!buildingID) return
        getBuildingData()
    }, [buildingID, location])

    async function getBuildingData() {
        let response = await phetch(`/buildings/getone?id=${buildingID}`)
        console.log(response)
        if(response?.success) setBuilding(response.data)
        if(response && !response.success) navigate('/buildings')
    }

    return (
        <>
            {building && 
                <>
                    <h1>{building.buildingName}</h1>
                </>
            }
        </>
    )
};

export default TasksForBuilding;
