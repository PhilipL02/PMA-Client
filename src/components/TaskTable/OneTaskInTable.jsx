import React from 'react'
import { useNavigate } from 'react-router-dom'

import { clsx } from '../../utils/utils'

const priorities = {
    low: 'Låg',
    high: 'Hög',
}


const statuses = {
    idle: 'Inte igång',
    assigned: 'Tilldelad',
    inProgress: 'Pågående',
    completed: 'Klar'
}

const statusPrefixes = {
    idle: 'A_',
    assigned: 'B_',
    inProgress: 'C_',
    completed: 'D_',
}

const OneTaskInTable = ({ task, isOwner, buildingMembers, deleteTask, takeOnTask, removeFromTask, leaveTask, taskCompleted, taskNotCompleted }) => {

    const navigate = useNavigate()

    function getMemberName(memberUserID) {
        if(!buildingMembers) return
        const member = buildingMembers.filter(m => m._id === memberUserID)[0]
        return member?.name
    }

    return (
        <>
            <tr onClick={() => navigate(`/uppgift?id=${task._id}`)}>
                <td>{task.taskName}</td>
                <td><p className={clsx(["status", `${[statusPrefixes[task.status]]}${[task.status]}`])}>{statuses[task.status]}</p></td>
                <td style={{textAlign: 'center'}}>{priorities[task.priority]}</td>
                <td>{getMemberName(task.assignedToUser)}</td>
                {/* {isOwner && <td style={{background: 'lightcoral', color: 'darkred', fontWeight: 'bold', cursor: 'pointer'}} onClick={e => (e.stopPropagation(), deleteTask(task._id))}>Ta bort</td>} */}
            </tr>
        </>
    )
}

export default OneTaskInTable
