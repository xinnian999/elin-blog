import { FormItemProps, TableColumnProps } from "antd";

export interface FormItem extends FormItemProps {
  component: React.ReactNode;
}

export interface FormSchema {
  items: FormItem[];
}

export interface TablePlusProps<T> {
  columns: TableColumnProps[];
  api: () => Promise<T[]>;
  createConfig?: {
    title: string;
    schema: FormSchema;
    api: (values: T) => Promise<void>;
  };
  deleteApi: (id: number) => Promise<void>;
}
