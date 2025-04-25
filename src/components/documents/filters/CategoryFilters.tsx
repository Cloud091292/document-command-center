
import React from 'react';
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { AccordionContent } from "@/components/ui/accordion";

interface CategoryFiltersProps {
  categories: string[];
  selectedCategories: string[];
  onToggleCategory: (category: string) => void;
}

export function CategoryFilters({ categories, selectedCategories, onToggleCategory }: CategoryFiltersProps) {
  return (
    <AccordionContent>
      <div className="grid grid-cols-2 gap-2">
        {categories.map((category) => (
          <div key={category} className="flex items-center space-x-2">
            <Checkbox
              id={`category-${category}`}
              checked={selectedCategories.includes(category)}
              onCheckedChange={() => onToggleCategory(category)}
            />
            <Label htmlFor={`category-${category}`} className="text-sm">
              {category}
            </Label>
          </div>
        ))}
      </div>
    </AccordionContent>
  );
}
