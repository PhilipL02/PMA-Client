import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import TasksForBuilding from '../../TaskTable/TasksForBuilding';
import CreateTask from './CreateTask';
import MembersOfBuilding from './MembersOfBuilding';
import { useGlobal } from '../../../providers/GlobalProvider';
import { useData } from '../../../providers/DataProvider';

const OneBuilding = () => {

    const { userID, phetch } = useGlobal()
    const { buildings, setBuildings, getBuildings } = useData()

    const location = useLocation()
    const navigate = useNavigate()

    const [building, setBuilding] = useState()
    const [members, setMembers] = useState()
    const [tasks, setTasks] = useState()    
    const [inviteCode, setInviteCode] = useState()
    const [isOwner, setIsOwner] = useState(false)

    const [isDeleteButtonClicked, setDeleteButtonClicked] = useState(false)
    const [deleteNameInput, setDeleteNameInput] = useState()

    const [isEditButtonClicked, setEditButtonClicked] = useState(false)
    const [editBuildingInputs, setEditBuildingInputs] = useState({
        buildingName: undefined,
        type: undefined,
        description: undefined,
        address: undefined,
        place: undefined,
        zipCode: undefined,
    })

    useEffect(() => {
        if(!(buildings && location)) return
        const buildingWithMatchingID = buildings.filter(b => b._id === new URLSearchParams(location.search).get('id'))[0]
        if(!buildingWithMatchingID) return setBuilding(false)
        setBuilding(buildingWithMatchingID)
    }, [buildings, location])

    useEffect(() => {
        if(!building) return
        setEditBuildingInputs({
            buildingName: building.buildingName,
            type: building.type,
            description: building.description,
            address: building.address,
            place: building.place,
            zipCode: building.zipCode,
        })
        setIsOwner(building.userID === userID)
        getMembers()
        getTasks()
    }, [building])

    async function getMembers() {
        let response = await phetch(`/buildings/users/get/${building._id}`)
        console.log(response)
        setMembers(response.data.members)
    }

    async function getTasks() {
        let response = await phetch(`/tasks/get/${building._id}`)
        console.log(response)
        if(response?.success) setTasks(response.data.tasks)
    }

    async function generateInviteCode() {
        let response = await phetch('/buildings/invite/create', {
            method: 'POST',
            body: {
                buildingID: building._id,
            }
        })
        console.log(response)
        if(response.success && response.data?.code) setInviteCode(response.data.code)
    }

    async function handleDeleteBuilding() {
        let response = await phetch(`/buildings/delete/${building._id}`, {
            method: 'POST',
        })
        if(response.success) {
            setDeleteButtonClicked(false)
            setBuildings(v => v.filter(b => b._id !== building._id))
            navigate('/minabyggnader')
        }
    }

    async function handleEditBuilding() {
        if(!(editBuildingInputs.buildingName && editBuildingInputs.type && editBuildingInputs.description)) return
        let response = await phetch(`/buildings/update`, {
            method: 'POST',
            body: {
                buildingID: building._id,
                buildingName: editBuildingInputs.buildingName,
                type: editBuildingInputs.type,
                description: editBuildingInputs.description,
                address: editBuildingInputs.address,
                place: editBuildingInputs.place,
                zipCode: editBuildingInputs.zipCode,
            }
        })
        if(response.success) {
            setEditButtonClicked(false)
            getBuildings()
        }
    }

    return (
        <>
            {(building === false) && "Byggnaden hittades inte"}
            {building && 
                <>
                    {isOwner && <button onClick={() => setDeleteButtonClicked(true)}>Ta bort byggnad</button>}
                    {isOwner && <button onClick={() => setEditButtonClicked(true)}>Ändra byggnad</button>}
                    <TasksForBuilding
                        building={building}
                        tasks={tasks} 
                        getTasks={getTasks}
                        userID={userID} 
                        isOwner={isOwner}
                        buildingMembers={members}
                    />
                    {isOwner &&
                        <div className='createAndMembersContainer'>
                            <CreateTask
                                buildingID={building._id}
                                getTasks={getTasks}
                            />
                            {members &&
                                <MembersOfBuilding
                                    members={members}
                                    {...{generateInviteCode, inviteCode}}
                                />
                            }
                        </div>
                    }
                </>
            }
            {isDeleteButtonClicked &&
                <div className='popupBackground' onClick={() => setDeleteButtonClicked(false)}>
                    <div className='deletePopupInner' onClick={e => e.stopPropagation()}>
                        <button onClick={() => setDeleteButtonClicked(false)}>Avbryt</button>
                        <h4>Är du säker på att du vill ta bort byggnaden?</h4>
                        <p>Skriv in namnet på byggnaden för att bekräfta</p>
                        <input type='text' onChange={e => setDeleteNameInput(e.target.value)}/>
                        <button disabled={deleteNameInput !== building.buildingName} onClick={handleDeleteBuilding}>Ta bort</button>
                    </div>
                </div>
            }
            {isEditButtonClicked &&
                <div className='popupBackground' onClick={() => setEditButtonClicked(false)}>
                    <div className='editPopupInner' onClick={e => e.stopPropagation()}>
                        <h3>Ändra byggnad</h3>
                        <div className='labelInputContainer'>
                            <label htmlFor='buildingName'>Namn</label>
                            <input type='text' id='buildingName' defaultValue={editBuildingInputs.buildingName} onChange={e => setEditBuildingInputs(v => ({...v, buildingName: e.target.value}))}/>
                        </div>
                        <div className='labelInputContainer'>
                            <label htmlFor='type'>Typ</label>
                            <input type='text' id='type' defaultValue={editBuildingInputs.type} onChange={e => setEditBuildingInputs(v => ({...v, type: e.target.value}))}/>
                        </div>
                        <div className='labelInputContainer'>
                            <label htmlFor='description'>Beskrivning</label>
                            <textarea type='text' id='description' defaultValue={editBuildingInputs.description} onChange={e => setEditBuildingInputs(v => ({...v, description: e.target.value}))} rows='1'/>
                        </div>
                        <div className='labelInputContainer'>
                            <label htmlFor='address'>Adress</label>
                            <textarea type='text' id='address' defaultValue={editBuildingInputs.address} onChange={e => setEditBuildingInputs(v => ({...v, address: e.target.value}))} rows='1'/>
                        </div>
                        <div className='labelInputContainer'>
                            <label htmlFor='place'>Ort</label>
                            <textarea type='text' id='place' defaultValue={editBuildingInputs.place} onChange={e => setEditBuildingInputs(v => ({...v, place: e.target.value}))} rows='1'/>
                        </div>
                        <div className='labelInputContainer'>
                            <label htmlFor='zipCode>'>Postnummer</label>
                            <textarea type='text' id='zipCode' defaultValue={editBuildingInputs.zipCode} onChange={e => setEditBuildingInputs(v => ({...v, zipCode: e.target.value}))} rows='1'/>
                        </div>
                        <button disabled={!(editBuildingInputs.buildingName && editBuildingInputs.type && editBuildingInputs.description)} onClick={handleEditBuilding}>Spara ändringar</button>
                    </div>
                </div>
            }
        </>
    )
};

export default OneBuilding;
