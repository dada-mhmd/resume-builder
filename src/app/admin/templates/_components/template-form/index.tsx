'use client';

import React, { useState } from 'react';
import { Button, Form, Input, message, Radio, Upload } from 'antd';
import { useRouter } from 'next/navigation';

import CodeMirror from '@uiw/react-codemirror';
import { oneDarkTheme } from '@uiw/react-codemirror';

import { uploadFileToFirebaseAndReturnUrl } from '@/helpers/uploads';
import {
  createNewTemplate,
  updateTemplateById,
} from '@/server-actions/templates';

const TemplateForm = ({
  initialValues = {},
  type = 'new',
}: {
  initialValues?: any;
  type?: 'edit' | 'new';
}) => {
  const [thumbnail, setThumbnail] = useState<any>(
    initialValues?.thumbnail || ''
  );
  const [html, setHtml] = useState<any>(initialValues?.html || '');
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      if (typeof thumbnail !== 'string') {
        values.thumbnail = await uploadFileToFirebaseAndReturnUrl(thumbnail);
      } else {
        values.thumbnail = thumbnail;
      }

      values.html = html;
      let res = null;

      if (type === 'new') {
        res = await createNewTemplate(values);
      } else {
        res = await updateTemplateById(initialValues?._id, values);
      }

      if (res && res.success) {
        message.success(
          type === 'new'
            ? 'Template created successfully'
            : 'Template updated successfully'
        );
        router.push('/admin/templates');
      } else {
        message.error('Error creating template');
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  let selectedFilesList: any[] = [];
  if (type === 'edit' && thumbnail && typeof thumbnail === 'string') {
    selectedFilesList = [{ url: initialValues?.thumbnail }];
  } else if (thumbnail) {
    selectedFilesList = [
      {
        url: URL.createObjectURL(thumbnail),
      },
    ];
  } else {
    selectedFilesList = [];
  }

  return (
    <Form
      layout='vertical'
      onFinish={onFinish}
      className='mt-6 flex flex-col gap-7'
      initialValues={initialValues}
    >
      <Form.Item label='Name' name='name'>
        <Input placeholder='Template name' />
      </Form.Item>

      <Form.Item label='Thumbnail'>
        <Upload
          fileList={selectedFilesList}
          listType='picture-card'
          beforeUpload={(file) => {
            setThumbnail(file);
            return false;
          }}
          onRemove={() => setThumbnail('')}
        >
          <span className='text-xs'>Upload Thumbnail</span>
        </Upload>
      </Form.Item>

      <Form.Item label='Is Only For Subscribers' name='isOnlyForSubscribers'>
        <Radio.Group>
          <Radio value={true}>Yes</Radio>
          <Radio value={false}>No</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item label='HTML'>
        <CodeMirror
          theme={oneDarkTheme}
          value={html}
          onChange={(value) => setHtml(value)}
        />
      </Form.Item>

      <div className='flex justify-end gap-7'>
        <Button
          disabled={loading}
          onClick={() => router.push('/admin/templates')}
          type='default'
        >
          Cancel
        </Button>
        <Button loading={loading} type='primary' htmlType='submit'>
          Save
        </Button>
      </div>
    </Form>
  );
};

export default TemplateForm;
