import React, { useEffect, useMemo, useState } from 'react';

import axios from 'axios';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import { useTranslation } from 'react-i18next';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Button, Dialog, TextField } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

import Autocomplete, {
  AutocompleteChangeReason,
  AutocompleteChangeDetails,
} from '@mui/material/Autocomplete';

import cls from './RoomAttachmentMonitorChildForm.module.scss';

import { Loader } from '@/widgets/Loader';
import { baseUrl } from '../../../../baseurl';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchAllRoomForMonitor } from '../../../pages/AddRoomForMonitorPage/model/service/fetchAllRoomForMonitor';

import {
  getError,
  getIsLoading,
  getListOfRoom,
  fetchRoomGetAll,
} from '@/pages/RoomPage';
import ErrorDialog from '@/shared/ui/ErrorDialog/ErrorDialog';

interface RoomAttachmentMonitorChildFormProp {
  connectionId: string;
}

const RoomAttachmentMonitorChildForm = ({
  connectionId,
}: RoomAttachmentMonitorChildFormProp) => {
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;

  const { id } = useParams();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const token = Cookies.get('token');

  const getListOfRooms = useSelector(getListOfRoom);
  const getIsLoadingRooms = useSelector(getIsLoading);
  const getErrorRooms = useSelector(getError);

  const [personId, setPersonId] = React.useState<string[]>([]);
  const [getAllSelectionID, setAllSelectionID] = useState<string[]>([]);
  const [asosiyArr, setAsosiyArr] = useState<any[]>([{ name: '', id: '' }]);
  const [addDoctorFormDialogIsLoading, setAddDoctorFormDialogIsLoading] =
    useState(false);

  const {
    setHasOpenToast,
    setToastDataForAddRoomForm,
    setIsOpenDepartmentDeleteCard,
    isOpenRoomAttachmentMonitorChildForm,
    setIsOpenRoomAttachmentMonitorChildForm,
  } = React.useContext(ButtonsContext);

  const personIds = useMemo(() => new Set(personId), [personId]);

  const handleSubmitAllFormData = async (e: {
    preventDefault: () => void;
  }): Promise<void> => {
    e.preventDefault();

    setAddDoctorFormDialogIsLoading(true);

    if (connectionId && getAllSelectionID.length > 0) {
      try {
        const response = await axios.patch(
          `${baseUrl}/monitor/${connectionId}`,

          JSON.stringify({ rooms: getAllSelectionID }),

          {
            maxBodyLength: Infinity,
            headers: {
              'Content-Type': 'application/json',
              authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.data) {
          setAddDoctorFormDialogIsLoading(false);

          setIsOpenRoomAttachmentMonitorChildForm(false);

          setHasOpenToast(true);

          setToastDataForAddRoomForm({
            toastMessageForAddRoomForm: t(
              'Xonalar muvaffaqiyatli biriktirildi',
            ),
            toastSeverityForAddRoomForm: 'success',
          });

          dispatch(fetchAllRoomForMonitor({ id }));
        }
      } catch (error) {
        setAddDoctorFormDialogIsLoading(false);

        if (axios.isAxiosError(error)) {
          if (error.response?.status === 404) {
            setToastDataForAddRoomForm({
              toastMessageForAddRoomForm: t(
                "Barcha maydonlar to'ldirilishi shart",
              ),
              toastSeverityForAddRoomForm: 'warning',
            });

            setHasOpenToast(true);
          }
          if (error.response?.status === 403) {
            setToastDataForAddRoomForm({
              toastMessageForAddRoomForm: t('Ushbu xona  avval kiritilgan'),
              toastSeverityForAddRoomForm: 'warning',
            });

            setHasOpenToast(true);
          }

          if (
            error.response?.status !== 404 &&
            error.response?.status !== 403
          ) {
            setToastDataForAddRoomForm({
              toastMessageForAddRoomForm: t(
                "Barcha maydonlar to'ldirilishi shart",
              ),
              toastSeverityForAddRoomForm: 'warning',
            });

            setHasOpenToast(true);
          }
        }
      }
    }
  };

  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: any[],
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<any> | undefined,
  ) => {
    const newValue = value?.map((option) => option.name);

    if (!personId.includes(String(newValue[newValue.length - 1]))) {
      setPersonId(newValue);
    }
  };

  const handleClose = () => {
    setIsOpenRoomAttachmentMonitorChildForm(false);
  };

  useEffect(() => {
    if (asosiyArr.length > 0 && personIds.size > 0) {
      const selectedIds: string[] = [];
      asosiyArr.forEach(({ name, id }) => {
        if (personIds.has(name)) {
          selectedIds.push(id);
        }
        setAllSelectionID(selectedIds);
      });
    }
  }, [asosiyArr, personIds]);

  React.useEffect(() => {
    dispatch(fetchRoomGetAll({}));
  }, [dispatch]);

  React.useEffect(() => {
    if (getListOfRooms) {
      const optionsArray = getListOfRooms!?.room.map((item: any) => ({
        name: item.name,
        id: item.id,
      }));
      setAsosiyArr(optionsArray);
    }
  }, [getListOfRooms]);

  return (
    <>
      {getListOfRooms && (
        <Dialog
          onClose={handleClose}
          className={cls.DepartmentAddWrapper}
          aria-labelledby="alert-dialog-title"
          open={isOpenRoomAttachmentMonitorChildForm}
          aria-describedby="alert-dialog-description"
        >
          <form
            className={cls.DepartmentAddCard}
            onSubmit={handleSubmitAllFormData}
          >
            <h3 className={cls.CardTitle}>{t('Xona biriktirish')}</h3>

            <Autocomplete
              multiple
              options={asosiyArr}
              disableCloseOnSelect
              onChange={handleChange}
              id="checkboxes-tags-demo"
              getOptionLabel={(option) => option.name}
              className={cls.AddRoomForMonitorOPtionsWrp}
              renderOption={(props, option: { name: string }, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checked={selected}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                  />
                  {option.name} - xona
                </li>
              )}
              style={{
                width: '90%',
                margin: '0 auto',
                marginTop: '20px',
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t('Xonalar')}
                  style={{ cursor: 'pointer' }}
                  placeholder={`${t('Xonani tanlang')}...`}
                  required={!(personId.length > 0)}
                />
              )}
            />

            <div className={cls.BtnParnet}>
              <Button
                type="button"
                onClick={handleClose}
                className={`${cls.Btn} ${cls.Btn1}`}
              >
                {t('Bekor qilish')}
              </Button>

              <Button type="submit" className={`${cls.Btn} ${cls.Btn2}`}>
                {t('Saqlash')}
              </Button>
            </div>
          </form>
        </Dialog>
      )}

      {(getIsLoadingRooms || addDoctorFormDialogIsLoading) && <Loader />}

      {getErrorRooms && <ErrorDialog isErrorProps={!false} />}
    </>
  );
};

export default RoomAttachmentMonitorChildForm;
