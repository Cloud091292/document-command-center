
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AccordionContent } from "@/components/ui/accordion";

interface CustomerFiltersProps {
  contractNumber?: string;
  subscriberId?: string;
  customerId?: string;
  documentConditions?: string[];
  selectedDocumentCondition?: string;
  onInputChange: (field: 'contractNumber' | 'subscriberId' | 'customerId', value: string) => void;
  onDocumentConditionChange: (condition: string) => void;
}

export function CustomerFilters({
  contractNumber,
  subscriberId,
  customerId,
  documentConditions,
  selectedDocumentCondition,
  onInputChange,
  onDocumentConditionChange
}: CustomerFiltersProps) {
  return (
    <>
      <AccordionContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="contractNumber">Số hợp đồng</Label>
            <Input
              id="contractNumber"
              placeholder="Nhập số hợp đồng"
              value={contractNumber || ''}
              onChange={(e) => onInputChange('contractNumber', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subscriberId">ID thuê bao</Label>
            <Input
              id="subscriberId"
              placeholder="Nhập ID thuê bao"
              value={subscriberId || ''}
              onChange={(e) => onInputChange('subscriberId', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="customerId">Mã khách hàng</Label>
            <Input
              id="customerId"
              placeholder="Nhập mã khách hàng"
              value={customerId || ''}
              onChange={(e) => onInputChange('customerId', e.target.value)}
            />
          </div>
        </div>
      </AccordionContent>

      {documentConditions && documentConditions.length > 0 && (
        <AccordionContent>
          <RadioGroup
            value={selectedDocumentCondition}
            onValueChange={onDocumentConditionChange}
          >
            {documentConditions.map((condition) => (
              <div key={condition} className="flex items-center space-x-2">
                <RadioGroupItem value={condition} id={`condition-${condition}`} />
                <Label htmlFor={`condition-${condition}`}>{condition}</Label>
              </div>
            ))}
          </RadioGroup>
        </AccordionContent>
      )}
    </>
  );
}
