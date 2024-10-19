import React from 'react';
import { Button, Dialog, DialogActions, Box } from '@mui/material';

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
  url: string;
}

const DialogWindow: React.FC<SimpleDialogProps> = ({ open, onClose, url }) => {
  return (
    <Dialog onClose={onClose} open={open} maxWidth="md" fullWidth>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img
          src={url}
          alt="photo"
          style={{
            maxWidth: '100%',
            maxHeight: '80vh',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          }}
        />
      </Box>
      <DialogActions sx={{ justifyContent: 'center', paddingBottom: 2 }}>
        <Button
          onClick={onClose}
          variant="contained"
          color="primary"
          sx={{ textTransform: 'none', borderRadius: '20px', paddingX: 3 }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogWindow;
