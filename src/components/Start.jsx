import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGlobal } from '../providers/GlobalProvider';
import { useData } from '../providers/DataProvider';

import { ReactComponent as HouseIcon } from '../assets/svg/House.svg'
import { ReactComponent as RightArrow } from '../assets/svg/RightArrow.svg'

const Start = () => {

    const navigate = useNavigate()

    const { phetch, userName } = useGlobal()
    const { myTasks, buildings, idleTasks } = useData()

    const [myAssignedTasks, setMyAssignedTasks] = useState()
    const [myInProgressTasks, setMyInProgressTasks] = useState()
    const [myCompletedTasks, setMyCompletedTasks] = useState()
    const [amountOfIdleTasksToShow, setAmountOfIdleTasksToShow] = useState(5)

    useEffect(() => {
        if(!myTasks) return
        setMyAssignedTasks(myTasks.filter(task => task.status === 'assigned'))
        setMyInProgressTasks(myTasks.filter(task => task.status === 'inProgress'))
        setMyCompletedTasks(myTasks.filter(task => task.status === 'completed'))
    }, [myTasks])

    function getBuildingByID(id) {
        return buildings.filter(b => b._id === id)[0]
    }

    return (
        <span className='startPage'>
            <div className='startContent'>
                <div className='idleTasksContainer'>
                    <div className='groupHeader'>
                        Nya lediga uppgifter
                        <div className='selectAmount'>
                            Visa antal
                            <select defaultValue={amountOfIdleTasksToShow} onChange={e => setAmountOfIdleTasksToShow(e.target.value)}>
                                <option value='5'>5</option>
                                <option value='10'>10</option>
                                <option value='15'>15</option>
                                <option value='20'>20</option>
                            </select>
                        </div>
                    </div>
                    {idleTasks?.length ? idleTasks?.slice(0, amountOfIdleTasksToShow).map(task => (
                        <span className='task' key={task._id} onClick={() => navigate(`/uppgift?id=${task._id}`)}>
                            <span className='taskName'>{task.taskName}</span>
                            <div className='building'><HouseIcon className='houseIcon'/><span className='text'>{getBuildingByID(task.buildingID).buildingName}</span></div>
                            <RightArrow className='rightArrow'/>
                        </span>
                    )) : <div className='groupContent empty'>Inga lediga uppgifter</div>}
                </div>
                <div className='tasks' onClick={() => navigate('/minauppgifter')}>
                    <p>Mina uppgifter</p>
                    <div className='myTasksNumbers'>
                        <div className='number assigned'>{myAssignedTasks?.length}</div>
                        <div className='number inProgress'>{myInProgressTasks?.length}</div>
                        <div className='number completed'>{myCompletedTasks?.length}</div>
                    </div>
                </div>
            </div>
        </span>
    )
}

export default Start;
