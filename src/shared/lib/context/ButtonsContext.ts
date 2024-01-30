import { createContext } from 'react';
import { CurrentQueueDataType } from '@/pages/QueuingTV';

export interface ButtonsClickedProps {
  clickedDoctorId: string;
  setClickedDoctorId: (prop: string) => void;

  isOpenSettingsChangePassword: boolean;
  setIsOpenSettingsChangePassword: (prop: boolean) => void;

  isOpenRoomAttachmentMonitorChildForm: boolean;
  setIsOpenRoomAttachmentMonitorChildForm: (prop: boolean) => void;

  isOpenRoomAttachmentMonitorChildFormedit: boolean;
  setIsOpenRoomAttachmentMonitorChildFormEdit: (prop: boolean) => void;

  isOpenLanugagePopup: Boolean;
  setisOpenLanugagePopup: (porp: boolean) => void;

  responseAddDoctorStatusCode: number | string;
  setResponseAddDoctorStatusCode: (prop: number | string) => void;

  responseAddRoomStatusCode: number;
  setResponseAddRoomStatusCode: (prop: number) => void;

  calendarBeginValue: string;
  setCalendarBeginValue: (props: string) => void;

  getResponseData: string;
  setResponseData: (props: string) => void;

  calendarEndValue: string;
  setCalendarEndValue: (props: string) => void;

  departmentGetId: string;
  setDepartmentGetId: (prop: string) => void;

  isSubmitLoginForm: boolean;
  setIsSubmitLoginForm: (prop: boolean) => void;

  departmentListChanged: string;
  setDepartmentListChanged: (prop: string) => void;

  isProfileWho: string;
  setIsProfileWho: (prop: string) => void;

  isCloseCalendar: boolean;
  setIsCloseCalendar: (prop: boolean) => void;

  isCloseCalendar2: boolean;
  setIsCloseCalendar2: (prop: boolean) => void;

  isOpenThemeOrLanguage: boolean;
  setIsOpenThemeOrLanguage: (prop: boolean) => void;

  isOpenDepartmentAddCard: boolean;
  setIsOpenDepartmentAddCard: (prop: boolean) => void;

  isOpenDepartmentEditCard: boolean;
  setIsOpenDepartmentEditCard: (prop: boolean) => void;

  isOpenRoomAddCard: boolean;
  setIsOpenRoomAddCard: (prop: boolean) => void;

  isOpenAttachmentRoomMonitorChild: boolean;
  setIsOpenAttachmentRoomMonitorChild: (prop: boolean) => void;

  isOpenRoomEditCard: boolean;
  setIsOpenRoomEditCard: (prop: boolean) => void;

  isOpenDoctorAddCard: boolean;
  setIsOpenDoctorAddCard: (prop: boolean) => void;

  isOpenAdvertisementAddCard: boolean;
  setIsOpenAdvertisementAddCard: (prop: boolean) => void;

  isOpenMonitorAddCard: boolean;
  setIsOpenMonitorAddCard: (prop: boolean) => void;

  isOpenMonitorEditCard: boolean;
  setIsOpenMonitorEditCard: (prop: boolean) => void;

  isOpenAdvertisementEditCard: boolean;
  setIsOpenAdvertisementEditCard: (prop: boolean) => void;

  isOpenDoctorEditCard: boolean;
  setIsOpenDoctorEditCard: (prop: boolean) => void;

  isOpenQueuingCardClicked: boolean;
  setIsOpenQueuingCardClicked: (prop: boolean) => void;

  isDataFormAddRoom: {
    RoomNumber: string;
    SectionName: string;
    DoctorName: string;
  };
  setIsDataFormAddRoom: (prop: {
    RoomNumber: string;
    SectionName: string;
    DoctorName: string;
  }) => void;

  isQueuingCardClickedGetId: { roomId: string; departmentId: string };
  setIsQueuingCardClickedGetId: (prop: {
    roomId: string;
    departmentId: string;
  }) => void;

  currentQueueData: CurrentQueueDataType;
  setCurrentQueueData: (prop: {
    kutish_vaqti?: string;
    message?: boolean;
    navbat?: {
      created_date?: string;
      created_time?: string;
      department_id?: string;
      doctor_id?: string;
      id?: string;
      queues_name?: string;
      room_id?: string;
      status?: string;
      step?: number;
      __v?: number;
      _id?: string;
    };
    sizdan_oldingi_bemorlar_soni?: number;
    room: {
      _id: string;
      name: number;
      department_id: {
        _id: string;
        name: string;
        duration: number;
        image: string;
        disabled: boolean;
        __v: number;
        id: string;
      };
      disabled: boolean;
      __v: number;
      id: string;
    };
  }) => void;

  isOpenQueuingTvCardPopapSecond: boolean;
  setIsOpenQueuingTvCardPopapSecond: (prop: boolean) => void;

