import React from 'react';

import SidenavBlock from './SidenavBlock';

import { clsx } from '../../utils/utils';

const Sidenav = ({ right, className, ...props }) => {
  return (
    <div className={clsx(['sidenav', {right}], className)} {...props}/>
  )
}

export default Sidenav;
