'use client';

import React, { useEffect, useState } from 'react';
import { UserButton } from '@clerk/nextjs';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { message } from 'antd';

import { getCurrentUserFromDatabase } from '@/server-actions/users';
import usersGlobalStore from '@/store/usersStore';
import { IUsersStore } from '../../store/usersStore';
import Spinner from '@/components/Spinner';
import AdminMenu from './admin-menu';

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();
  const params = useParams();

  const pathname = usePathname();
  const isProtected =
    !pathname.includes('/sign-in') && !pathname.includes('/sign-up');

  const isAdminRoute = pathname.includes('/admin');

  // get data from store
  const { setCurrentUserData, currentUserData }: IUsersStore =
    usersGlobalStore() as any;

  //   get current user
  const getCurrentUser = async () => {
    try {
      setLoading(true);
      const res = await getCurrentUserFromDatabase();
      if (res.success) {
        setCurrentUserData(res?.data);
      } else {
        message.error(res.message);
        setError(res.message);
      }
    } catch (error: any) {
      message.error(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isProtected && !currentUserData) {
      getCurrentUser();
    }
  }, [pathname]);

  if (!isProtected) {
    return <>{children}</>;
  }

  if (loading)
    return (
      <div className='flex justify-center items-center h-screen'>
        <Spinner />
      </div>
    );

  if (error) return <div className='p-5'>{error}</div>;

  if (
    currentUserData &&
    !currentUserData?.isAdmin &&
    isAdminRoute &&
    !loading
  ) {
    <div className='p-5 text-sm text-gray-500'>
      You don't have permission to access this page
    </div>;
  }

  let showHeader = true;

  if (pathname === `/template/${params.id}`) {
    showHeader = false;
  }

  return (
    <>
      {showHeader && (
        <div className='header p-5 bg-primary flex justify-between items-center'>
          <h1
            onClick={() => router.push('/')}
            className='text-xl text-white font-bold cursor-pointer'
          >
            ResumeGenius
          </h1>
          <div className='flex items-center gap-5'>
            {currentUserData?.isAdmin ? (
              <AdminMenu />
            ) : (
              <h1
                onClick={() => router.push('/profile')}
                className='test-sm text-white capitalize cursor-pointer'
              >
                {currentUserData?.name}
              </h1>
            )}
            <UserButton />
          </div>
        </div>
      )}

      <div className='p-5'>{children}</div>
    </>
  );
};

export default LayoutProvider;
