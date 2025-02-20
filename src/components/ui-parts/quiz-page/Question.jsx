import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Clock, CheckCircle2, XCircle, Star, BookOpen, Award } from "lucide-react";
import { RadioGroup,RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from "@/components/ui/badge";

const Question = ({ question,onAnswer,showFeedback,userAnswer,onInput }) => {
  const inputValue = userAnswer === undefined ? "" : userAnswer;
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <Badge variant="outline">{question.category}</Badge>
          <div className="flex items-center">
            <Badge variant="secondary" className="mr-2">
              {question.difficulty}
            </Badge>
            <span className="flex items-center text-yellow-500">
              <Star className="h-4 w-4 mr-1 fill-current" />
              {question.points}
            </span>
          </div>
        </div>
        <CardTitle>{question.question}</CardTitle>
      </CardHeader>
      <CardContent>
        {question.type === "multipleChoice" ? (
          <RadioGroup onValueChange={onAnswer} value={userAnswer}>
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <RadioGroupItem value={option} id={`option-${index}`} disabled={showFeedback} />
                <Label htmlFor={`option-${index}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        ) : (
          <Input
            type="number"
            placeholder="Enter your answer"
            value={inputValue}
            onChange={(e) => onAnswer(e.target.value)}
            disabled={showFeedback}
          />
        )}
      </CardContent>
      {showFeedback && (
        <CardFooter className="flex flex-col items-start">
          <p
            className={`font-semibold flex items-center gap-2 ${
              userAnswer === question.correctAnswer.toString() ? "text-green-600" : "text-red-600"
            }`}
          >
            {userAnswer === question.correctAnswer.toString() ? (
              <CheckCircle2 className="h-5 w-5" />
            ) : (
              <XCircle className="h-5 w-5" />
            )}
            {userAnswer === question.correctAnswer.toString()
              ? "Correct!"
              : `Incorrect. The correct answer is: ${question.correctAnswer}`}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            <BookOpen className="h-4 w-4 inline mr-1 text-sm font-medium" />
            {question.explanation}
          </p>
        </CardFooter>
      )}
    </Card>
  );
};

export default Question;