// src/services/attachmentService.js
import { post } from '../api/agent';

export const createAttachments = async (attachmentDto, files) => {
  const formData = new FormData();
  formData.append('Message_Id', attachmentDto.Message_Id); // Nom du champ correspondant au DTO côté serveur

  files.forEach(file => {
    formData.append('files', file); // Nom du champ correspondant au paramètre dans votre méthode API
  });

  console.log('FormData content:', Array.from(formData.entries())); // Log the FormData content for debugging

  return await post('/Attachment', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
