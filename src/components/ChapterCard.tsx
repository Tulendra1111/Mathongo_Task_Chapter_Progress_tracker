
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Chapter } from '../types/chapter';
import { 
  Planet, 
  Function, 
  Ruler, 
  ArrowRight, 
  ArrowsOutCardinal, 
  Atom,
  Target
} from 'phosphor-react';

interface ChapterCardProps {
  chapter: Chapter;
}

export const ChapterCard: React.FC<ChapterCardProps> = ({ chapter }) => {
  const getChapterIcon = (chapterName: string) => {
    const name = chapterName.toLowerCase();
    
    if (name.includes('gravitation')) {
      return <Planet size={16} weight="light" className="text-gray-600" />;
    }
    if (name.includes('math')) {
      return <Function size={16} weight="light" className="text-gray-600" />;
    }
    if (name.includes('units') || name.includes('dimension')) {
      return <Ruler size={16} weight="light" className="text-gray-600" />;
    }
    if (name.includes('motion') && name.includes('one')) {
      return <ArrowRight size={16} weight="light" className="text-gray-600" />;
    }
    if (name.includes('motion') && name.includes('two')) {
      return <ArrowsOutCardinal size={16} weight="light" className="text-gray-600" />;
    }
    if (name.includes('laws') || name.includes('law')) {
      return <Target size={16} weight="light" className="text-gray-600" />;
    }
    
    // Default physics icon
    return <Atom size={16} weight="light" className="text-gray-600" />;
  };

  const getTotalQuestions = (yearWiseCount: { [year: string]: number }) => {
    return Object.values(yearWiseCount).reduce((sum, count) => sum + count, 0);
  };

  const getYearData = (yearWiseCount: { [year: string]: number }) => {
    const years = ['2025', '2024'];
    return years.map(year => ({
      year,
      count: yearWiseCount[year] || 0
    }));
  };

  const totalQuestions = getTotalQuestions(chapter.yearWiseQuestionCount);
  const yearData = getYearData(chapter.yearWiseQuestionCount);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 mb-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1">
          <div className="flex-shrink-0">
            {getChapterIcon(chapter.chapter)}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-gray-900 text-sm leading-tight">{chapter.chapter}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-xs text-gray-500">{yearData[0].count + yearData[1].count}Qs</span>
              <span className="text-xs text-gray-400">|</span>
              <span className="text-xs text-gray-500">{yearData[1].count}Qs</span>
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="text-sm font-medium text-gray-900">
            {String(yearData[0].count + yearData[1].count).padStart(2, '0')}/05 Qs
          </div>
        </div>
      </div>
    </div>
  );
};
