'use client';

import { useState } from 'react';
import { Button, Form, message, Tabs } from 'antd';
import type { TabsProps } from 'antd';

import Basics from './_components/basics';
import Experience from './_components/experience';
import Education from './_components/education';
import Skills from './_components/skills';
import usersGlobalStore, { IUsersStore } from '../../store/usersStore';
import { updateUserProfile } from '@/server-actions/users';

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Basics',
    children: <Basics />,
  },
  {
    key: '2',
    label: 'Education',
    children: <Education />,
  },
  {
    key: '3',
    label: 'Experience',
    children: <Experience />,
  },
  {
    key: '4',
    label: 'Skills',
    children: <Skills />,
  },
];

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('1');
  const [loading, setLoading] = useState(false);

  const { currentUserData, setCurrentUserData }: IUsersStore =
    usersGlobalStore();

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      ['skills', 'education', 'experience'].forEach((key) => {
        if (!values[key]) {
          values[key] = currentUserData?.resumeProfileData[key] || [];
        }
      });
      const res = await updateUserProfile({
        userId: currentUserData!._id,
        data: {
          ...currentUserData,
          resumeProfileData: values,
        },
      });

      if (res.success) {
        message.success('Profile updated successfully');
        setCurrentUserData(res.data);
      } else {
        message.error('Error updating profile');
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className='text-lg font-bold'>Profile</h1>

      <Form
        layout='vertical'
        onFinish={onFinish}
        initialValues={currentUserData?.resumeProfileData}
      >
        <Tabs
          defaultActiveKey='1'
          activeKey={activeTab}
          items={items}
          onChange={(key) => setActiveTab(key)}
        />

        <div className='flex justify-center mt-10 gap-10'>
          <Button disabled={loading}>Cancel</Button>
          <Button htmlType='submit' type='primary' loading={loading}>
            Save
          </Button>
        </div>
      </Form>
    </>
  );
};

export default ProfilePage;
