import React from 'react';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';
import { ArrowDown } from 'lucide-react';
import Link from 'next/link';

const AdminMenu = () => {
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <Link href='/admin/templates'>Templates</Link>,
    },
    {
      key: '2',
      label: <Link href='/admin/users'>Users</Link>,
    },
    {
      key: '3',
      label: <Link href='/admin/subscriptions'>Subscription</Link>,
    },
  ];

  return (
    <div>
      <Dropdown menu={{ items }} placement='bottomLeft' trigger={['click']}>
        <Button
          size='large'
          className='!bg-transparent !text-white border-none hover:!text-gray-300'
        >
          Admin <ArrowDown size={15} />
        </Button>
      </Dropdown>
    </div>
  );
};

export default AdminMenu;
