import { getAllTemplates } from '@/server-actions/templates';
import { Button } from 'antd';
import Link from 'next/link';
import React from 'react';
import TemplatesTable from './_components/templatesTable';

const AdminTemplates = async () => {
  const res = await getAllTemplates();
  if (!res.success) {
    return <div>{res?.message}</div>;
  }

  return (
    <div>
      <div className='flex items-center justify-between'>
        <h1 className='text-xl font-bold'>Templates</h1>
        <Button>
          <Link href='/admin/templates/new'>Add Template</Link>
        </Button>
      </div>

      <TemplatesTable data={res.data} />
    </div>
  );
};

export default AdminTemplates;
