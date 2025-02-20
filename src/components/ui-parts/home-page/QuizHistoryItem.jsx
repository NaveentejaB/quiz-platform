import React from 'react';
import StatCard from './StatCard';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Clock, Target, Trophy, ArrowRight, Brain } from "lucide-react"

const QuizHistoryItem = ({ attempt }) => {
  const totalCorrect = attempt.details.reduce((acc, curr) => acc + curr.correct, 0);
  return (
    <AccordionItem value={attempt.id}>
      <AccordionTrigger>
        <div className="flex items-center justify-between w-full pr-4">
          <div className="flex items-center gap-4">
            <Badge variant="outline">{attempt.category}</Badge>
            <span className="text-sm text-muted-foreground">{new Date(attempt.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-4">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{attempt.duration}</span>
            <span className="font-bold">{totalCorrect*10}%</span>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="space-y-4 p-4">
          <div className="grid gap-4 md:grid-cols-3">
            <StatCard icon={Target} title="Accuracy" value={`${Math.round(totalCorrect*10)}%`} description="Overall performance" />
            <StatCard icon={Clock} title="Time Taken" value={attempt.duration} description="Total duration" />
            <StatCard
              icon={Trophy}
              title="Correct Answers"
              value={`${totalCorrect}/${attempt.totalQuestions}`}
              description="Questions answered correctly"
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Correct</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Performance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attempt.details.map((detail, index) => (
                <TableRow key={index}>
                  <TableCell>{detail.category}</TableCell>
                  <TableCell>{detail.correct}</TableCell>
                  <TableCell>{detail.total}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={(detail.correct / detail.total) * 100} className="w-24" />
                      <span className="text-sm">{Math.round((detail.correct / detail.total) * 100)}%</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}
export default QuizHistoryItem;
