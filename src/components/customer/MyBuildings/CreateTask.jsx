import React, { useState } from 'react';

import { useGlobal } from '../../../providers/GlobalProvider';
import { useCreateTask } from '../../../providers/CreateTaskProvider';

import { ReactComponent as Cross } from '../../../assets/svg/Cross.svg';

const CreateTask = ({ buildingID, getTasks }) => {

    const { phetch } = useGlobal()
    const { assignedToUser, setAssignedToUser, setSelectAssignedToUser } = useCreateTask()

    const [taskName, setTaskName] = useState()
    const [priority, setPriority] = useState('low')
    
    async function handleCreateTask(e) {
        e.preventDefault()
        let response = await phetch('/tasks/create', {
            method: 'POST',
            body: {
                buildingID,
                taskName,
                priority,
                assignedToUser: assignedToUser?._id
            }
        })
        console.log(response)
        if(response?.success) {
            getTasks()
            resetForm(e)
        } 
    }

    function resetForm(e) {
        e.target.reset()
        setAssignedToUser(undefined)
    }

    return (
        <div className='createTaskForBuilding'>
            <h1>Lägg till uppgift</h1>
            <form onSubmit={handleCreateTask}>
            <label htmlFor='name'>Namn</label>
                <input type="text" id='name' onChange={e => setTaskName(e.target.value)}/>
                <br/>
                <label htmlFor='priority'>Prioritet</label>
                <select id='priority' defaultValue="low" onChange={e => setPriority(e.target.value)}>
                    <option value="high">Hög</option>
                    <option value="low">Låg</option>
                </select>
                <br/>
                <label htmlFor='assignTask'>Tilldela</label>
                <div id='assignTask' className='assignTaskBox' onClick={() => setSelectAssignedToUser(true)}>
                    {assignedToUser && <div><span>{assignedToUser.name}</span><span onClick={e => (e.stopPropagation(), setAssignedToUser(undefined))}><Cross style={{height: "0.85rem"}}/></span></div>}
                </div>
                <br/>
                <input type="submit" value="Skapa"/>
            </form>
        </div>
    )
};

export default CreateTask;
