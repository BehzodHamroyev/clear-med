import axios from 'axios';
import Cookies from 'js-cookie';
import { baseUrl } from '../../../../../baseurl';
const token = Cookies.get('token');

export const updateView = (prop: { id: string }) => {
  const { id } = prop;
  try {
    axios.post(
      `${baseUrl}/monitor/update/view`,
      { id: id, view: true },
      {
        maxBodyLength: Infinity,
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      },
    );
  } catch (error) {
    console.log(error);
  }
};
