import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
type ClassModalProps = {
  className: string;
  requirement: Record<string, number>; //riddhi
};

const ClassModal = forwardRef(
  ({ className, requirement }: ClassModalProps, ref) => {
    const [open, setOpen] = useState(false);

    useImperativeHandle(ref, () => {
      return {
        open: () => {
          setOpen(true);
        },
        close: () => {
          setOpen(false);
        },
      };
    });
    return (
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogTitle>{className}</DialogTitle>
        <DialogContent>
          {className &&
            Object.entries(requirement).map(([key, minValue]) => {
              return (
                <p key={key}>
                  {key}:{minValue}
                </p>
              );
            })}
        </DialogContent>
      </Dialog>
    );
  }
);
export default ClassModal;
