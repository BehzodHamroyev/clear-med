import React from 'react';
import { useTranslation } from 'react-i18next';

import cls from './AdminPanelPage.module.scss';

const AdminPanelPage = () => {
  const { t } = useTranslation('about');

  return (
    <div data-testid="AdminPanelPage" className={cls.AdminPanelPageWrapper}>
      {t('Admin Panel')}
    </div>
  );
};

export default AdminPanelPage;
