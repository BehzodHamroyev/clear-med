import { baseUrl } from '../../../../../baseurl';
import instance from '@/shared/lib/axios/api';

export const updateView = (prop: { id: string }) => {
  const { id } = prop;
  try {
    instance.post(`${baseUrl}/monitor/update/view`, { id: id, view: true });
  } catch (error) {
    console.log(error);
  }
};
