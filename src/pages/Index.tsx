
import React, { useState, useMemo } from 'react';
import { chaptersData } from '../data/chaptersData';
import { Chapter, FilterState } from '../types/chapter';
import { ChapterCard } from '../components/ChapterCard';
import { FilterPanel } from '../components/FilterPanel';
import { Sidebar } from '../components/Sidebar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, SortAsc, ArrowLeft, Menu } from 'lucide-react';
import { Atom, TestTube, Calculator } from 'phosphor-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Index = () => {
  const [activeSubject, setActiveSubject] = useState('Physics');
  const [filters, setFilters] = useState<FilterState>({
    selectedClass: [],
    selectedUnits: [],
    selectedStatus: [],
    showWeakChapters: false,
  });
  const [sortAscending, setSortAscending] = useState(true);

  // Get unique values for filters
  const subjects = ['Physics', 'Chemistry', 'Mathematics'];
  const currentSubjectData = chaptersData.filter(chapter => chapter.subject === activeSubject);
  
  const uniqueClasses = [...new Set(currentSubjectData.map(chapter => chapter.class))];
  const uniqueUnits = [...new Set(currentSubjectData.map(chapter => chapter.unit))];
  const uniqueStatuses = [...new Set(currentSubjectData.map(chapter => chapter.status))];

  // Filter chapters based on current filters
  const filteredChapters = useMemo(() => {
    let filtered = currentSubjectData.filter(chapter => {
      // Ensure status is one of the allowed types
      const validStatuses: Array<"Not Started" | "In Progress" | "Completed"> = ["Not Started", "In Progress", "Completed"];
      return validStatuses.includes(chapter.status as any);
    });

    if (filters.selectedClass.length > 0) {
      filtered = filtered.filter(chapter => filters.selectedClass.includes(chapter.class));
    }

    if (filters.selectedUnits.length > 0) {
      filtered = filtered.filter(chapter => filters.selectedUnits.includes(chapter.unit));
    }

    if (filters.selectedStatus.length > 0) {
      filtered = filtered.filter(chapter => filters.selectedStatus.includes(chapter.status));
    }

    if (filters.showWeakChapters) {
      filtered = filtered.filter(chapter => chapter.isWeakChapter);
    }

    // Sort chapters alphabetically
    return filtered.sort((a, b) => {
      const comparison = a.chapter.localeCompare(b.chapter);
      return sortAscending ? comparison : -comparison;
    });
  }, [currentSubjectData, filters, sortAscending]);

  const totalChapters = currentSubjectData.length;

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const getSubjectIcon = (subject: string) => {
    switch (subject) {
      case 'Physics':
        return <Atom size={20} weight="fill" className="text-orange-500" />;
      case 'Chemistry':
        return <TestTube size={20} weight="fill" className="text-green-500" />;
      case 'Mathematics':
        return <Calculator size={20} weight="fill" className="text-blue-500" />;
      default:
        return <Atom size={20} weight="fill" className="text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Desktop Layout - Hidden on mobile */}
      <div className="hidden md:flex min-h-screen">
        <Sidebar 
          subjects={subjects}
          activeSubject={activeSubject}
          onSubjectChange={setActiveSubject}
        />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="bg-white border-b border-gray-100 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{activeSubject} PYQs</h1>
                <p className="text-sm text-gray-500">Chapter-wise Collection of {activeSubject} PYQs</p>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setSortAscending(!sortAscending)}
                className="flex items-center gap-1 text-gray-600"
              >
                <ArrowUpDown className="w-4 h-4" />
                Sort
              </Button>
            </div>
          </div>

          {/* Filter Panel */}
          <div className="bg-white border-b border-gray-100 px-6">
            <FilterPanel
              uniqueClasses={uniqueClasses}
              uniqueUnits={uniqueUnits}
              uniqueStatuses={uniqueStatuses}
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>

          {/* Results Header */}
          <div className="bg-white px-6 py-3 border-b border-gray-100">
            <span className="text-sm text-gray-600">
              Showing all chapters ({filteredChapters.length})
            </span>
          </div>

          {/* Chapter List */}
          <div className="flex-1 bg-gray-50 p-6">
            <div className="space-y-2">
              {filteredChapters.map((chapter, index) => (
                <ChapterCard 
                  key={`${chapter.subject}-${chapter.chapter}-${index}`} 
                  chapter={chapter as Chapter} 
                />
              ))}
            </div>

            {filteredChapters.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No chapters found matching your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Layout - Hidden on desktop */}
      <div className="md:hidden flex flex-col min-h-screen">
        {/* Mobile Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
            <h1 className="text-lg font-medium text-gray-900">JEE Main</h1>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
            <Menu className="w-5 h-5 text-gray-600" />
          </div>
        </div>

        {/* Subject Tabs */}
        <div className="bg-white px-4 py-3 border-b border-gray-100">
          <div className="flex space-x-4">
            {subjects.map((subject) => {
              const isActive = subject === activeSubject;
              const shortName = subject === 'Physics' ? 'Phy' : subject === 'Chemistry' ? 'Chem' : 'Math';
              return (
                <button
                  key={subject}
                  onClick={() => setActiveSubject(subject)}
                  className={`flex flex-col items-center space-y-1 ${
                    isActive ? 'text-blue-600' : 'text-gray-500'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isActive ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    {getSubjectIcon(subject)}
                  </div>
                  <span className="text-xs font-medium">{shortName}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="bg-white px-4 py-3 border-b border-gray-100">
          <div className="flex space-x-2 overflow-x-auto">
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs whitespace-nowrap"
            >
              Class
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs whitespace-nowrap"
            >
              Units
            </Button>
            <Button
              variant={filters.selectedStatus.includes("Not Started") ? "default" : "outline"}
              size="sm"
              className="h-8 text-xs whitespace-nowrap"
              onClick={() => handleFilterChange({ 
                selectedStatus: filters.selectedStatus.includes("Not Started") 
                  ? filters.selectedStatus.filter(s => s !== "Not Started")
                  : [...filters.selectedStatus, "Not Started"]
              })}
            >
              Not Started
            </Button>
            <Button
              variant={filters.showWeakChapters ? "default" : "outline"}
              size="sm"
              className="h-8 text-xs whitespace-nowrap"
              onClick={() => handleFilterChange({ showWeakChapters: !filters.showWeakChapters })}
            >
              Weak
            </Button>
          </div>
        </div>

        {/* Results Header */}
        <div className="bg-white px-4 py-3 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              Showing all chapters ({filteredChapters.length})
            </span>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setSortAscending(!sortAscending)}
              className="flex items-center gap-1 text-gray-600 text-sm"
            >
              <ArrowUpDown className="w-4 h-4" />
              Sort
            </Button>
          </div>
        </div>

        {/* Chapter List */}
        <div className="flex-1 bg-gray-50">
          <div className="space-y-1 p-4">
            {filteredChapters.map((chapter, index) => (
              <ChapterCard 
                key={`${chapter.subject}-${chapter.chapter}-${index}`} 
                chapter={chapter as Chapter} 
              />
            ))}
          </div>

          {filteredChapters.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No chapters found matching your filters.</p>
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="bg-white border-t border-gray-200 px-4 py-2">
          <div className="flex justify-center space-x-8">
            <div className="w-6 h-6 bg-gray-800 rounded-full"></div>
            <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
            <div className="w-6 h-6 bg-gray-400 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
