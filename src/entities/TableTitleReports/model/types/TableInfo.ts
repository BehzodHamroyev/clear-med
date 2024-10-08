// eslint-disable-next-line ulbi-tv-plugin/public-api-imports
import { Doctor } from '@/pages/ReportsPage/model/types/doctorListTypes';

type KorilganBemor = {
  id: number;
  shifokor: string;
  xona: string;
  qabulboshlanishi: string;
  qabultugashi: string;
};

type TableBody = {
  id: number;
  img?: any;
  item1?: number | string;
  item2?: string | number;
  item3?: number | string;
  item4?: string | number;
  item5?: string | number;
  item6?: string | number;
  item7?: string | number;
  item8?: string | number;
  lastChild?: string | number;
  KorilganBemorlar?: KorilganBemor[];
};

export interface TableInfo {
  cursor?: boolean;
  Tablethead: string[];
  Tabletbody: Doctor[];
}
