import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGlobal } from '../providers/GlobalProvider';
import { useData } from '../providers/DataProvider';

const Start = () => {

    const navigate = useNavigate()

    const { userName } = useGlobal()
    const { myTasks } = useData()
    
    const [myAssignedTasks, setMyAssignedTasks] = useState()
    const [myInProgressTasks, setMyInProgressTasks] = useState()
    const [myCompletedTasks, setMyCompletedTasks] = useState()

    useEffect(() => {
        if(!myTasks) return
        setMyAssignedTasks(myTasks.filter(task => task.status === 'assigned'))
        setMyInProgressTasks(myTasks.filter(task => task.status === 'inProgress'))
        setMyCompletedTasks(myTasks.filter(task => task.status === 'completed'))
    }, [myTasks])

    return (
        <span className='startPage'>
            <div className='startHeader'><h1>Välkommen {userName}</h1></div>
            <div className='tasks' onClick={() => navigate('/minauppgifter')}>
                <p>Mina uppgifter</p>
                <div className='myTasksNumbers'>
                    <div className='number assigned'>{myAssignedTasks?.length}</div>
                    <div className='number inProgress'>{myInProgressTasks?.length}</div>
                    <div className='number completed'>{myCompletedTasks?.length}</div>
                </div>
            </div>
        </span>
    )
}

export default Start;
