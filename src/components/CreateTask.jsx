import React, { useState } from 'react'

import { SERVER_URL } from '../utils/constants'

const CreateTask = ({ building, userID, createTask }) => {

    const [name, setName] = useState()
    const [priority, setPriority] = useState("low")
    const [assignedTo, setAssignedTo] = useState()

    return (
        <>
            <h3>Skapa ny uppgift</h3>
            <br/>
            <form onSubmit={e => (e.preventDefault(), createTask(building._id, name, priority))}>
                <label htmlFor='name'>Namn</label>
                <input type="text" id='name' onChange={e => setName(e.target.value)}/>
                <br/>
                <label htmlFor='priority'>Prioritet</label>
                <select id='priority' defaultValue="low" onChange={e => setPriority(e.target.value)}>
                    <option value="high">Hög</option>
                    <option value="low">Låg</option>
                </select>
                <br/>
                <label htmlFor='assignedTo'>Tilldela till   </label>
                <span id='assignedTo'>{assignedTo}</span>
                <br/>
                <input type="submit" value="Skapa"/>
            </form>
        </>
    )
}

export default CreateTask
