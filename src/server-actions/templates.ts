'use server';

import connectDB from '@/config/database';
import Template from '@/Models/templateModel';
import { revalidatePath } from 'next/cache';

connectDB();

export const createNewTemplate = async (payload: any) => {
  try {
    await Template.create(payload);
    revalidatePath('/admin/templates');
    return {
      success: true,
      message: 'Template created successfully',
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getAllTemplates = async () => {
  try {
    const templates = await Template.find().sort({ createdAt: -1 });
    return {
      success: true,
      data: JSON.parse(JSON.stringify(templates)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getTemplateById = async (id: string) => {
  try {
    const template = await Template.findById(id);
    return {
      success: true,
      data: JSON.parse(JSON.stringify(template)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const updateTemplateById = async (id: string, payload: any) => {
  try {
    await Template.findByIdAndUpdate(id, payload);
    revalidatePath('/admin/templates');
    return {
      success: true,
      message: 'Template updated successfully',
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const deleteTemplateById = async (id: string) => {
  try {
    await Template.findByIdAndDelete(id);
    revalidatePath('/admin/templates');
    return {
      success: true,
      message: 'Template deleted successfully',
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
