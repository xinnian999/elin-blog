import { FormItemProps, TableColumnProps } from "antd";
import { ObjectLiteral } from "typeorm";

export interface FormItem extends FormItemProps {
  component: React.ReactNode;
}

export interface FormSchema {
  items: FormItem[];
}

export interface TablePlusProps<T> {
  title: string;
  columns: TableColumnProps[];
  api: () => Promise<T[]>;
  createConfig?: {
    title: string;
    schema: FormSchema;
    api: (values: T) => Promise<void>;
  };
  updateConfig?: {
    title: string;
    schema: FormSchema;
    api: (id: number, values: T) => Promise<void>;
    parseInitialValues?: (values: ObjectLiteral) => ObjectLiteral;
  };
  deleteApi?: (id: number) => Promise<void>;
  deleteShow?: (record: T) => boolean;
  renderRowActions?: (params: {
    record: T;
    basic: React.ReactNode;
    refresh: () => void;
  }) => React.ReactNode;
}
