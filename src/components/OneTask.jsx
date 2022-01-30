import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useData } from '../providers/DataProvider';

const OneTask = () => {

    const location = useLocation()

    const { myTasks, buildings } = useData()

    const [task, setTask] = useState()
    const [building, setBuilding] = useState()

    useEffect(() => {
        if(!(myTasks && location.search)) return
        const taskWithMatchingID = myTasks.filter(t => t._id === new URLSearchParams(location.search).get('id'))[0]
        if(!taskWithMatchingID) return setTask(false)
        setTask(taskWithMatchingID)
    }, [myTasks, location])

    useEffect(() => {
        if(!(task && buildings)) return
        const buildingWithMatchingID = buildings.filter(b => b._id === task.buildingID)[0]
        setBuilding(buildingWithMatchingID)
    }, [buildings, task])

    return (
        <>
            {task === false && "Uppgiften hittades inte"}
            {(task && building) && 
                <>
                    <div>Byggnad: {building.buildingName}</div>
                    <div>Uppgift: {task.taskName}</div>
                    <div>Prioritet: {task.priority}</div>
                    <div>Status: {task.status}</div>
                </>
            }
        </>
    )
}

export default OneTask;