  isOpenAttachmentRoomMonitorChildEdit: boolean;
  setIsOpenAttachmentRoomMonitorChildEdit: (prop: boolean) => void;

  isOpenDepartmentAddCardIcon: boolean;
  setIsOpenDepartmentAddCardIcon: (prop: boolean) => void;

  isOpenDepartmentAddCardIconIndex: number;
  setIsOpenDepartmentAddCardIconIndex: (prop: number) => void;

  isOpenBurgerNavbar: boolean;
  setIsOpenBurgerNavbar: (prop: boolean) => void;

  formData: { PhoneNumber: string; UserPassword: string };
  setFormData: (prop: { PhoneNumber: string; UserPassword: string }) => void;

  settingsFormData: { password: string; newPassword: string };
  setSettingsFormData: (prop: {
    password: string;
    newPassword: string;
  }) => void;

  hasOpenToast: boolean;
  setHasOpenToast: (prop: boolean) => void;
}

export const ButtonsContext = createContext<ButtonsClickedProps>({
  clickedDoctorId: '',
  setClickedDoctorId: () => {},

  isOpenAttachmentRoomMonitorChild: false,
  setIsOpenAttachmentRoomMonitorChild: () => {},

  isOpenAttachmentRoomMonitorChildEdit: false,
  setIsOpenAttachmentRoomMonitorChildEdit: () => {},

  isOpenRoomAttachmentMonitorChildForm: false,
  setIsOpenRoomAttachmentMonitorChildForm: () => {},

  isOpenRoomAttachmentMonitorChildFormedit: false,
  setIsOpenRoomAttachmentMonitorChildFormEdit: () => {},

  hasOpenToast: false,
  setHasOpenToast: () => {},

  isOpenLanugagePopup: false,
  setisOpenLanugagePopup: () => {},

  isOpenMonitorAddCard: false,
  setIsOpenMonitorAddCard: () => {},

  isOpenMonitorEditCard: false,
  setIsOpenMonitorEditCard: () => {},

  responseAddDoctorStatusCode: 0,
  setResponseAddDoctorStatusCode: () => {},

  responseAddRoomStatusCode: 0,
  setResponseAddRoomStatusCode: () => {},

  isOpenSettingsChangePassword: false,
  setIsOpenSettingsChangePassword: () => {},

  calendarBeginValue: '',
  setCalendarBeginValue: () => {},

  calendarEndValue: '',
  setCalendarEndValue: () => {},

  getResponseData: '',
  setResponseData: () => {},

  departmentGetId: '',
  setDepartmentGetId: () => {},

  isSubmitLoginForm: false,
  setIsSubmitLoginForm: () => {},

  isProfileWho: '',
  setIsProfileWho: () => {},

  isCloseCalendar: false,
  setIsCloseCalendar: () => {},

  isCloseCalendar2: false,
  setIsCloseCalendar2: () => {},

  departmentListChanged: '',
  setDepartmentListChanged: () => {},

  isOpenThemeOrLanguage: true,
  setIsOpenThemeOrLanguage: () => {},

  isOpenDepartmentAddCard: false,
  setIsOpenDepartmentAddCard: () => {},

  isOpenDepartmentEditCard: false,
  setIsOpenDepartmentEditCard: () => {},

  isOpenRoomAddCard: false,
  setIsOpenRoomAddCard: () => {},

  isOpenRoomEditCard: false,
  setIsOpenRoomEditCard: () => {},

  isOpenDoctorAddCard: false,
  setIsOpenDoctorAddCard: () => {},

  isOpenAdvertisementAddCard: false,
  setIsOpenAdvertisementAddCard: () => {},

  isOpenAdvertisementEditCard: false,
  setIsOpenAdvertisementEditCard: () => {},

  isOpenDoctorEditCard: false,
  setIsOpenDoctorEditCard: () => {},

  isOpenQueuingCardClicked: false,
  setIsOpenQueuingCardClicked: () => {},

  isQueuingCardClickedGetId: {
    roomId: '',
    departmentId: '',
  },
  setIsQueuingCardClickedGetId: () => {},

  isOpenQueuingTvCardPopapSecond: false,
  setIsOpenQueuingTvCardPopapSecond: () => {},

  isOpenDepartmentAddCardIcon: false,
  setIsOpenDepartmentAddCardIcon: () => {},

  isOpenDepartmentAddCardIconIndex: 1,
  setIsOpenDepartmentAddCardIconIndex: () => {},

  isOpenBurgerNavbar: true,
  setIsOpenBurgerNavbar: () => {},

  formData: { PhoneNumber: '', UserPassword: '' },
  setFormData: () => {},

  isDataFormAddRoom: { RoomNumber: '', SectionName: '', DoctorName: '' },
  setIsDataFormAddRoom: () => {},

  settingsFormData: { password: '', newPassword: '' },
  setSettingsFormData: () => {},

  currentQueueData: {
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
  },
  setCurrentQueueData: () => {},
});
