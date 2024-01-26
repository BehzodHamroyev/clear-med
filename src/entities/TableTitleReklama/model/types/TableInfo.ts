type TableBody = {
  id: number;
  img?: string;
  item1?: number | string;
  item2?: string | number;
  item3?: number | string;
  item4?: string | number;
  item5?: string | number;
  item6?: string | number;
  item7?: string | number;
  item8?: string | number;
  lastChild?: string | number;
  imgName?: string;
  url?: string;
};

export interface TableInfo {
  cursor?: boolean;
  Tablethead: string[];
  Tabletbody: TableBody[];
}
