/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';

import cls from './attachMonitorOrAdvertisement.module.scss';

import {
  getError,
  getIsLoading,
  fetchGetAllMonitors,
  GetAllMonitorPageData,
} from '@/pages/AddMonitorPage';

import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Loader } from '@/widgets/Loader';
import { ErrorReload } from '@/widgets/Error';
import Toast from '@/shared/ui/Toast/Toast';

/* svg */
const Svg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="21"
    viewBox="0 0 24 21"
    fill="none"
  >
    <path
      d="M9.72901 20.6361C9.98206 20.8744 10.32 21.005 10.6699 20.9998C11.0198 20.9947 11.3536 20.8541 11.5993 20.6085C11.8449 20.3628 11.9828 20.0318 11.9831 19.6869C11.9834 19.3419 11.8461 19.0107 11.6009 18.7647L4.44139 11.8096H22.6668C23.0204 11.8096 23.3595 11.6712 23.6095 11.4247C23.8595 11.1782 24 10.844 24 10.4954C24 10.1468 23.8595 9.81256 23.6095 9.56609C23.3595 9.31962 23.0204 9.18115 22.6668 9.18115H4.45072L11.6022 2.23535C11.8475 1.98929 11.9847 1.65806 11.9844 1.31311C11.9841 0.968164 11.8463 0.637163 11.6006 0.39153C11.3549 0.145897 11.0211 0.00532555 10.6712 0.000148224C10.3213 -0.0050291 9.98339 0.125603 9.73034 0.363856L0.496332 9.32966C0.339121 9.4825 0.214287 9.6646 0.129082 9.8654C0.0438771 10.0662 0 10.2817 0 10.4993C0 10.717 0.0438771 10.9325 0.129082 11.1333C0.214287 11.3341 0.339121 11.5162 0.496332 11.669L9.72901 20.6361Z"
      fill="black"
    />
  </svg>
);

const DoorSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="330"
    height="316"
    viewBox="0 0 330 316"
    fill="none"
  >
    <path
      d="M182.947 137.377V49.8947H232.842V116.421H266.105V16.6316H182.947V0H33.2632V266.105H0V299.368H154.008C140.352 279.873 133.035 256.644 133.053 232.842C133.053 193.259 152.844 158.499 182.947 137.377ZM116.421 133.053H149.684V166.316H116.421V133.053ZM310.844 222.364L329.804 205.733L313.173 176.96L289.057 185.109C283.735 180.619 277.747 177.126 271.095 174.632L266.105 149.684H232.842L227.853 174.465C221.2 176.96 215.213 180.453 209.891 184.943L185.775 176.794L169.143 205.566L188.103 222.198C186.773 230.514 186.773 234.838 188.103 243.154L169.143 259.785L185.775 288.558L209.891 280.408C215.213 284.899 221.2 288.392 227.853 290.886L232.842 316H266.105L271.095 291.219C277.747 288.724 283.735 285.232 289.057 280.741L313.173 288.891L329.804 260.118L310.844 243.486C312.175 235.004 312.175 230.68 310.844 222.364ZM249.474 266.105C231.179 266.105 216.211 251.137 216.211 232.842C216.211 214.547 231.179 199.579 249.474 199.579C267.768 199.579 282.737 214.547 282.737 232.842C282.737 251.137 267.768 266.105 249.474 266.105Z"
      fill="#545454"
    />
  </svg>
);

const SpeakerSvg = (
  <svg
    width="318"
    height="324"
    viewBox="0 0 318 324"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M233.289 1.16069C229.934 2.50253 228.987 3.44972 228.987 5.58089C228.987 6.33075 230.131 10.08 231.552 13.9872C232.973 17.8549 245.799 53.0981 260.047 92.288C274.294 131.478 290.396 175.68 295.803 190.559C303.499 211.673 305.867 217.79 306.656 218.461C307.998 219.685 310.011 219.645 313.523 218.343C316.681 217.159 317.865 215.975 317.865 214.002C317.865 212.581 318.18 213.449 283.411 117.941C270.505 82.4609 255.705 41.8503 250.614 27.7608C242.721 6.09395 241.103 1.95001 240.077 1.00282C238.577 -0.378494 237.196 -0.339035 233.289 1.16069Z"
      fill="#545454"
    />
    <path
      d="M225.119 19.1571C225.119 19.828 216.674 32.4177 212.49 37.9824C189.994 68.0161 157.435 95.3267 124.165 112.139C118.008 115.218 116.982 115.889 117.1 116.559C117.298 117.586 149.226 205.2 149.502 205.437C149.621 205.556 151.949 205.082 154.751 204.411C195.914 194.545 241.853 195.097 281.122 205.95C284.95 207.016 289.607 208.397 291.541 209.068C293.435 209.7 294.974 210.134 294.974 210.055C294.974 209.936 285.7 184.402 274.412 153.342C263.086 122.243 247.497 79.3824 239.722 58.0312C231.986 36.7195 225.514 19.1571 225.396 18.9992C225.238 18.8808 225.119 18.9203 225.119 19.1571Z"
      fill="#545454"
    />
    <path
      d="M280.056 82.3027C278.951 82.421 278.398 82.6184 278.517 82.9341C278.596 83.2104 282.266 93.2742 286.686 105.351L294.698 127.333L296.119 126.505C300.105 124.216 304.643 118.019 306.182 112.889C309.616 101.128 303.144 88.1042 291.698 83.8024C289.37 82.9341 283.924 81.9475 282.424 82.1053C282.069 82.1448 280.964 82.2237 280.056 82.3027Z"
      fill="#545454"
    />
    <path
      d="M69.2674 133.333C47.2848 141.384 27.9858 148.527 26.4467 149.277C14.1332 155.276 4.85868 166.839 1.3462 180.534C0.951537 182.113 0.438477 185.388 0.201681 187.875C-1.81109 209.699 11.4101 229.906 32.3271 237.05C40.9702 240.009 52.0207 240.286 60.7033 237.72C65.9128 236.181 142.24 208.121 142.24 207.766C142.201 206.818 110.036 118.967 109.681 118.888C109.444 118.809 91.2895 125.321 69.2674 133.333Z"
      fill="#545454"
    />
    <path
      d="M139.478 216.961C136.755 217.987 132.453 219.606 129.888 220.553C125.31 222.21 125.231 222.25 125.467 223.276C125.823 224.697 132.295 242.299 132.532 242.575C132.769 242.772 151.673 236.063 152.147 235.589C152.502 235.274 145.24 215.304 144.766 215.185C144.569 215.146 142.201 215.935 139.478 216.961Z"
      fill="#545454"
    />
    <path
      d="M93.9339 233.577C80.9496 238.352 70.2148 242.338 70.0964 242.457C69.8596 242.693 94.9995 311.917 96.4203 314.837C99.2619 320.757 106.524 324.546 113.233 323.599C115.325 323.283 148.2 311.72 149.029 310.97C149.344 310.693 147.529 305.681 128.112 252.323C117.022 221.855 118.127 224.894 117.811 224.934C117.693 224.934 106.958 228.841 93.9339 233.577Z"
      fill="#545454"
    />
  </svg>
);

