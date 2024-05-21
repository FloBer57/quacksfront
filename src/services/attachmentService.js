// src/services/attachmentService.js
import { post } from '../api/agent';

export const createAttachments = async (attachmentDto, files) => {
  const formData = new FormData();
  formData.append('Message_Id', attachmentDto.Message_Id);

  files.forEach(file => {
    formData.append('files', file);
  });

  console.log('FormData content:', Array.from(formData.entries())); // Log the FormData content for debugging

  return await post('/Attachment', formData);
};
