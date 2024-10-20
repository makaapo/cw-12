import React, { useRef, useState } from 'react';
import { Alert, Button, Grid, TextField } from '@mui/material';

interface Props {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  name: string;
  label: string;
  getFieldError: (name: string) => string | undefined;
}

const FileInput: React.FC<Props> = ({ onChange, name, label, getFieldError }) => {
  const [filename, setFilename] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFilename(e.target.files[0].name);
    } else {
      setFilename('');
    }

    onChange(e);
  };

  return (
    <>
      <input type="file" name={name} style={{ display: 'none' }} ref={inputRef} onChange={onFileChange} />
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <TextField
            sx={{
              width: '100%',
            }}
            label={label}
            value={filename}
            onClick={activateInput}
            error={Boolean(getFieldError('image') || getFieldError('avatar'))}
            helperText={getFieldError('image') || getFieldError('avatar')}
            required
          />
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={activateInput}>
            Browse
          </Button>
        </Grid>
        {!filename.length && (
          <Alert severity="error" sx={{ mt: 3, width: '100%', marginX: 2 }}>
            Please download file
          </Alert>
        )}
      </Grid>
    </>
  );
};

export default FileInput;
