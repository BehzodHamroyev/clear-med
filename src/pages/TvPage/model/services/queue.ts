import instance from '@/shared/lib/axios/api';
import { baseUrl } from '../../../../../baseurl';

export const updateView = async (id: string, token: string | undefined) => {
  try {
    const res = await instance.post(`${baseUrl}/monitor/update/view`, {
      id,
      view: true,
    });
    return res.data;
  } catch (error) {
    console.error('Error updating view:', error);
  }
};
