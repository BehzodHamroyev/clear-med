import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import cls from './FileUploader.module.scss';
import instance from '@/shared/lib/axios/api';

export const FileUploader = () => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event) {
      // @ts-ignore
      setFile(event.target.files[0]);
    }
  };
  const submitLogo = () => {
    const formData = new FormData();
    formData.append('file', file!);
    formData.append('name', name!);
    formData.append('summary', 'summary'!);
    try {
      const res = instance.patch('/about/create', formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className={cls.wrapperFileUploader}>
        <input type="file" onChange={(e) => handleFile(e)} />
        <Button variant="contained" className={cls.buttonFileUploader}>
          {' '}
          Upload Logo{' '}
        </Button>
      </div>
      <div className={cls.wrapperInput}>
        {/* <p>Hospital name</p> */}
        <TextField
          className={cls.textField}
          id="outlined-basic"
          label="Hospital name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className={cls.submit}>
        <Button variant="contained" onClick={() => submitLogo()}>
          Save
        </Button>
      </div>
    </div>
  );
};
