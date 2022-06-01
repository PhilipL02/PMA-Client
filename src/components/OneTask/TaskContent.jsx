import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import OneTaskOptions from './OneTaskOptions'
import { useGlobal } from '../../providers/GlobalProvider'
import { useData } from '../../providers/DataProvider'

import { ReactComponent as Cross } from '../../assets/svg/Cross.svg'

const priorities = {
    high: 'Hög',
    low: 'Låg',
}

const statuses = {
    idle: 'Inte igång',
    assigned: 'Tilldelad',
    inProgress: 'Pågående',
    completed: 'Klar'
}

const TaskContent = ({ task, isBuildingOwner }) => {

    const { userID } = useGlobal()

    return (
        <div className='taskContent'>
            <div>Prioritet: {priorities[task.priority]}</div>
            <div>Status: {statuses[task.status]}</div>
            <OneTaskOptions 
                taskID={task._id}
                taskStatus={task.status} 
                isAssignedToThisUser={userID === task.assignedToUser}
                isBuildingOwner={isBuildingOwner}
            />
        </div>
    )
}

export default TaskContent