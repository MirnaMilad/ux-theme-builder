export interface FormFieldConfig {
  key: string;
  label: string;
  type: FormFieldType;
  placeholder?: string;
  options?: FormFieldOption[];
  min?: number;
  max?: number;
  step?: number;
  description?: string;
  category?: string;
}
export enum FormFieldType {
  COLOR = 'color',
  TEXT = 'text',
  SELECT = 'select',
  NUMBER = 'number',
}

export interface FormFieldOption {
  label: string;
  value: string;
}
