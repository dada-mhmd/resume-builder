'use client';

import { ITemplate } from '@/interface';
import { deleteTemplateById } from '@/server-actions/templates';
import { Button, message, Table } from 'antd';
import { Pen, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const TemplatesTable = ({ data }: { data: ITemplate[] }) => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onDeleteTemplate = async (id: string) => {
    try {
      setLoading(true);
      const res = await deleteTemplateById(id);
      if (res.success) {
        message.success('Template deleted successfully');
      } else {
        message.error('Error deleting template');
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { title: 'Name', dataIndex: 'name' },
    {
      title: 'Is Only For Subscribers',
      dataIndex: 'isOnlyForSubscribers',
      render: (value: boolean) => (value ? 'Yes' : 'No'),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      render: (value: Date) => new Date(value).toLocaleString(),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (_: any, record: ITemplate) => (
        <div className='flex items-center justify-center gap-5'>
          <Button size='small' onClick={() => onDeleteTemplate(record._id)}>
            <Trash2 size={14} />
          </Button>
          <Button
            size='small'
            onClick={() => router.push(`/admin/templates/edit/${record._id}`)}
          >
            <Pen size={14} />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Table
      loading={loading}
      columns={columns}
      dataSource={data}
      bordered
      className='mt-7'
    />
  );
};

export default TemplatesTable;
