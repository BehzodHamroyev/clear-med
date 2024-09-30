import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { useParams } from 'react-router-dom';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';

import cls from './ModalToAddAdsForMonitor.module.scss';
import { OneAdds } from '@/entities/AdvertisementAttachmentMonitor';
import instance from '@/shared/lib/axios/api';
// @ts-ignore
import { AllMonitorData } from '@/pages/AddMonitorPage';
import { RoomAddTypes } from '../model/types/roomAddTypes';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getAllAdsVideoForOneMonitor } from '../../AdvertisementAttachmentMonitor/model/service/getAllAdsVideoForOneMonitor';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface AttachmentRoomMonitorChildProp {
  data?: OneAdds[];
  listMonitor?: AllMonitorData[];
}

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

const ModalToAddAdsForMonitor = (prop: AttachmentRoomMonitorChildProp) => {
  /* translation */
  const [connectionIdMonitor, setConnectionIdMonitor] = useState('');
  const [listIdAds, setListIdAds] = useState<string[]>([]);
  const [array, setArray] = useState<string[]>([]);
  const { t } = useTranslation();
  const { id } = useParams();
  const { data, listMonitor } = prop;
  const [personName, setPersonName] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const {
    setIsOpenRoomAddCard,
    setDepartmentListChanged,
    setResponseAddDoctorStatusCode,
    setIsOpenAttachmentRoomMonitorChild,
    // isOpenAttachmentRoomMonitorChild
  } = React.useContext(ButtonsContext);

  const filteredArray = data!?.filter((obj) => personName.includes(obj.name));

  useEffect(() => {
    if (listMonitor) {
      const idConnect = listMonitor?.filter((monitor) => monitor._id === id)[0];
      const idMonitorConnection = idConnect.monitors[0]._id;
      setConnectionIdMonitor(idMonitorConnection);
    }
  }, [id, listMonitor]);

  const handleSubmitAllFormData = async () => {
    setDepartmentListChanged(`${Math.random() * 100 + 1}`);
    const arrayId = filteredArray.map((obj) => obj._id);
    try {
      const response = await instance.patch<RoomAddTypes>(
        `/monitor/${connectionIdMonitor}`,
        { videos: arrayId },
      );
      dispatch(getAllAdsVideoForOneMonitor({ id: `${id}` }));
      setIsOpenRoomAddCard(false);
      setResponseAddDoctorStatusCode(200);
      setIsOpenAttachmentRoomMonitorChild(false);
      return response.data;
    } catch (e) {
      return setResponseAddDoctorStatusCode('404');
    }
  };

  /* useState */

  useEffect(() => {
    personName?.map((name) => {
      const id = data?.filter((oneAd) => oneAd.name === name)?.[0]?.id;
      // @ts-ignore
      setListIdAds((pre) => [id, ...pre]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personName]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === 'string' ? value.split(',') : value);
  };

  /* UI */
  return (
    <div
      className={cls.DepartmentAddWrapper}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={cls.DepartmentAddCard}
      >
        <h3 className={cls.CardTitle}>{t('Reklama biriktirish')}</h3>

        <FormControl sx={{ width: '90%', margin: '10px 20px' }}>
          <InputLabel id="demo-multiple-checkbox-label">
            {t('Reklamalar')}
          </InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={personName}
            onChange={handleChange}
            input={<OutlinedInput label={t('Reklamalar')} />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {data!?.map((name) => (
              <MenuItem key={name.id} value={name.name}>
                <Checkbox checked={personName.indexOf(name.name) > -1} />
                <ListItemText primary={name.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <div className={cls.CardBody}>
          <div className={cls.BtnParnet}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpenAttachmentRoomMonitorChild(false);
              }}
              type="button"
              className={`${cls.Btn} ${cls.Btn1}`}
            >
              {t('Bekor qilish')}
            </button>

            <button
              onClick={handleSubmitAllFormData}
              type="button"
              className={`${cls.Btn} ${cls.Btn2}`}
            >
              {t('Saqlash')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalToAddAdsForMonitor;
