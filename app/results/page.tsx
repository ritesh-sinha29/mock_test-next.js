'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Trophy, Clock, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { useQuizStore } from '@/lib/store';

export default function ResultsPage() {
  const router = useRouter();
  const { questions, answers, startTime, difficulty, careerPath, reset } = useQuizStore();
  const [score, setScore] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (questions.length === 0) {
      router.push('/');
      return;
    }

    // Calculate score
    let correct = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    setScore(correct);

    // Calculate time
    if (startTime) {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      setElapsedTime(elapsed);
    }
  }, [questions, answers, startTime]);

  const handleRetake = () => {
    reset();
    router.push('/');
  };

  const percentage = questions.length > 0 ? (score / questions.length) * 100 : 0;
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  if (questions.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-6 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-4xl"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.6 }}
            className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center"
          >
            <Trophy className="w-12 h-12 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Quiz Complete!</h1>
          <p className="text-gray-600 text-lg">
            {careerPath} - {difficulty ? difficulty.charAt(0).toUpperCase() + difficulty.slice(1) : ''} Level
          </p>
        </div>

        {/* Score Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Score */}
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
              <p className="text-gray-600 mb-2">Your Score</p>
              <p className="text-5xl font-bold text-blue-600">
                {score}/{questions.length}
              </p>
              <p className="text-2xl font-semibold text-gray-700 mt-2">{percentage.toFixed(1)}%</p>
            </div>

            {/* Time */}
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl">
              <p className="text-gray-600 mb-2">Time Taken</p>
              <div className="flex items-center justify-center gap-2">
                <Clock className="w-8 h-8 text-green-600" />
                <p className="text-3xl font-bold text-green-600">{formatTime(elapsedTime)}</p>
              </div>
            </div>

            {/* Accuracy */}
            <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl">
              <p className="text-gray-600 mb-2">Performance</p>
              <p className="text-3xl font-bold text-orange-600">
                {percentage >= 80 ? 'Excellent' : percentage >= 60 ? 'Good' : percentage >= 40 ? 'Fair' : 'Needs Work'}
              </p>
            </div>
          </div>

          {/* Question Review */}
          <div className="border-t pt-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Question Review</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {questions.map((q, index) => {
                const userAnswer = answers[q.id];
                const isCorrect = userAnswer === q.correctAnswer;

                return (
                  <motion.div
                    key={q.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`p-4 rounded-lg border-2 ${
                      isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {isCorrect ? (
                        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                      )}
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800 mb-2">
                          Q{index + 1}: {q.question}
                        </p>
                        <div className="text-sm space-y-1">
                          {userAnswer && (
                            <p className={isCorrect ? 'text-green-700' : 'text-red-700'}>
                              Your answer: <span className="font-semibold">{userAnswer}. {q.options[userAnswer]}</span>
                            </p>
                          )}
                          {!isCorrect && (
                            <p className="text-green-700">
                              Correct answer: <span className="font-semibold">{q.correctAnswer}. {q.options[q.correctAnswer]}</span>
                            </p>
                          )}
                          {!userAnswer && (
                            <p className="text-gray-600">Not answered</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={handleRetake}
            className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold hover:shadow-xl transition-all hover:scale-105"
          >
            <RotateCcw className="w-5 h-5" />
            Take Another Quiz
          </button>
        </div>
      </motion.div>
    </div>
  );
}
