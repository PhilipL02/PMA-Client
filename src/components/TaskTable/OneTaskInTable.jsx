import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { clsx } from '../../utils/utils'

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

const OneTaskInTable = ({ task, userID, buildingAdminUserID, buildingMembers, deleteTask, takeOnTask, removeFromTask, leaveTask, taskCompleted, taskNotCompleted }) => {

    const navigate = useNavigate()

    function getMemberName(memberUserID) {
        if(!buildingMembers) return
        const member = buildingMembers.filter(m => m._id === memberUserID)[0]
        return member?.name
    }

    return (
        <tr onClick={() => navigate(`/uppgift?id=${task._id}`)}>
            <td>{task.taskName}</td>
            <td><p className={clsx(["status", `${[statusPrefixes[task.status]]}${[task.status]}`])}>{statuses[task.status]}</p></td>
            <td>{getMemberName(task.assignedToUser)}</td>
        </tr>
    )
}

export default OneTaskInTable
