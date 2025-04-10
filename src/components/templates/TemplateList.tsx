
import React from 'react';
import { TemplateCard } from './TemplateCard';
import { CreateTemplateCard } from './CreateTemplateCard';
import { Template } from '@/pages/templates/types';

interface TemplateListProps {
  templates: Template[];
  onPreview: (templateId: string) => void;
  onCreateTemplate: () => void;
}

export const TemplateList: React.FC<TemplateListProps> = ({ templates, onPreview, onCreateTemplate }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.map((template) => (
        <TemplateCard
          key={template.id}
          template={template}
          onPreview={onPreview}
        />
      ))}

      {/* Create New Template Card */}
      <CreateTemplateCard onClick={onCreateTemplate} />
    </div>
  );
};
