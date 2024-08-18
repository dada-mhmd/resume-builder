import { Form, Input } from 'antd';

const Basics = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
      <Form.Item label='Name' name='name' required>
        <Input placeholder='Name' />
      </Form.Item>
      <Form.Item label='Email' name='email' required>
        <Input placeholder='Name' />
      </Form.Item>
      <Form.Item label='Phone' name='phone' required>
        <Input placeholder='phone' />
      </Form.Item>

      <Form.Item label='Portfolio' name='portfolio' required>
        <Input placeholder='Portfolio' />
      </Form.Item>

      <Form.Item label='Profession' name='profession' required>
        <Input placeholder='Profession' />
      </Form.Item>

      <Form.Item
        className='col-span-4'
        label='Career Objective'
        name='careerObjective'
        required
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item className='col-span-4' label='Address' name='address' required>
        <Input.TextArea rows={2} />
      </Form.Item>
    </div>
  );
};

export default Basics;
