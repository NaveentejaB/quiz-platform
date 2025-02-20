import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const NavigationWarningDialog = ({ open, onOpenChange, onConfirm, onCancel }) => {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Leave Quiz?</DialogTitle>
            <DialogDescription>
              You haven't completed the quiz yet. If you leave now, your progress will be lost.
              Do you want to submit the current answers or continue with the quiz?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={onCancel}>
              Continue Quiz
            </Button>
            <Button variant="destructive" onClick={onConfirm}>
              Submit and Leave
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

export default NavigationWarningDialog;
