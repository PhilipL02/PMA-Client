import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGlobal } from '../providers/GlobalProvider';
import { useData } from '../providers/DataProvider';

import { ReactComponent as HouseIcon } from '../assets/svg/House.svg'
import { ReactComponent as RightArrow } from '../assets/svg/RightArrow.svg'

const MyTasks = ({ }) => {

    const navigate = useNavigate()

    const { buildings, myTasks } = useData()

    const [myAssignedTasks, setMyAssignedTasks] = useState()
    const [myInProgressTasks, setMyInProgressTasks] = useState()
    const [myCompletedTasks, setMyCompletedTasks] = useState()
    const [myAssignedTasksBuildingsIDs, setMyAssignedTasksBuildingsIDs] = useState()
    const [myInProgressTasksBuildingsIDs, setMyInProgressTasksBuildingsIDs] = useState()
    const [myCompletedTasksBuildingsIDs, setMyCompletedTasksBuildingsIDs] = useState()

    useEffect(() => {
        if(!myTasks) return
        setMyAssignedTasks(myTasks.filter(task => task.status === 'assigned'))
        setMyInProgressTasks(myTasks.filter(task => task.status === 'inProgress'))
        setMyCompletedTasks(myTasks.filter(task => task.status === 'completed'))
    }, [myTasks])

    useEffect(() => {
        if(!myAssignedTasks) return
        const buildingIDs = myAssignedTasks.map(task => {return task.buildingID})
        const uniqueIDs = buildingIDs.filter((value, index, array) => array.indexOf(value) == index);
        setMyAssignedTasksBuildingsIDs(uniqueIDs)
    }, [myAssignedTasks])

    useEffect(() => {
        if(!myInProgressTasks) return
        const buildingIDs = myInProgressTasks.map(task => {return task.buildingID})
        const uniqueIDs = buildingIDs.filter((value, index, array) => array.indexOf(value) == index);
        setMyInProgressTasksBuildingsIDs(uniqueIDs)
    }, [myInProgressTasks])

    useEffect(() => {
        if(!myCompletedTasks) return
        const buildingIDs = myCompletedTasks.map(task => {return task.buildingID})
        const uniqueIDs = buildingIDs.filter((value, index, array) => array.indexOf(value) == index);
        setMyCompletedTasksBuildingsIDs(uniqueIDs)
    }, [myCompletedTasks])

    function getBuildingByID(id) {
        return buildings.filter(b => b._id === id)[0]
    }

    return (
        <>
        {myTasks && buildings &&
            <div className='myTasks'>
                <div className='myTasksGroup assigned'>
                    <div className='groupHeader'>Tilldelade uppgifter</div>
                    {myAssignedTasksBuildingsIDs?.length ? myAssignedTasksBuildingsIDs.map(buildingID => (
                        <div className='buildingGroup' key={buildingID}>
                            <div className='buildingGroupHeader'><HouseIcon className='houseIcon'/><span className='text'>{getBuildingByID(buildingID).buildingName}</span></div>
                            {myAssignedTasks.map(task => {
                                if(task.buildingID === buildingID) 
                                return (
                                    <div className='groupContent' key={task._id}>
                                        <span className='task' onClick={() => navigate(`/uppgift?id=${task._id}`)}>
                                            <span className='taskName'>{task.taskName}</span> 
                                            <RightArrow className='rightArrow'/>
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                    )) : <div className='groupContent empty'>Inga tilldelade uppgifter</div>}
                </div>

                <br/>

                <div className='myTasksGroup inProgress'>
                    <div className='groupHeader'>Aktiva uppgifter</div>
                    {myInProgressTasksBuildingsIDs?.length ? myInProgressTasksBuildingsIDs.map(buildingID => (
                        <div className='buildingGroup' key={buildingID}>
                            <div className='buildingGroupHeader'><HouseIcon className='houseIcon'/><span className='text'>{getBuildingByID(buildingID).buildingName}</span></div>
                            {myInProgressTasks.map(task => {
                                if(task.buildingID === buildingID) 
                                return (
                                    <div className='groupContent' key={task._id}>
                                        <span className='task' onClick={() => navigate(`/uppgift?id=${task._id}`)}>
                                            <span className='taskName'>{task.taskName}</span> 
                                            <RightArrow className='rightArrow'/>
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                    )) : <div className='groupContent empty'>Inga aktiva uppgifter</div>}
                </div>

                <br/>
               
                <div className='myTasksGroup completed'>
                    <div className='groupHeader'>Klara uppgifter</div>
                    {myCompletedTasksBuildingsIDs?.length ? myCompletedTasksBuildingsIDs.map(buildingID => (
                        <div className='buildingGroup' key={buildingID}>
                            <div className='buildingGroupHeader'><HouseIcon className='houseIcon'/><span className='text'>{getBuildingByID(buildingID).buildingName}</span></div>
                            {myCompletedTasks.map(task => {
                                if(task.buildingID === buildingID) 
                                return (
                                    <div className='groupContent' key={task._id}>
                                        <span className='task' onClick={() => navigate(`/uppgift?id=${task._id}`)}>
                                            <span className='taskName'>{task.taskName}</span> 
                                            <RightArrow className='rightArrow'/>
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                    )) : <div className='groupContent empty'>Inga klara uppgifter</div>}
                </div>
            </div>
        }
        </>
    )
};

export default MyTasks;
