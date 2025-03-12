import Menu from '@mui/material/Menu';
import React from 'react';

interface AppSideMenuSubmenuProps {
  defaultSelectedKey: string;
}

export const AppSideMenuSubmenu = (props: AppSideMenuSubmenuProps) => {
  const { defaultSelectedKey } = props;
  return (
    <React.Fragment >
      <Menu className='bg-cyan-700 text-cyan-200' open defaultValue={[defaultSelectedKey,]} />
    </React.Fragment>
  )
}
