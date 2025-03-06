import Menu from '@mui/material/Menu';
import React from 'react';
// import { Layout, Menu } from 'antd';
// import type { ItemType, MenuItemType } from 'antd/es/menu/hooks/useItems';

// export type Items = ItemType<MenuItemType>[] | undefined;
// items={items} 
interface AppSideMenuSubmenuProps {
  defaultSelectedKey: string;
  // items: Items;
}

export const AppSideMenuSubmenu = (props: AppSideMenuSubmenuProps) => {
  const { defaultSelectedKey } = props;
  return (
    <React.Fragment >
      <Menu className='bg-cyan-700 text-cyan-200' open defaultValue={[defaultSelectedKey,]} />
    </React.Fragment>
  )
}
