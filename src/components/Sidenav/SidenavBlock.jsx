import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { clsx } from '../../utils/utils';

import { ReactComponent as NotDroppedIcon } from '../../assets/svg/RightChevron.svg'
import { ReactComponent as DroppedIcon } from '../../assets/svg/DownChevron.svg'
import { ReactComponent as SignOutIcon } from '../../assets/svg/SignOut.svg'

const SidenavBlock = ({ to, text, className, onClick, dropContent, logOut }) => {

    const [showDrop, setShowDrop] = useState()

    return (
        <>
            <div className={clsx(['block', className])} onClick={() => (onClick && onClick(), logOut && logOut(), dropContent && setShowDrop(v => !v))}>
                <span>{text}</span>
                {dropContent && <span className='dropIconSlot'>{showDrop ? <DroppedIcon/> : <NotDroppedIcon/>}</span>}
                {logOut && <span className='signOutIconSlot'>{<SignOutIcon/>}</span>}
                {to && <Link to={to}/>}
            </div>
            {dropContent && showDrop &&
                <div className='drop'>
                    {dropContent}
                </div>
            }
        </>
    )
};

export default SidenavBlock;
