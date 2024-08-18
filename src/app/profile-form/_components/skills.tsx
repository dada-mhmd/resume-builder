import { Button, Form, Input } from 'antd';
import { PlusCircle, Trash2 } from 'lucide-react';

const Skills = () => {
  return (
    <div>
      <Form.List name='skills'>
        {(fields, { add, remove }) => {
          return (
            <div>
              <Button className='my-5' size='middle' onClick={() => add()}>
                Add Skill <PlusCircle size={16} />
              </Button>

              <div className='flex flex-col gap-5'>
                {fields?.map((field, i) => (
                  <div key={i} className='grid grid-cols-4 gap-5'>
                    <Form.Item
                      label='Technology'
                      name={[field.name, 'technology']}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item label='Rating' name={[field.name, 'rating']}>
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

export default Skills;
