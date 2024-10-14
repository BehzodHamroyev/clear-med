import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import cls from './NabarLogo.module.scss';
import { getAuthUserData } from '@/features/Auth';

import { getInfoProject } from '@/entities/FileUploader';
import { baseUrlImgLogo } from '../../../../../../baseurl';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const NavbarLogo = () => {
  const loginData = useSelector(getAuthUserData);

  const infoProject = useSelector(getInfoProject);

  return (
    <Link to="/" className={cls.NavbarLogoWrapper}>
      <LazyLoadImage alt="imgLink"
        src={baseUrlImgLogo}
        className={cls.NavbarLogo} />
      {loginData?.role !== 'reception' && (
        <p className={cls.NavbarText}>{infoProject?.[0]?.name}</p>
      )}
    </Link>
  );
};

export default NavbarLogo;
