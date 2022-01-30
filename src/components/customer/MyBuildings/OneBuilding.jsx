import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import TasksForBuilding from '../../TaskTable/TasksForBuilding';
import CreateTask from './CreateTask';
import MembersOfBuilding from './MembersOfBuilding';
import { useGlobal } from '../../../providers/GlobalProvider';
import { useData } from '../../../providers/DataProvider';

const OneBuilding = ({  }) => {

    const { userID, phetch } = useGlobal()
    const { buildings } = useData()

    const location = useLocation()

    const [building, setBuilding] = useState()
    const [members, setMembers] = useState()
    const [tasks, setTasks] = useState()

    useEffect(() => {
        if(!(buildings && location)) return
        const buildingWithMatchingID = buildings.filter(b => b._id === new URLSearchParams(location.search).get('id'))[0]
        if(!buildingWithMatchingID) return setBuilding(false)
        setBuilding(buildingWithMatchingID)
    }, [buildings, location])

    useEffect(() => {
        if(!building) return
        getMembers()
        getTasks()
    }, [building])

    async function getMembers() {
        let response = await phetch(`/buildings/users/get?id=${building._id}`)
        console.log(response)
        setMembers(response.data.members)
    }

    async function getTasks() {
        let response = await phetch(`/tasks/get?bid=${building._id}`)
        console.log(response)
        if(response?.success) setTasks(response.data.tasks)
    }

    return (
        <>
            {(building === false) && "Byggnaden hittades inte"}
            {building && 
                <>
                    <TasksForBuilding
                        building={building}
                        tasks={tasks} 
                        getTasks={getTasks}
                        userID={userID} 
                        buildingAdminUserID={building.userID}
                        buildingMembers={members}
                    />
                    <div className='createAndMembersContainer'>
                        <CreateTask
                            buildingID={building._id}
                            getTasks={getTasks}
                        />
                        {members &&
                            <MembersOfBuilding
                                members={members}
                            />
                        }
                    </div>
                </>
            }
        </>
    )
};

export default OneBuilding;
