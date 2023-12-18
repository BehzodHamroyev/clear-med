type KorilganBemor = {
  id: number;
  shifokor: string;
  xona: string;
  qabulboshlanishi: string;
  qabultugashi: string;
};
export type TableBody = {
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

export interface TableInfoPatients {
  cursor?: boolean;
  Tablethead: string[];
  TableBody: TableBody[];
}
