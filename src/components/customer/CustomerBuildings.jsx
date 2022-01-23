import React, { useEffect, useState } from 'react'

import TasksForBuilding from '../TasksForBuilding'

const UserSignedIn = ({ userID, buildings, getBuildings, selectedBuilding, setSelectedBuilding, setInvalidToken, phetch }) => {

    const [newBuildingName, setNewBuildingName] = useState()
    const [selectedBuildingToDelete, setSelectedBuildingToDelete] = useState()
    const [deleteBuildingInput, setDeleteBuildingInput] = useState()
    const [doesDeleteBuildingInputMatchName, setDeleteBuildingInputMatchName] = useState()

    useEffect(() => {
        setSelectedBuilding(undefined)
    }, [])

    useEffect(() => {
        if(!selectedBuildingToDelete) return
        setDeleteBuildingInputMatchName(deleteBuildingInput === selectedBuildingToDelete.buildingName)
    }, [deleteBuildingInput, selectedBuildingToDelete])

    async function handleCreateBuilding(e) {
        e.preventDefault()
        let response = await phetch('/buildings/create', {
            method: 'POST',
            body: {
                userID,
                buildingName: newBuildingName,
            }
        })
        console.log(response)
        if(response?.success) getBuildings()
        if(response.type === 'InvalidToken') setInvalidToken(true)
    }   

    async function deleteBuildingHandler(buildingID) {
        let response = await phetch('/buildings/delete', {
            method: 'POST',
            body: {
                userID,
                buildingID,
            }
        })
        console.log(response)
        if(response?.success) getBuildings()
        if(response.type === 'InvalidToken') setInvalidToken(true)
    }

    return (
        <>
            {buildings && !selectedBuilding && buildings.map(b => (
                <div key={b._id} className='oneBuilding'>
                    <h2 onClick={e => setSelectedBuilding(b)}>{b.buildingName}</h2>
                    <button onClick={() => setSelectedBuildingToDelete(b)}>Ta bort</button>
                </div>
            ))}
            <h3>Lägg till byggnad</h3>
            <form onSubmit={handleCreateBuilding}>
                <input type="text" name="buildingName" placeholder='Namn' onChange={e => setNewBuildingName(e.target.value)}/>
                <input type="submit" value="Lägg till"/>
            </form>

            <hr/>
            <br/>

            {selectedBuildingToDelete && 
                <div>
                    <span>Skriv in namnet på byggnaden för att radera</span>
                    <button onClick={() => setSelectedBuildingToDelete(undefined)}>Stäng</button>
                    <form onSubmit={e => (e.preventDefault(), deleteBuildingHandler(selectedBuildingToDelete._id), setSelectedBuildingToDelete(undefined), setDeleteBuildingInput(undefined))}>
                        <input type="text" name="deleteBuildingName" placeholder='Namn' onChange={e => setDeleteBuildingInput(e.target.value)}/>
                        <input type="submit" value="Ta bort" disabled={!doesDeleteBuildingInputMatchName}/>
                    </form>
                </div>
            }
        </>
    )
}

export default UserSignedIn
