type KorilganBemor = {
  id: number;
  shifokor: string;
  xona: string;
  qabulboshlanishi: string;
  qabultugashi: string;
};

export interface TableInfoPatients {
  cursor?: boolean;
  Tablethead: string[];
  TableBody: KorilganBemor[];
}
