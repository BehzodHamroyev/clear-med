export interface TableData {
  id: '';
  item1: string | number | undefined;
  item2: string;
  item3: string;
  item4: number | string;
  lastChild: number;
  img: string;
}

export interface DoctorEditType {
  tableBody: TableData[];
}
