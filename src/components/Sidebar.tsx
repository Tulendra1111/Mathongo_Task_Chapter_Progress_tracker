
import React from 'react';
import { Button } from '@/components/ui/button';
import { Atom, TestTube, Calculator } from 'phosphor-react';

interface SidebarProps {
  subjects: string[];
  activeSubject: string;
  onSubjectChange: (subject: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  subjects, 
  activeSubject, 
  onSubjectChange 
}) => {
  const getSubjectIcon = (subject: string) => {
    switch (subject) {
      case 'Physics':
        return <Atom size={16} weight="fill" className="text-orange-500" />;
      case 'Chemistry':
        return <TestTube size={16} weight="fill" className="text-green-500" />;
      case 'Mathematics':
        return <Calculator size={16} weight="fill" className="text-blue-500" />;
      default:
        return <Atom size={16} weight="fill" className="text-gray-500" />;
    }
  };

  const getSubjectColor = (subject: string, isActive: boolean) => {
    if (!isActive) {
      return 'text-gray-700 hover:bg-gray-50 border-transparent';
    }
    
    switch (subject) {
      case 'Physics':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Chemistry':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'Mathematics':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      default:
        return 'text-gray-900 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">J</span>
          </div>
          <h2 className="text-base font-semibold text-gray-900">JEE Main</h2>
        </div>
        <p className="text-xs text-gray-500">2025 - 2026 | 173 Papers | 18825 Qs</p>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-3">
        <div className="space-y-1">
          {subjects.map((subject) => {
            const isActive = subject === activeSubject;
            return (
              <Button
                key={subject}
                variant="ghost"
                className={`w-full justify-start h-10 text-left font-medium text-sm border rounded-lg ${getSubjectColor(subject, isActive)}`}
                onClick={() => onSubjectChange(subject)}
              >
                <span className="mr-3">{getSubjectIcon(subject)}</span>
                <span>{subject} PYQs</span>
                {isActive && <span className="ml-auto text-gray-400">›</span>}
              </Button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
