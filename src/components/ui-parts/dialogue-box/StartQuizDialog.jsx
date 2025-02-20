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
import { Alert, AlertDescription } from "@/components/ui/alert";

const StartQuizDialog = ({ open, onOpenChange, onStart }) => {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Start New Quiz</DialogTitle>
            <DialogDescription>
              You are about to start a new quiz. Make sure you have enough time to complete it. 
              The quiz consists of multiple choice questions and numerical questions. you'll need to answer them all.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Alert>
              <AlertDescription>
                Once you start, you won't be able to navigate away until you complete or submit the quiz.
              </AlertDescription>
            </Alert>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={onStart}>
              Start Quiz
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

export default StartQuizDialog;
