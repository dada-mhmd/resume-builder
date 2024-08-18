import Link from 'next/link';

import { ITemplate } from '@/interface';
import { getAllTemplates } from '@/server-actions/templates';

const Home = async () => {
  const res = await getAllTemplates();
  if (!res.success) {
    return <div>{res?.message}</div>;
  }
  const data = await res.data;

  return (
    <div className='flex flex-col gap-4 '>
      <div className=''>
        <h1 className='text-xl font-bold'>Templates</h1>
        <span className='text-gray-500 text-sm'>
          A collection of templates to help you get started with your resume.
        </span>
      </div>

      <div className='mt-5 grid grid-cols-5 gap-10'>
        {data?.map((template: ITemplate) => (
          <Link
            key={template?._id}
            href={`/template/${template?._id}`}
            className='border border-gray-300 hover:border-gray-600'
          >
            <img
              src={template?.thumbnail}
              alt={template?.name}
              className='w-full h-96'
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
