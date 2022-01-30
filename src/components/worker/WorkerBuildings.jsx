import React, { useState, useEffect } from 'react';

import TasksForBuilding from '../TaskTable/TasksForBuilding';
import { useGlobal } from '../../providers/GlobalProvider';

const WorkerSignedIn = ({ userID, buildings, getBuildings, selectedBuilding, setSelectedBuilding }) => {

    const { phetch } = useGlobal()

    const [buildingCode, setBuildingCode] = useState()
    const [isBuildingCodeWrong, setBuildingCodeWrong] = useState(false)

    useEffect(() => {
        setSelectedBuilding(undefined)
    }, [])

    async function joinBuilding(e) {
        e.preventDefault()
        let response = await phetch('/buildings/join', {
            method: 'POST',
            body: {
                code: buildingCode,
                userID,
            }
        })
        console.log(response)
        if(response?.success) {
            getBuildings()
            setBuildingCode(undefined)
        }
        else if(response && !response.success) setBuildingCodeWrong(true)
    }

  
    return (
        <>
            {buildings && !selectedBuilding && buildings.map(b => (
                <div key={b._id} className='oneBuilding'>
                    <h2 onClick={e => setSelectedBuilding(b)}>{b.buildingName}</h2>
                </div>
            ))}
            <h3>Gå med i byggnad</h3>
            <form onSubmit={joinBuilding}>
                <input type="text" name="code" placeholder='Kod' onChange={e => setBuildingCode(e.target.value)}/>
                <input type="submit" value="Skicka" disabled={!buildingCode}/>
                <br/>
                {isBuildingCodeWrong && <p>Dålig kod</p>}
            </form>
            {selectedBuilding && 
                <>
                    <TasksForBuilding building={selectedBuilding} userID={userID} />
                </>
            }
        </>
    )
};

export default WorkerSignedIn;
