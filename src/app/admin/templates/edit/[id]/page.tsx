import React from 'react';
import TemplateForm from '../../_components/template-form';
import { getTemplateById } from '@/server-actions/templates';

const EditTemplate = async ({ params }: { params: { id: string } }) => {
  const res = await getTemplateById(params.id);
  if (!res.success) {
    return <div>{res?.message}</div>;
  }

  return (
    <div>
      <h1 className='text-xl font-bold'>Edit Template</h1>
      <TemplateForm initialValues={res.data} type='edit' />
    </div>
  );
};

export default EditTemplate;
