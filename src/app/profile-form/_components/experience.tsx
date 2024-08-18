import { Button, Form, Input } from 'antd';
import { PlusCircle, Trash2 } from 'lucide-react';

const Experience = () => {
  return (
    <>
      <Form.List name='experience'>
        {(fields, { add, remove }) => {
          return (
            <div>
              <Button className='my-5' size='middle' onClick={() => add()}>
                Add Experience <PlusCircle size={16} />
              </Button>

              <div className='flex flex-col gap-12'>
                {fields?.map((field, i) => (
                  <div
                    key={i}
                    className='grid grid-cols-4 gap-5 p-5 border border-black'
                  >
                    <Form.Item label='Company' name={[field.name, 'company']}>
                      <Input />
                    </Form.Item>

                    <Form.Item label='Role' name={[field.name, 'role']}>
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label='Start Date'
                      name={[field.name, 'startDate']}
                    >
                      <Input type='date' />
                    </Form.Item>

                    <Form.Item label='End Date' name={[field.name, 'endDate']}>
                      <Input
                        placeholder='End Date / Present'
                        className='placeholder:text-gray-500'
                      />
                    </Form.Item>

                    <div className='col-span-4 flex gap-5'>
                      <Form.Item
                        label='Responsibilities'
                        name={[field.name, 'responsibilities']}
                        className='flex-1'
                      >
                        <Input.TextArea />
                      </Form.Item>
                      <Button
                        onClick={() => remove(field.name)}
                        className='border-0 w-max'
                      >
                        <Trash2 className='mt-14 hover:text-red-500' />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        }}
      </Form.List>
    </>
  );
};

export default Experience;
