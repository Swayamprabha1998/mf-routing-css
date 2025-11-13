import { type FormItemProps } from "antd";
import { type InputStatus } from "antd/es/_util/statusUtils";

export type ErrorProps = { error?: string; status?: InputStatus };

export type CustomFormItemProps = Pick<
  FormItemProps,
  | "hasFeedback"
  | "help"
  | "label"
  | "labelAlign"
  | "labelCol"
  | "required"
  | "tooltip"
  | "validateStatus"
  | "status"
  | "noStyle"
> & { formItemClassName?: string };
