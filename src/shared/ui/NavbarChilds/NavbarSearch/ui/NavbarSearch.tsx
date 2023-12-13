import React from 'react';
import { useTranslation } from 'react-i18next';

import cls from './NavbarSearch.module.scss';
import { NabarSearch } from '@/shared/assets/widgets/Navbar';

const NavbarSearch = () => {
  const { t } = useTranslation();

  return (
    <div className={cls.NavbarSearchWrapper}>
      <input
        className={cls.NavbarSearchInput}
        type="text"
        placeholder={t('Qidirish')}
      />
      <NabarSearch className={cls.NavbarSearchIcon} />
    </div>
  );
};

export default NavbarSearch;
