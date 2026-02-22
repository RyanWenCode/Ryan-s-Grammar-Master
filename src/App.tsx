import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  Info, 
  Trophy,
  BookOpen,
  ChevronRight,
  GraduationCap,
  Filter
} from 'lucide-react';
import { QUESTIONS, Question, Difficulty, GrammarCategory } from './types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [filterCategory, setFilterCategory] = useState<GrammarCategory | 'All'>('All');
  const [filterDifficulty, setFilterDifficulty] = useState<Difficulty | 'All'>('All');

  const filteredQuestions = useMemo(() => {
    return QUESTIONS.filter(q => {
      const categoryMatch = filterCategory === 'All' || q.category === filterCategory;
      const difficultyMatch = filterDifficulty === 'All' || q.difficulty === filterDifficulty;
      return categoryMatch && difficultyMatch;
    });
  }, [filterCategory, filterDifficulty]);

  const currentQuestion = filteredQuestions[currentQuestionIndex];
  const isCorrect = selectedAnswer === currentQuestion?.correctAnswer;

  const handleAnswerSelect = (option: string) => {
    if (isSubmitted) return;
    setSelectedAnswer(option);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;
    setIsSubmitted(true);
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsSubmitted(false);
    } else {
      setShowResults(true);
    }
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setScore(0);
    setShowResults(false);
  };

  const renderSentence = (sentence: string, selected: string | null) => {
    const parts = sentence.split('______');
    return (
      <div className="text-2xl md:text-3xl font-medium leading-relaxed text-slate-800 tracking-tight">
        {parts[0]}
        <span className={cn(
          "inline-block min-w-[120px] border-b-2 mx-2 px-2 text-center transition-all duration-300",
          !selected && "border-slate-300 text-slate-300",
          selected && !isSubmitted && "border-indigo-500 text-indigo-600",
          isSubmitted && isCorrect && "border-emerald-500 text-emerald-600",
          isSubmitted && !isCorrect && "border-rose-500 text-rose-600"
        )}>
          {selected || '......'}
        </span>
        {parts[1]}
      </div>
    );
  };

  if (showResults) {
    const percentage = Math.round((score / filteredQuestions.length) * 100);
    let message = "继续努力！";
    if (percentage === 100) message = "完美！你是语法大师！";
    else if (percentage >= 80) message = "太棒了！表现非常出色！";
    else if (percentage >= 60) message = "不错，还有进步空间。";

    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-xl p-8 md:p-12 max-w-lg w-full text-center"
        >
          <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-12 h-12 text-indigo-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">练习完成</h2>
          <p className="text-slate-500 mb-8">{message}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-slate-50 p-6 rounded-2xl">
              <div className="text-sm text-slate-500 mb-1">得分</div>
              <div className="text-3xl font-bold text-indigo-600">{score} / {filteredQuestions.length}</div>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl">
              <div className="text-sm text-slate-500 mb-1">正确率</div>
              <div className="text-3xl font-bold text-indigo-600">{percentage}%</div>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            重新开始
          </button>
        </motion.div>
      </div>
    );
  }

  if (filteredQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="text-slate-400 mb-4 text-center">
          <Filter className="w-12 h-12 mx-auto mb-2 opacity-20" />
          <p>没有找到符合条件的题目，请调整筛选条件。</p>
        </div>
        <button 
          onClick={() => { setFilterCategory('All'); setFilterDifficulty('All'); }}
          className="text-indigo-600 font-medium hover:underline"
        >
          重置筛选
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
              <GraduationCap className="text-white w-6 h-6" />
            </div>
            <span className="font-bold text-xl tracking-tight hidden sm:inline-block">GrammarMaster</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-sm font-medium text-slate-500">
              <BookOpen className="w-4 h-4" />
              <span>{currentQuestionIndex + 1} / {filteredQuestions.length}</span>
            </div>
            <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-indigo-600"
                initial={{ width: 0 }}
                animate={{ width: `${((currentQuestionIndex + 1) / filteredQuestions.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
            <Filter className="w-4 h-4 text-slate-400" />
            <select 
              value={filterCategory} 
              onChange={(e) => { setFilterCategory(e.target.value as any); setCurrentQuestionIndex(0); setIsSubmitted(false); setSelectedAnswer(null); }}
              className="text-sm font-medium bg-transparent outline-none cursor-pointer"
            >
              <option value="All">所有语法点</option>
              {Object.values(GrammarCategory).map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
            <select 
              value={filterDifficulty} 
              onChange={(e) => { setFilterDifficulty(e.target.value as any); setCurrentQuestionIndex(0); setIsSubmitted(false); setSelectedAnswer(null); }}
              className="text-sm font-medium bg-transparent outline-none cursor-pointer"
            >
              <option value="All">所有难度</option>
              {Object.values(Difficulty).map(diff => (
                <option key={diff} value={diff}>{diff}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Question Section */}
          <div className="lg:col-span-2">
            <motion.div 
              key={currentQuestion.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-12 mb-6"
            >
              <div className="flex items-center gap-3 mb-8">
                <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-full uppercase tracking-wider">
                  {currentQuestion.category}
                </span>
                <span className={cn(
                  "px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider",
                  currentQuestion.difficulty === Difficulty.BEGINNER && "bg-emerald-50 text-emerald-600",
                  currentQuestion.difficulty === Difficulty.INTERMEDIATE && "bg-amber-50 text-amber-600",
                  currentQuestion.difficulty === Difficulty.ADVANCED && "bg-rose-50 text-rose-600"
                )}>
                  {currentQuestion.difficulty}
                </span>
              </div>

              <div className="mb-12">
                {renderSentence(currentQuestion.sentence, selectedAnswer)}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option}
                    disabled={isSubmitted}
                    onClick={() => handleAnswerSelect(option)}
                    className={cn(
                      "p-5 rounded-2xl text-lg font-semibold border-2 transition-all duration-200 text-center",
                      !isSubmitted && selectedAnswer === option && "border-indigo-500 bg-indigo-50 text-indigo-700",
                      !isSubmitted && selectedAnswer !== option && "border-slate-100 bg-slate-50 text-slate-600 hover:border-slate-300 hover:bg-slate-100",
                      isSubmitted && option === currentQuestion.correctAnswer && "border-emerald-500 bg-emerald-50 text-emerald-700",
                      isSubmitted && selectedAnswer === option && option !== currentQuestion.correctAnswer && "border-rose-500 bg-rose-50 text-rose-700",
                      isSubmitted && option !== currentQuestion.correctAnswer && selectedAnswer !== option && "border-slate-100 bg-slate-50 text-slate-400 opacity-50"
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>

              <div className="mt-10 flex justify-end">
                {!isSubmitted ? (
                  <button
                    onClick={handleSubmit}
                    disabled={!selectedAnswer}
                    className={cn(
                      "px-10 py-4 rounded-2xl font-bold text-lg transition-all flex items-center gap-2",
                      selectedAnswer 
                        ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200" 
                        : "bg-slate-200 text-slate-400 cursor-not-allowed"
                    )}
                  >
                    提交答案
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all flex items-center gap-2 shadow-lg shadow-slate-200"
                  >
                    {currentQuestionIndex === filteredQuestions.length - 1 ? '查看结果' : '下一题'}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                )}
              </div>
            </motion.div>
          </div>

          {/* Explanation Section */}
          <div className="lg:col-span-1">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden sticky top-24"
                >
                  <div className={cn(
                    "p-6 flex items-center gap-3",
                    isCorrect ? "bg-emerald-500 text-white" : "bg-rose-500 text-white"
                  )}>
                    {isCorrect ? <CheckCircle2 className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                    <span className="font-bold text-lg">{isCorrect ? '回答正确！' : '回答错误'}</span>
                  </div>
                  
                  <div className="p-8">
                    <div className="mb-6">
                      <h4 className="flex items-center gap-2 text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">
                        <Info className="w-4 h-4" />
                        语法详解
                      </h4>
                      <p className="text-slate-700 leading-relaxed font-medium">
                        {currentQuestion.explanation.rule}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">例句</h4>
                      <div className="bg-slate-50 p-4 rounded-xl border-l-4 border-indigo-500 italic text-slate-600">
                        "{currentQuestion.explanation.example}"
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">常见错误</h4>
                      <p className="text-rose-600 text-sm bg-rose-50 p-3 rounded-lg border border-rose-100">
                        {currentQuestion.explanation.commonMistake}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-slate-100">
                      <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">中文翻译</h4>
                      <p className="text-slate-500 text-sm">
                        {currentQuestion.explanation.translation}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-slate-100/50 rounded-3xl border-2 border-dashed border-slate-200 p-8 text-center sticky top-24">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <BookOpen className="w-8 h-8 text-slate-300" />
                  </div>
                  <h3 className="text-slate-500 font-bold mb-2">等待提交</h3>
                  <p className="text-slate-400 text-sm">提交答案后，这里将显示详细的语法解析和学习建议。</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Footer / Encouragement */}
      <footer className="max-w-5xl mx-auto px-4 py-12 border-t border-slate-200 mt-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-50 rounded-full">
              <Trophy className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <p className="font-bold text-slate-900">当前得分: {score}</p>
              <p className="text-sm text-slate-500">坚持练习，语法水平会不断提高！</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <a href="#" className="text-sm font-medium text-indigo-600 hover:underline flex items-center gap-1">
              复习定语从句 <ChevronRight className="w-4 h-4" />
            </a>
            <a href="#" className="text-sm font-medium text-indigo-600 hover:underline flex items-center gap-1">
              非谓语动词专题 <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
