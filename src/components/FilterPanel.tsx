
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FilterState } from '../types/chapter';

interface FilterPanelProps {
  uniqueClasses: string[];
  uniqueUnits: string[];
  uniqueStatuses: string[];
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  uniqueClasses,
  uniqueUnits,
  uniqueStatuses,
  filters,
  onFilterChange,
}) => {
  const toggleWeakChapters = () => {
    onFilterChange({ showWeakChapters: !filters.showWeakChapters });
  };

  const handleClassSelect = (value: string) => {
    const newSelectedClass = filters.selectedClass.includes(value)
      ? filters.selectedClass.filter(c => c !== value)
      : [...filters.selectedClass, value];
    onFilterChange({ selectedClass: newSelectedClass });
  };

  const handleUnitSelect = (value: string) => {
    const newSelectedUnits = filters.selectedUnits.includes(value)
      ? filters.selectedUnits.filter(u => u !== value)
      : [...filters.selectedUnits, value];
    onFilterChange({ selectedUnits: newSelectedUnits });
  };

  const handleStatusSelect = (value: string) => {
    const newSelectedStatus = filters.selectedStatus.includes(value)
      ? filters.selectedStatus.filter(s => s !== value)
      : [...filters.selectedStatus, value];
    onFilterChange({ selectedStatus: newSelectedStatus });
  };

  return (
    <div className="flex items-center gap-3 py-3">
      {/* Class Filter */}
      <Select onValueChange={handleClassSelect}>
        <SelectTrigger className="w-24 h-8 text-sm">
          <SelectValue placeholder="Class" />
        </SelectTrigger>
        <SelectContent>
          {uniqueClasses.map(cls => (
            <SelectItem key={cls} value={cls}>
              {cls}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Units Filter */}
      <Select onValueChange={handleUnitSelect}>
        <SelectTrigger className="w-24 h-8 text-sm">
          <SelectValue placeholder="Units" />
        </SelectTrigger>
        <SelectContent>
          {uniqueUnits.map(unit => (
            <SelectItem key={unit} value={unit}>
              {unit}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Not Started Button */}
      <Button
        variant={filters.selectedStatus.includes("Not Started") ? "default" : "outline"}
        size="sm"
        className="h-8 text-sm px-3"
        onClick={() => handleStatusSelect("Not Started")}
      >
        Not Started
      </Button>

      {/* Weak Chapters Button */}
      <Button
        variant={filters.showWeakChapters ? "default" : "outline"}
        size="sm"
        className="h-8 text-sm px-3"
        onClick={toggleWeakChapters}
      >
        Weak Chapters
      </Button>

      {/* Active Filters Display */}
      {(filters.selectedClass.length > 0 || filters.selectedUnits.length > 0 || filters.selectedStatus.length > 0) && (
        <div className="flex gap-2 ml-4">
          {filters.selectedClass.map(cls => (
            <Badge key={cls} variant="secondary" className="text-xs">
              {cls}
              <button 
                onClick={() => handleClassSelect(cls)}
                className="ml-1 hover:text-red-600"
              >
                ×
              </button>
            </Badge>
          ))}
          {filters.selectedUnits.map(unit => (
            <Badge key={unit} variant="secondary" className="text-xs">
              {unit}
              <button 
                onClick={() => handleUnitSelect(unit)}
                className="ml-1 hover:text-red-600"
              >
                ×
              </button>
            </Badge>
          ))}
          {filters.selectedStatus.map(status => (
            <Badge key={status} variant="secondary" className="text-xs">
              {status}
              <button 
                onClick={() => handleStatusSelect(status)}
                className="ml-1 hover:text-red-600"
              >
                ×
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};
