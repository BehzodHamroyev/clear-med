import instance from '@/shared/lib/axios/api';

export const deleteMonitorAds = async (prop: {
  connectionId: string;
  adsId: string;
}) => {
  const { connectionId, adsId } = prop;
  try {
    const res = await instance.put(`/monitor/video/${connectionId}`, {
      video: adsId,
    });
  } catch (error) {
    console.log(error);
  }
};
