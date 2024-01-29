/* eslint-disable max-len */
import React, { useContext } from 'react';

import { ButtonNavbar } from '@/entities/ButtonNavbar';

import cls from './addAdvertisementPage.module.scss';
import { TableTitleReklama } from '@/entities/TableTitleReklama';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { AddAdvertisement } from '@/entities/AddAdvertisement';
import { AdvertisementEdit } from '@/entities/AdvertisementEdit';

const tableTitle: string[] = ['Surat', 'Nomi', 'Manzili', 'Sana'];

const tableBody: any = [
  {
    id: 'number',
    img: 'https://cdn.pixabay.com/photo/2023/07/04/08/31/cats-8105667_1280.jpg',
    item2: 'lor yonidi telivizor',
    item3: 'Open link',
    url: 'https://youtube.com/shorts/Q-SXOC8ji9Q?si=EhN3JThnaxznv5T4',
    lastChild: '16.01.2024',
  },
  {
    id: 'number',
    img: 'https://media.istockphoto.com/id/1437390637/photo/cute-ginger-kitten-sleeps.webp?s=1024x1024&w=is&k=20&c=yxwM2SCjXvVKkW44mIOCDnoDdgc1FWHW95qrCuHbD7I=',
    item2: 'asosiy telivizor',
    item3: 'Open link',
    url: 'https://youtube.com/shorts/Q-SXOC8ji9Q?si=EhN3JThnaxznv5T4',
    lastChild: '21.01.2024',
  },
  {
    id: 'number',
    img: 'https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    item2: 'qorovul oldidi telivizor',
    item3: 'Open link',
    url: 'https://youtu.be/OmBMD1Xy43Y?si=sBPNqiHnqWMvrkKL',
    lastChild: '03.01.2024',
  },
  {
    id: 'number',
    img: 'https://cdn.pixabay.com/photo/2023/07/04/08/31/cats-8105667_1280.jpg',
    item2: 'uzi yonidagi telivizor',
    item3: 'Open link',
    url: 'https://youtu.be/OmBMD1Xy43Y?si=sBPNqiHnqWMvrkKL',
    lastChild: '28.02.2024',
  },
  {
    id: 'number',
    img: 'https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    item2: 'kamera yoni telivizor',
    item3: 'Open link',
    url: 'https://youtu.be/OmBMD1Xy43Y?si=sBPNqiHnqWMvrkKL',
    lastChild: '26.01.2024',
  },
  {
    id: 'number',
    img: 'https://cdn.pixabay.com/photo/2023/07/04/08/31/cats-8105667_1280.jpg',
    item2: 'padvaldagi telivizor',
    item3: 'Open link',
    url: 'https://youtu.be/OmBMD1Xy43Y?si=sBPNqiHnqWMvrkKL',
    lastChild: '26.01.2024',
  },
  {
    id: 'number',
    img: 'https://cdn.pixabay.com/photo/2023/07/04/08/31/cats-8105667_1280.jpg',
    item2: 'kassa yonidi telivizor',
    item3: 'Open link',
    url: 'https://youtube.com/shorts/Q-SXOC8ji9Q?si=EhN3JThnaxznv5T4',
    lastChild: '21.01.2024',
  },
  {
    id: 'number',
    img: 'https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    item2: '2 etaj telivizor',
    item3: 'Open link',
    url: 'https://youtube.com/shorts/Q-SXOC8ji9Q?si=EhN3JThnaxznv5T4',
    lastChild: '28.01.2024',
  },
  {
    id: 'number',
    img: 'https://images.pexels.com/photos/2678059/pexels-photo-2678059.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    item2: 'uzi yonidagi telivizor',
    lastChild: '16.01.2024',
    item3: 'Open link',
    url: 'https://youtube.com/shorts/Q-SXOC8ji9Q?si=EhN3JThnaxznv5T4',
  },
];

const AddAdvertisementPage = () => {
  const { isOpenAdvertisementAddCard, isOpenAdvertisementEditCard } =
    useContext(ButtonsContext);

  return (
    <div className={cls.AddAdvertisementPageWrapper}>
      <div>
        <ButtonNavbar
          CreateCarbonAdd
          TableTitle="Reklama qo’shish"
          ItemsLength={tableBody.length}
        />

        <TableTitleReklama Tablethead={tableTitle} Tabletbody={tableBody} />

        {isOpenAdvertisementAddCard ? <AddAdvertisement /> : ''}

        {isOpenAdvertisementEditCard ? (
          <AdvertisementEdit tableBody={[]} />
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default AddAdvertisementPage;
