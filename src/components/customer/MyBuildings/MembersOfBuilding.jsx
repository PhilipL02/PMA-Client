import React, { useState } from 'react';

import { useCreateTask } from '../../../providers/CreateTaskProvider';
import { useGlobal } from '../../../providers/GlobalProvider';

import { ReactComponent as CopyIcon } from '../../../assets/svg/Copy.svg'

const MembersOfBuilding = ({ members, generateInviteCode, inviteCode }) => {

    const { userID } = useGlobal()
    const { shouldSelectAssignedToUser, setSelectAssignedToUser, setAssignedToUser } = useCreateTask()

    const [copyTooltipText, setCopyTooltipText] = useState("Kopiera")

    function handleCopyInviteCode() {
        setCopyTooltipText("Kopierad")
        navigator.clipboard.writeText(inviteCode)
    }

    function handleOnCopyMouseLeave() {
        if(copyTooltipText === "Kopiera") return
        setCopyTooltipText("Kopiera")
    }

    return (
        <div className='membersOfBuilding'>
            <h1>Medlemmar</h1>
            <div className='members'>
                {shouldSelectAssignedToUser ?
                    <>
                        {members.map(m => (
                            <div className='member' style={{fontWeight: (userID === m._id) ? 'bold' : 'normal'}} onClick={() => (setAssignedToUser(m), setSelectAssignedToUser(false))} key={m._id}>{m.name}</div>
                        ))}
                    </>
                :
                    <>
                        {members.map(m => (
                            <div className='member' style={{fontWeight: (userID === m._id) ? 'bold' : 'normal'}} key={m._id}>{m.name}</div>
                        ))}
                    </>
                }
            </div>
            <div className='generateInviteCode'>
                <button className='btnGenerate' onClick={generateInviteCode}>Generera inbjudningskod</button>
                {!inviteCode 
                    ? <p className='helpInfo'>Du kan som max ha 10 aktiva inbjudningskoder</p>
                    : <div className='codeContainer'>
                        <span>Kod</span>
                        <p className='code'>{inviteCode}</p>
                        <button className='copy' onMouseLeave={handleOnCopyMouseLeave} onClick={handleCopyInviteCode}>
                            <span className="tooltiptext">{copyTooltipText}</span>
                            <CopyIcon/>
                        </button>
                    </div>
                }
            </div>
        </div>
    )
};

export default MembersOfBuilding;
