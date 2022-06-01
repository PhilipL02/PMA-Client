import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import { useGlobal } from '../../providers/GlobalProvider'
import { useData } from '../../providers/DataProvider'

import { ReactComponent as Cross } from '../../assets/svg/Cross.svg'

const OneTaskOptions = ({ taskID, taskStatus, isAssignedToThisUser, isBuildingOwner }) => {

    const navigate = useNavigate()

    const { phetch, userID } = useGlobal()
    const { getMyTasks } = useData()

    const [showIdlePopup, setShowIdlePopup] = useState()
    const [showAssignedPopup, setShowAssignedPopup] = useState()
    const [showInProgressPopup, setShowInProgressPopup] = useState()
    const [showCompletedPopup, setShowCompletedPopup] = useState()
    const [approxTime, setApproxTime] = useState()
    const [approxCost, setApproxCost] = useState()

    async function takeTask() {
        let response = await phetch('/tasks/take', {
            method: 'POST',
            body: {
                taskID,
                approxCost,
                approxTime,
            }
        })
        console.log(response)
        if(response?.success) getMyTasks()
    }

    async function acceptAssignedTask() {
        let response = await phetch('/tasks/assigned/accept', {
            method: 'POST',
            body: {
                taskID,
                approxCost,
                approxTime,
                // comment
            }
        })
        console.log(response)
        if(response?.success) getMyTasks()
    }

    async function declineAssignedTask() {
        let response = await phetch('/tasks/assigned/decline', {
            method: 'POST',
            body: {
                taskID,
            }
        })
        console.log(response)
        if(response?.success) {
            navigate('/minauppgifter')
            getMyTasks()
        }
    }

    async function leaveTask() {
        let response = await phetch('/tasks/leave', {
            method: 'POST',
            body: {
                taskID,
            }
        })
        console.log(response)
        if(response?.success) {
            navigate('/minauppgifter')
            getMyTasks()
        }
    }

    async function removeWorkerFromTask() {
        let response = await phetch('/tasks/worker/remove', {
            method: 'POST',
            body: {
                taskID,
                userID,
            }
        })
        console.log(response)
        if(response?.success) {
            getMyTasks()
        }
    }
    
    async function taskCompleted() {
        let response = await phetch('/tasks/completed/is', {
            method: 'POST',
            body: {
                taskID,
            }
        })
        console.log(response)
        if(response?.success) getMyTasks()
    }

    async function taskNotCompleted() {
        let response = await phetch('/tasks/completed/not', {
            method: 'POST',
            body: {
                taskID,
            }
        })
        console.log(response)
        if(response?.success) getMyTasks()
    }

    return (
        <>
        {taskStatus === 'idle' && 
                <>
                    <div className='options idleOptions'>
                        <button onClick={() => setShowIdlePopup('takeOn')}>Ta an uppgift</button>
                    </div>
                    {!!showIdlePopup && 
                        <div className='taskPopup' onClick={() => setShowIdlePopup(undefined)}>
                            {showIdlePopup === 'takeOn' ? 
                                <div className='taskPopupInner' onClick={e => e.stopPropagation()}>
                                    <h1>Ta an uppgift</h1>
                                    <Cross className="closeCross" onClick={() => setShowIdlePopup(undefined)}/>
                                    <p>Skriv in beräknad tid och kostnad för att ta an uppgiften</p>
                                    <div className='inputs'>
                                        <label htmlFor='approxTime'>Beräknad tid (timmar)</label>
                                        <input type="text" id='approxTime' onChange={e => setApproxTime(e.target.value)}/>
                                        <label htmlFor='approxCost'>Beräknad kostnad (kr)</label>
                                        <input type="text" id='approxCost' onChange={e => setApproxCost(e.target.value)}/>
                                    </div>
                                    <div className='buttons'>
                                        <button onClick={() => (setShowIdlePopup(undefined), takeTask())}>Ta an</button>
                                        <button onClick={() => setShowIdlePopup(undefined)}>Avbryt</button>
                                    </div>
                                </div>
                            : null}
                        </div>
                    }
                </>
            }
            {taskStatus === 'assigned' &&
            <>
                {isAssignedToThisUser ? 
                    <>
                        <div className='options assignedOptions'>
                            <button onClick={() => setShowAssignedPopup('accept')}>Acceptera</button>
                            <button onClick={() => setShowAssignedPopup('decline')}>Avböj</button>
                        </div>
                        {!!showAssignedPopup && 
                            <div className='taskPopup' onClick={() => setShowAssignedPopup(undefined)}>
                                {showAssignedPopup === 'accept' ? 
                                    <div className='taskPopupInner' onClick={e => e.stopPropagation()}>
                                        <h1>Acceptera</h1>
                                        <Cross className="closeCross" onClick={() => setShowAssignedPopup(undefined)}/>
                                        <p>Skriv in beräknad tid och kostnad för att ta an uppgiften</p>
                                        <div className='inputs'>
                                            <label htmlFor='approxTime'>Beräknad tid (timmar)</label>
                                            <input type="text" id='approxTime' onChange={e => setApproxTime(e.target.value)}/>
                                            <label htmlFor='approxCost'>Beräknad kostnad (kr)</label>
                                            <input type="text" id='approxCost' onChange={e => setApproxCost(e.target.value)}/>
                                        </div>
                                        <div className='buttons'>
                                            <button onClick={() => (setShowAssignedPopup(undefined), acceptAssignedTask())}>Acceptera</button>
                                            <button onClick={() => setShowAssignedPopup(undefined)}>Avbryt</button>
                                        </div>
                                    </div>
                                : showAssignedPopup === 'decline' ? 
                                    <div className='taskPopupInner' onClick={e => e.stopPropagation()}>
                                        <h1>Avböj</h1>
                                        <Cross className="closeCross" onClick={() => setShowAssignedPopup(undefined)}/>
                                        <p>Genom att avböja säger du till byggnadsägaren att du inte ska göra denna uppgift</p>
                                        <p>Är du säker på att du vill avböja?</p>
                                        <div className='buttons'>
                                            <button onClick={() => (setShowAssignedPopup(undefined), declineAssignedTask())}>Ja</button>
                                            <button onClick={() => setShowAssignedPopup(undefined)}>Avbryt</button>
                                        </div>
                                    </div>
                                : null}
                            </div>
                        }
                    </>
                : isBuildingOwner ?
                    <>
                        <p>Du har tilldelat denna uppgift till en arbetare</p>
                       <div className='options assignedOptions'>
                            <button onClick={() => setShowAssignedPopup('removeAssignment')}>Ta bort tilldelning</button>
                        </div>
                        {!!showAssignedPopup && 
                            <div className='taskPopup' onClick={() => setShowAssignedPopup(undefined)}>
                                {showAssignedPopup === 'removeAssignment' ? 
                                    <div className='taskPopupInner' onClick={e => e.stopPropagation()}>
                                        <h1>Ta bort tilldelning</h1>
                                        <Cross className="closeCross" onClick={() => setShowAssignedPopup(undefined)}/>
                                        <p>Är du säker på att du vill ta bort tilldelningen av denna uppgift?</p>
                                        <div className='buttons'>
                                            <button onClick={() => (setShowAssignedPopup(undefined), removeWorkerFromTask())}>Ja</button>
                                            <button onClick={() => setShowAssignedPopup(undefined)}>Avbryt</button>
                                        </div>
                                    </div>
                                : null}
                            </div>
                        }
                    </>
                : null
                }
                </>
            }
            {taskStatus === 'inProgress' &&
            <>
                {isAssignedToThisUser ? 
                    <>
                        <div className='options inProgressOptions'>
                            <button onClick={() => setShowInProgressPopup('completed')}>Klar</button>
                            <button onClick={() => setShowInProgressPopup('leave')}>Lämna</button>
                        </div>
                        {!!showInProgressPopup && 
                            <div className='taskPopup' onClick={() => setShowInProgressPopup(undefined)}>
                                {showInProgressPopup === 'completed' ? 
                                    <div className='taskPopupInner' onClick={e => e.stopPropagation()}>
                                        <h1>Klar</h1>
                                        <Cross className="closeCross" onClick={() => setShowInProgressPopup(undefined)}/>
                                        <p>Vill du meddela byggnadsägaren att denna uppgift är klar?</p>
                                        <div className='buttons'>
                                            <button onClick={() => (setShowInProgressPopup(undefined), taskCompleted())}>Ja</button>
                                            <button onClick={() => setShowInProgressPopup(undefined)}>Avbryt</button>
                                        </div>
                                    </div>
                                : showInProgressPopup === 'leave' ? 
                                    <div className='taskPopupInner' onClick={e => e.stopPropagation()}>
                                        <h1>Lämna</h1>
                                        <Cross className="closeCross" onClick={() => setShowInProgressPopup(undefined)}/>
                                        <p>Genom att lämna säger du till byggnadsägaren att du inte ska göra denna uppgift</p>
                                        <p>Är du säker på att du vill lämna?</p>
                                        <div className='buttons'>
                                            <button onClick={() => (setShowInProgressPopup(undefined), leaveTask())}>Ja</button>
                                            <button onClick={() => setShowInProgressPopup(undefined)}>Avbryt</button>
                                        </div>
                                    </div>
                                : null}
                            </div>
                        }
                    </>
                : isBuildingOwner ?
                    <>
                        <div className='options inProgressOptions'>
                            <button onClick={() => setShowInProgressPopup('completed')}>Klar</button>
                            <button onClick={() => setShowInProgressPopup('removeWorker')}>Ta bort arbetare</button>
                        </div>
                        {!!showInProgressPopup && 
                            <div className='taskPopup' onClick={() => setShowInProgressPopup(undefined)}>
                                {showInProgressPopup === 'completed' ? 
                                    <div className='taskPopupInner' onClick={e => e.stopPropagation()}>
                                        <h1>Klar</h1>
                                        <Cross className="closeCross" onClick={() => setShowInProgressPopup(undefined)}/>
                                        <p>Vill du markera denna uppgift som klar?</p>
                                        <div className='buttons'>
                                            <button onClick={() => (setShowInProgressPopup(undefined), taskCompleted())}>Ja</button>
                                            <button onClick={() => setShowInProgressPopup(undefined)}>Avbryt</button>
                                        </div>
                                    </div>
                                : showInProgressPopup === 'removeWorker' ? 
                                    <div className='taskPopupInner' onClick={e => e.stopPropagation()}>
                                        <h1>Ta bort arbetare</h1>
                                        <Cross className="closeCross" onClick={() => setShowInProgressPopup(undefined)}/>
                                        <p>Är du säker på att du vill ta bort arbetaren från denna uppgift?</p>
                                        <div className='buttons'>
                                            <button onClick={() => (setShowInProgressPopup(undefined), removeWorkerFromTask())}>Ja</button>
                                            <button onClick={() => setShowInProgressPopup(undefined)}>Avbryt</button>
                                        </div>
                                    </div>
                                : null}
                            </div>
                        }
                    </>
                : null
                }
                </>
            }
            {taskStatus === 'completed' &&
            <>
                {isAssignedToThisUser ? 
                    <>
                        <div className='options completedOptions'>
                            <button onClick={() => setShowCompletedPopup('notCompleted')}>Inte klar</button>
                        </div>
                        {!!showCompletedPopup && 
                            <div className='taskPopup' onClick={() => setShowCompletedPopup(undefined)}>
                                {showCompletedPopup === 'notCompleted' ? 
                                    <div className='taskPopupInner' onClick={e => e.stopPropagation()}>
                                        <h1>Inte klar</h1>
                                        <Cross className="closeCross" onClick={() => setShowInProgressPopup(undefined)}/>
                                        <p>Vill du meddela byggnadsägaren att denna uppgift inte är klar?</p>
                                        <div className='buttons'>
                                            <button onClick={() => (setShowCompletedPopup(undefined), taskNotCompleted())}>Ja</button>
                                            <button onClick={() => setShowCompletedPopup(undefined)}>Avbryt</button>
                                        </div>
                                    </div>
                                : null}
                            </div>
                        }
                    </>
                : isBuildingOwner ?
                    <>
                        <div className='options completedOptions'>
                            <button onClick={() => setShowCompletedPopup('notCompleted')}>Inte klar</button>
                        </div>
                        {!!showCompletedPopup && 
                            <div className='taskPopup' onClick={() => setShowCompletedPopup(undefined)}>
                                {showCompletedPopup === 'notCompleted' ? 
                                    <div className='taskPopupInner' onClick={e => e.stopPropagation()}>
                                        <h1>Inte klar</h1>
                                        <Cross className="closeCross" onClick={() => setShowInProgressPopup(undefined)}/>
                                        <p>Vill du meddela arbetaren att denna uppgift inte är klar?</p>
                                        <div className='buttons'>
                                            <button onClick={() => (setShowCompletedPopup(undefined), taskNotCompleted())}>Ja</button>
                                            <button onClick={() => setShowCompletedPopup(undefined)}>Avbryt</button>
                                        </div>
                                    </div>
                                : null}
                            </div>
                        }
                    </>
                : null
                }
                </>
            }
            {/* {taskStatus === 'idle' && 
                <>
                    <div className='options idleOptions'>
                        <button onClick={() => setShowIdlePopup('takeOn')}>Ta an uppgift</button>
                    </div>
                    {!!showIdlePopup && 
                        <div className='taskPopup' onClick={() => setShowIdlePopup(undefined)}>
                            {showIdlePopup === 'takeOn' ? 
                                <div className='taskPopupInner' onClick={e => e.stopPropagation()}>
                                    <h1>Ta an uppgift</h1>
                                    <Cross className="closeCross" onClick={() => setShowIdlePopup(undefined)}/>
                                    <p>Skriv in beräknad tid och kostnad för att ta an uppgiften</p>
                                    <div className='inputs'>
                                        <label htmlFor='approxTime'>Beräknad tid (timmar)</label>
                                        <input type="text" id='approxTime' onChange={e => setApproxTime(e.target.value)}/>
                                        <label htmlFor='approxCost'>Beräknad kostnad (kr)</label>
                                        <input type="text" id='approxCost' onChange={e => setApproxCost(e.target.value)}/>
                                    </div>
                                    <div className='buttons'>
                                        <button onClick={() => (setShowIdlePopup(undefined), takeTask())}>Ta an</button>
                                        <button onClick={() => setShowIdlePopup(undefined)}>Avbryt</button>
                                    </div>
                                </div>
                            : null}
                        </div>
                    }
                </>
            }
            {(taskStatus === 'assigned' && isAssignedToThisUser) &&
                <>
                    <div className='options assignedOptions'>
                        <button onClick={() => setShowAssignedPopup('accept')}>Acceptera</button>
                        <button onClick={() => setShowAssignedPopup('decline')}>Avböj</button>
                    </div>
                    {!!showAssignedPopup && 
                        <div className='taskPopup' onClick={() => setShowAssignedPopup(undefined)}>
                            {showAssignedPopup === 'accept' ? 
                                <div className='taskPopupInner' onClick={e => e.stopPropagation()}>
                                    <h1>Acceptera</h1>
                                    <Cross className="closeCross" onClick={() => setShowAssignedPopup(undefined)}/>
                                    <p>Skriv in beräknad tid och kostnad för att ta an uppgiften</p>
                                    <div className='inputs'>
                                        <label htmlFor='approxTime'>Beräknad tid (timmar)</label>
                                        <input type="text" id='approxTime' onChange={e => setApproxTime(e.target.value)}/>
                                        <label htmlFor='approxCost'>Beräknad kostnad (kr)</label>
                                        <input type="text" id='approxCost' onChange={e => setApproxCost(e.target.value)}/>
                                    </div>
                                    <div className='buttons'>
                                        <button onClick={() => (setShowAssignedPopup(undefined), acceptAssignedTask())}>Acceptera</button>
                                        <button onClick={() => setShowAssignedPopup(undefined)}>Avbryt</button>
                                    </div>
                                </div>
                            : showAssignedPopup === 'decline' ? 
                                <div className='taskPopupInner' onClick={e => e.stopPropagation()}>
                                    <h1>Avböj</h1>
                                    <Cross className="closeCross" onClick={() => setShowAssignedPopup(undefined)}/>
                                    <p>Genom att avböja säger du till byggnadsägaren att du inte ska göra denna uppgift</p>
                                    <p>Är du säker på att du vill avböja?</p>
                                    <div className='buttons'>
                                        <button onClick={() => (setShowAssignedPopup(undefined), declineAssignedTask())}>Ja</button>
                                        <button onClick={() => setShowAssignedPopup(undefined)}>Avbryt</button>
                                    </div>
                                </div>
                            : null}
                        </div>
                    }
                </>
            }
            {(taskStatus === 'inProgress' && isAssignedToThisUser) &&
                <>
                    <div className='options inProgressOptions'>
                        <button onClick={() => setShowInProgressPopup('completed')}>Klar</button>
                        <button onClick={() => setShowInProgressPopup('leave')}>Lämna</button>
                    </div>
                    {!!showInProgressPopup && 
                        <div className='taskPopup' onClick={() => setShowInProgressPopup(undefined)}>
                            {showInProgressPopup === 'completed' ? 
                                <div className='taskPopupInner' onClick={e => e.stopPropagation()}>
                                    <h1>Klar</h1>
                                    <Cross className="closeCross" onClick={() => setShowInProgressPopup(undefined)}/>
                                    <p>Vill du meddela byggnadsägaren att denna uppgift är klar?</p>
                                    <div className='buttons'>
                                        <button onClick={() => (setShowInProgressPopup(undefined), taskCompleted())}>Ja</button>
                                        <button onClick={() => setShowInProgressPopup(undefined)}>Avbryt</button>
                                    </div>
                                </div>
                            : showInProgressPopup === 'leave' ? 
                                <div className='taskPopupInner' onClick={e => e.stopPropagation()}>
                                    <h1>Lämna</h1>
                                    <Cross className="closeCross" onClick={() => setShowInProgressPopup(undefined)}/>
                                    <p>Genom att lämna säger du till byggnadsägaren att du inte ska göra denna uppgift</p>
                                    <p>Är du säker på att du vill lämna?</p>
                                    <div className='buttons'>
                                        <button onClick={() => (setShowInProgressPopup(undefined), leaveTask())}>Ja</button>
                                        <button onClick={() => setShowInProgressPopup(undefined)}>Avbryt</button>
                                    </div>
                                </div>
                            : null}
                        </div>
                    }
                </>
            }
            {(taskStatus === 'completed' && isAssignedToThisUser) &&
                <>
                    <div className='options completedOptions'>
                        <button onClick={() => setShowCompletedPopup('notCompleted')}>Inte klar</button>
                    </div>
                    {!!showCompletedPopup && 
                        <div className='taskPopup' onClick={() => setShowCompletedPopup(undefined)}>
                            {showCompletedPopup === 'notCompleted' ? 
                                <div className='taskPopupInner' onClick={e => e.stopPropagation()}>
                                    <h1>Inte klar</h1>
                                    <Cross className="closeCross" onClick={() => setShowInProgressPopup(undefined)}/>
                                    <p>Vill du meddela byggnadsägaren att denna uppgift inte är klar?</p>
                                    <div className='buttons'>
                                        <button onClick={() => (setShowCompletedPopup(undefined), taskNotCompleted())}>Ja</button>
                                        <button onClick={() => setShowCompletedPopup(undefined)}>Avbryt</button>
                                    </div>
                                </div>
                            : null}
                        </div>
                    }
                </>
            } */}
        </>
    )
}

export default OneTaskOptions