const AttachMonitorOrAdvertisement = () => {
  const { id } = useParams();

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const [advertisement, setAdvertisement] = useState<boolean | null>(null);

  const [isOpenToast, setisOpenToast] = useState<boolean>(false);

  const getAllMonitorError = useSelector(getError);

  const { monitorNumber, hasOpenToast, setHasOpenToast } =
    useContext(ButtonsContext);

  const getAllMonitorIsLoading = useSelector(getIsLoading);

  const getAllMonitorData = useSelector(GetAllMonitorPageData);

  const handleOpenToast = () => {
    setHasOpenToast(true);
  };

  useEffect(() => {
    dispatch(fetchGetAllMonitors({}));
  }, [dispatch]);

  useEffect(() => {
    if (id && getAllMonitorData) {
      getAllMonitorData.filter((monitorData) => {
        if (monitorData.id === id) {
          setAdvertisement(monitorData.monitors[0].addvertising);
        }
        return null;
      });
    }
  }, [getAllMonitorData, id]);

  return (
    <>
      {getAllMonitorData && (
        <div className={cls.AttachMonitorOrAdvertisementWrapper}>
          {/* Title */}
          <div className={cls.AttachMonitorOrAdvertisementWrapper__Title}>
            <Link
              className={cls['AttachMonitorOrAdvertisementWrapper__Title--btn']}
              to="/add_monitor"
            >
              {Svg}
              {t('Ortga')}
            </Link>

            <p
              className={
                cls['AttachMonitorOrAdvertisementWrapper__Title--content']
              }
            >
              {monitorNumber ? `${monitorNumber} - ${t('Monitor')}` : ''}
            </p>
            <p />
          </div>

          {/* Body */}
          <div className={cls.AttachMonitorOrAdvertisementWrapper__Body}>
            <Link
              to={`/add_monitor/${id}/add_room_for_monitor`}
              className={cls['AttachMonitorOrAdvertisementWrapper__Body--box']}
            >
              <div
                className={
                  cls['AttachMonitorOrAdvertisementWrapper__Body--boxChild']
                }
              >
                <p
                  className={
                    cls[
                      'AttachMonitorOrAdvertisementWrapper__Body--boxChildText'
                    ]
                  }
                >
                  {t('Xona biriktirish')}
                </p>
                {DoorSvg}
              </div>
            </Link>

            <Link
              to={
                advertisement
                  ? `/add_monitor/${id}/advertisement_attachment_monitor`
                  : ''
              }
              className={`${
                cls['AttachMonitorOrAdvertisementWrapper__Body--box']
              } ${
                !advertisement
                  ? cls['AttachMonitorOrAdvertisementWrapper__Body--disable']
                  : ''
              }`}
              onClick={handleOpenToast}
            >
              <div
                className={
                  cls['AttachMonitorOrAdvertisementWrapper__Body--boxChild']
                }
              >
                <p
                  className={
                    cls[
                      'AttachMonitorOrAdvertisementWrapper__Body--boxChildText'
                    ]
                  }
                >
                  {t('Reklama biriktirish')}
                </p>
                {SpeakerSvg}
              </div>
            </Link>
          </div>
        </div>
      )}

      {getAllMonitorIsLoading && <Loader />}

      {getAllMonitorError && <ErrorReload message={getAllMonitorError} />}

      {!advertisement && hasOpenToast && (
        <Toast
          message={t("Ushbu Monitorga reklama biriktirish o'chirilgan!")}
          severity="warning"
        />
      )}
    </>
  );
};

export default AttachMonitorOrAdvertisement;
