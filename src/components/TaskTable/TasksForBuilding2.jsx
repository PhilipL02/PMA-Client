import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import OneTaskInTable from './OneTaskInTable'
import CreateTask from '../CreateTask'

const TasksForBuilding = ({ selectedBuilding, userID }) => {

    const location = useLocation()
    const navigate = useNavigate()

    const [building, setBuilding] = useState()
    const [buildingID, setBuildingID] = useState(selectedBuilding?._id || new URLSearchParams(location.search).get('id'))
    const [buildingAdminUserID, setBuildingAdminUserID] = useState(building?.userID ?? undefined)
    const [tasks, setTasks] = useState()
    const [buildingMembers, setBuildingMembers] = useState()
    const [inviteCode, setInviteCode] = useState()

    useEffect(() => {
        if(building) return
        if(!buildingID) return navigate('/minabyggnader')
        getBuildingData()
        if(!building) return
        getTasks()
        getMembers()
    }, [buildingID, building])

    async function getBuildingData() {
        if(buildingID?.length !== 24) return
        let response = await phetch(`/buildings/getone`, {
            method: 'POST',
            body: {
                id: buildingID
            }
        })
        console.log(response)
        if(response?.success) setBuilding(response.data)
        if(response && !response.success) navigate('/minabyggnader')
        // if(response.type === 'InvalidToken') setInvalidToken(true)
    }

    async function getTasks() {
        let response = await phetch('/tasks/get', {
            method: 'POST',
            body: {
                buildingID: building._id,
                userID,
            }
        })
        console.log(response)
        setTasks(response.data.tasks)
    }

    async function getMembers() {
        let response = await phetch('/buildings/users/get', {
            method: 'POST',
            body: {
                buildingID: building._id,
            }
        })
        console.log(response)
        setBuildingMembers(response.data.members)
    }

    async function createTask(buildingID, taskName, priority) {
        let response = await phetch('/tasks/create', {
            method: 'POST',
            body: {
                buildingID: building._id,
                taskName,
                priority,
            }
        })
        console.log(response)
        if(response?.success) getTasks()
    }

    async function deleteTask(taskID) {
        let response = await phetch('/tasks/delete', {
            method: 'POST',
            body: {
                buildingID: building._id,
                taskID,
                userID
            }
        })
        console.log(response)
        if(response?.success) getTasks()
    }

    async function takeOnTask(taskID, approxCost, approxTime, comment) {
        let response = await phetch('/tasks/take', {
            method: 'POST',
            body: {
                taskID,
                userID,
                approxCost,
                approxTime,
                comment
            }
        })
        console.log(response)
        if(response?.success) getTasks()
    }

    async function removeFromTask(taskID) {
        let response = await phetch('/tasks/worker/remove', {
            method: 'POST',
            body: {
                taskID,
                userID,
            }
        })
        console.log(response)
        if(response?.success) getTasks()
    }

    async function leaveTask(taskID) {
        let response = await phetch('/tasks/leave', {
            method: 'POST',
            body: {
                taskID,
                userID,
            }
        })
        console.log(response)
        if(response?.success) getTasks()
    }
    
    async function taskCompleted(taskID) {
        let response = await phetch('/tasks/completed/is', {
            method: 'POST',
            body: {
                taskID,
                userID,
            }
        })
        console.log(response)
        if(response?.success) getTasks()
    }

    async function taskNotCompleted(taskID) {
        let response = await phetch('/tasks/completed/not', {
            method: 'POST',
            body: {
                taskID,
                userID,
            }
        })
        console.log(response)
        if(response?.success) getTasks()
    }
    
    async function generateInviteCode() {
        let response = await phetch('/buildings/invite/create', {
            method: 'POST',
            body: {
                userID,
                buildingID: building._id,
            }
        })
        console.log(response)
        if(response.success && response.data?.code) setInviteCode(response.data.code)
    }
    
    return (
        <>
            {building && <>
                <h2>{building.buildingName}</h2>
                
                {building.userID === userID && 
                    <>
                        <button onClick={() => generateInviteCode(building._id)}>Generera inbjudningskod</button>
                        {inviteCode && <p>Kod: {inviteCode}</p>}
                        <br/>
                    </>
                }

                <br/>

                <div className='taskTable'>
                    <div className='tableHead'>
                        <div>Uppgift</div>
                        <div>Prioritet</div>
                        <div>Status</div>
                        <div>Uppgiftstagare</div>
                    </div>
                    {tasks && tasks.map(t => (
                        <OneTaskInTable key={t._id} task={t} buildingAdminUserID={buildingAdminUserID} userID={userID} buildingMembers={buildingMembers} deleteTask={deleteTask} takeOnTask={takeOnTask} removeFromTask={removeFromTask} leaveTask={leaveTask} taskCompleted={taskCompleted} taskNotCompleted={taskNotCompleted}/>
                    ))}
                </div>

                <hr/>


                <h2>Medlemmar i byggnad</h2>
                {buildingMembers && buildingMembers.map(m => (
                    <p key={m._id}>{m.name}{m._id === userID && " (Du)"}</p>
                ))}

                {buildingAdminUserID === userID &&
                    <>
                        <hr/>
                        <CreateTask building={building} userID={userID} createTask={createTask}/>
                    </>
                }
            </>}
        </>
    )
}

export default TasksForBuilding
