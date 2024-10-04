// api/queue.ts
import axios from 'axios';
import { baseUrl } from '../../../../../baseurl';

export const updateView = async (id: string, token: string | undefined) => {
  try {
    const res = await axios.post(
      `${baseUrl}/monitor/update/view`,
      { id, view: true },
      {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      },
    );
    return res.data;
  } catch (error) {
    console.error('Error updating view:', error);
  }
};
