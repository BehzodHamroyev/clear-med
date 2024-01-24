import React, { ReactNode, useMemo, useState } from 'react';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { CurrentQueueDataType } from '@/pages/QueuingTV';

interface ButtonsProviderProps {
  initialButton?: string;
  children: ReactNode;
}

const ButtonsProvider = (props: ButtonsProviderProps) => {
  const { initialButton, children } = props;

  const [currentQueueData, setCurrentQueueData] =
    useState<CurrentQueueDataType>({
      kutish_vaqti: '',
      message: false,
      navbat: {
        created_date: '',
        created_time: '',
        department_id: '',
        doctor_id: '',
        id: '',
        queues_name: '',
        room_id: '',
        status: '',
        step: 1,
        __v: 1,
        _id: '',
      },
      room: {
        _id: '',
        name: 0,
        department_id: {
          _id: '',
          name: '',
          duration: 0,
          image: '',
          disabled: false,
          __v: 0,
          id: '',
        },
        disabled: false,
        __v: 0,
        id: '',
      },
      sizdan_oldingi_bemorlar_soni: 1,
    });

  const [clickedDoctorId, setClickedDoctorId] = useState('');

  const [isOpenSettingsChangePassword, setIsOpenSettingsChangePassword] =
    useState(false);

  const [calendarBeginValue, setCalendarBeginValue] = useState('');

  const [calendarEndValue, setCalendarEndValue] = useState('');

  const [isProfileWho, setIsProfileWho] = useState('');

  const [getResponseData, setResponseData] = useState('');

  const [isOpenLanugagePopup, setisOpenLanugagePopup] = useState(false);

  const [isCloseCalendar, setIsCloseCalendar] = useState(false);

  const [isCloseCalendar2, setIsCloseCalendar2] = useState(false);

  const [isOpenThemeOrLanguage, setIsOpenThemeOrLanguage] = useState(true);

  const [isOpenDepartmentAddCard, setIsOpenDepartmentAddCard] = useState(false);

  const [isOpenDepartmentEditCard, setIsOpenDepartmentEditCard] =
    useState(false);

  const [isOpenRoomAddCard, setIsOpenRoomAddCard] = useState(false);

  const [isOpenRoomEditCard, setIsOpenRoomEditCard] = useState(false);

  const [isOpenDoctorAddCard, setIsOpenDoctorAddCard] = useState(false);

  const [isOpenDoctorEditCard, setIsOpenDoctorEditCard] = useState(false);

  const [responseAddRoomStatusCode, setResponseAddRoomStatusCode] = useState(0);

  const [responseAddDoctorStatusCode, setResponseAddDoctorStatusCode] =
    useState<string | number>(0);

  const [isOpenQueuingCardClicked, setIsOpenQueuingCardClicked] =
    useState(false);

  const [isQueuingCardClickedGetId, setIsQueuingCardClickedGetId] = useState({
    departmentId: '',
    roomId: '',
  });

  const [isOpenQueuingTvCardPopapSecond, setIsOpenQueuingTvCardPopapSecond] =
    useState(false);

  const [isOpenDepartmentAddCardIcon, setIsOpenDepartmentAddCardIcon] =
    useState(false);

  const [isOpenBurgerNavbar, setIsOpenBurgerNavbar] = useState(true);

  const [isDataFormAddRoom, setIsDataFormAddRoom] = useState({
    RoomNumber: '',
    SectionName: '',
    DoctorName: '',
  });

  const [isSubmitLoginForm, setIsSubmitLoginForm] = useState<boolean>(false);

  const [departmentListChanged, setDepartmentListChanged] =
    useState<string>('');

  const [departmentGetId, setDepartmentGetId] = useState<string>('');

  const [formData, setFormData] = useState({
    PhoneNumber: '',
    UserPassword: '',
  });

  const [settingsFormData, setSettingsFormData] = useState({
    password: '',
    newPassword: '',
  });

  const [
    isOpenDepartmentAddCardIconIndex,
    setIsOpenDepartmentAddCardIconIndex,
  ] = useState(1);

  const [hasOpenToast, setHasOpenToast] = useState(false);

  const defaultProps = useMemo(
    () => ({
      currentQueueData,
      setCurrentQueueData,
      isOpenSettingsChangePassword,
      setIsOpenSettingsChangePassword,
      isOpenLanugagePopup,
      setisOpenLanugagePopup,
      formData,
      setFormData,
      settingsFormData,
      setSettingsFormData,
      isProfileWho,
      setIsProfileWho,
      isCloseCalendar,
      departmentListChanged,
      setDepartmentListChanged,
      setIsCloseCalendar,
      isCloseCalendar2,
      setIsCloseCalendar2,
      isOpenThemeOrLanguage,
      setIsOpenThemeOrLanguage,
      isOpenDepartmentAddCard,
      setIsOpenDepartmentAddCard,
      isOpenDepartmentEditCard,
      setIsOpenDepartmentEditCard,
      isOpenRoomEditCard,
      setIsOpenRoomEditCard,
      isOpenRoomAddCard,
      getResponseData,
      setResponseData,
      setIsOpenRoomAddCard,
      isOpenDoctorAddCard,
      setIsOpenDoctorAddCard,
      isOpenDoctorEditCard,
      setIsOpenDoctorEditCard,
      isOpenQueuingCardClicked,
      setIsOpenQueuingCardClicked,
      isQueuingCardClickedGetId,
      setIsQueuingCardClickedGetId,
      isOpenQueuingTvCardPopapSecond,
      setIsOpenQueuingTvCardPopapSecond,
      isOpenDepartmentAddCardIcon,
      setIsOpenDepartmentAddCardIcon,
      isOpenDepartmentAddCardIconIndex,
      setIsOpenDepartmentAddCardIconIndex,
      responseAddRoomStatusCode,
      setResponseAddRoomStatusCode,
      isOpenBurgerNavbar,
      setIsOpenBurgerNavbar,
      isSubmitLoginForm,
      setIsSubmitLoginForm,
      calendarBeginValue,
      setCalendarBeginValue,
      calendarEndValue,
      setCalendarEndValue,
      departmentGetId,
      setDepartmentGetId,
      hasOpenToast,
      setHasOpenToast,
      isDataFormAddRoom,
      setIsDataFormAddRoom,
      responseAddDoctorStatusCode,
      setResponseAddDoctorStatusCode,
      clickedDoctorId,
      setClickedDoctorId,
    }),
    [
      currentQueueData,
      setCurrentQueueData,
      isOpenSettingsChangePassword,
      setIsOpenSettingsChangePassword,
      formData,
      setFormData,
      settingsFormData,
      setSettingsFormData,
      isProfileWho,
      setIsProfileWho,
      isCloseCalendar,
      getResponseData,
      setResponseData,
      setIsCloseCalendar,
      departmentListChanged,
      setDepartmentListChanged,
      isCloseCalendar2,
      setIsCloseCalendar2,
      isOpenThemeOrLanguage,
      setIsOpenThemeOrLanguage,
      isOpenDepartmentAddCard,
      setIsOpenDepartmentAddCard,
      isOpenLanugagePopup,
      setisOpenLanugagePopup,
      isOpenDepartmentEditCard,
      setIsOpenDepartmentEditCard,
      isOpenRoomEditCard,
      setIsOpenRoomEditCard,
      isOpenRoomAddCard,
      setIsOpenRoomAddCard,
      isOpenDoctorAddCard,
      setIsOpenDoctorAddCard,
      isOpenDoctorEditCard,
      setIsOpenDoctorEditCard,
      isOpenQueuingCardClicked,
      setIsOpenQueuingCardClicked,
      isQueuingCardClickedGetId,
      setIsQueuingCardClickedGetId,
      isOpenQueuingTvCardPopapSecond,
      setIsOpenQueuingTvCardPopapSecond,
      isOpenDepartmentAddCardIcon,
      setIsOpenDepartmentAddCardIcon,
      isOpenDepartmentAddCardIconIndex,
      setIsOpenDepartmentAddCardIconIndex,
      isOpenBurgerNavbar,
      setIsOpenBurgerNavbar,
      isSubmitLoginForm,
      setIsSubmitLoginForm,
      calendarBeginValue,
      setCalendarBeginValue,
      calendarEndValue,
      setCalendarEndValue,
      departmentGetId,
      setDepartmentGetId,
      hasOpenToast,
      setHasOpenToast,
      isDataFormAddRoom,
      setIsDataFormAddRoom,
      responseAddRoomStatusCode,
      setResponseAddRoomStatusCode,
      responseAddDoctorStatusCode,
      setResponseAddDoctorStatusCode,
      clickedDoctorId,
      setClickedDoctorId,
    ],
  );

  return (
    <ButtonsContext.Provider value={defaultProps}>
      {children}
    </ButtonsContext.Provider>
  );
};

export default ButtonsProvider;
