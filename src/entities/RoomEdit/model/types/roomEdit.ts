type TableBody = {
  id: number | string;
  img?: string;
  imgName?: string;
  item1?: number | string;
  item2?: string | number;
  item3?: number | string;
  item4?: string | number;
  item5?: string | number;
  item6?: string | number;
  item7?: string | number;
  item8?: string | number;
  lastChild?: string | number;
  duration?: number;
};

export interface RoomEditType {
  tableBody: TableBody[];
}
