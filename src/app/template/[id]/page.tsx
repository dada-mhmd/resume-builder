import { getTemplateById } from '@/server-actions/templates';
import React from 'react';
import Resume from '../_components/Resume';

const TemplatePreview = async ({ params }: { params: { id: string } }) => {
  const res = await getTemplateById(params.id);

  return (
    <div className='flex justify-center'>
      <Resume template={res.data} />
    </div>
  );
};

export default TemplatePreview;
