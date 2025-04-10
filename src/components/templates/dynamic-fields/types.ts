
export interface DynamicField {
  id: number;
  name: string;
  type: string;
  description: string;
}

export const fieldTypeLabels: Record<string, string> = {
  'text': 'Text field',
  'number': 'Numeric field',
  'date': 'Date field',
  'select': 'Selection field',
  'checkbox': 'Checkbox field'
};
