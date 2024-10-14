export interface ChangeDoctorBackend {
  status: string;
  data: {
    room: {
      _id: string;
      name: number;
      department_id: string;
      doctor_id: string[];
      disabled: false;
      createdAt: string;
      updatedAt: string;
      id: string;
    };
    tokens: string;
    activeTime: {
      user: string;
      room: string;
      tillTime: string;
      _id: string;
      createdAt: string;
      updatedAt: string;
      id: string;
    };
  };
}
