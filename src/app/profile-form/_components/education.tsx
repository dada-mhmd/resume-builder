import React from 'react';
import { Button, Form, Input } from 'antd';
import { PlusCircle, Trash2 } from 'lucide-react';

const Education = () => {
  return (
    <div>
      <Form.List name='education'>
        {(fields, { add, remove }) => {
          return (
            <div>
              <Button className='my-5' size='middle' onClick={() => add()}>
                Add Education <PlusCircle size={16} />
              </Button>

              <div className='flex flex-col gap-5'>
                {fields?.map((field, i) => (
                  <div key={i} className='grid grid-cols-3  gap-5'>
                    <Form.Item
                      label='Qualification'
                      name={[field.name, 'qualification']}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label='Year of passing'
                      name={[field.name, 'yearOfPassing']}
                    >
                      <Input />
                    </Form.Item>

                    <Button
                      onClick={() => remove(field.name)}
                      className='border-0 w-max'
                    >
                      <Trash2 className='mt-8 hover:text-red-500' />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          );
        }}
      </Form.List>
    </div>
  );
};

export default Education;
