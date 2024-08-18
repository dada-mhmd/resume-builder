'use client';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useReactToPrint } from 'react-to-print';
import Mustache from 'mustache';
import { Button } from 'antd';

import { ITemplate } from '@/interface';
import usersGlobalStore, { IUsersStore } from '@/store/usersStore';

const Resume = ({ template }: { template: ITemplate }) => {
  const router = useRouter();
  const { currentUserData }: IUsersStore = usersGlobalStore();
  if (!currentUserData?.resumeProfileData) {
    return <div>No Data</div>;
  }

  const html = Mustache.render(
    template.html,
    currentUserData?.resumeProfileData
  );

  const componentRef: any = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className='flex flex-col gap-8'>
      <div className='flex justify-end gap-5'>
        <Button onClick={() => router.push('/')}>Back To Templates</Button>
        <Button type='primary' onClick={handlePrint}>
          Download
        </Button>
      </div>

      <div className='border border-solid border-gray-300 rounded-sm'>
        <div dangerouslySetInnerHTML={{ __html: html }} ref={componentRef} />
      </div>
    </div>
  );
};

export default Resume;
