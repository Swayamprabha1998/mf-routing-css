import { CaretDownFilled } from "@ant-design/icons";
import { Form, Select, type SelectProps } from "antd";
import { type BaseSelectRef } from "rc-select/lib";
import {
  type FieldValues,
  type UseControllerProps,
  useController,
} from "react-hook-form";
// import { isObjectType } from "utils/functions";
import { type CustomFormItemProps, type ErrorProps } from "./types";
import {
  forwardRef,
  type ReactElement,
  type JSXElementConstructor,
} from "react";

type LookSelectGroupTypeString = {
  label: string;
  value: string;
};

type LookSelectOptionType = {
  label: string | React.ReactNode | undefined;
  value: string | undefined;
  [x: string]: any;
};

type LookFormSelectProps<ValueType> = SelectProps<
  ValueType,
  LookSelectOptionType
> & {
  searchable?: boolean;
  disableHookOnChange?: boolean;
  customDropdownRenderOnTop?: any;
} & CustomFormItemProps;

const isObjectType = <TrueType, FalseType>(
  _obj: TrueType | FalseType, // Rename or use an unused variable convention
  condition: boolean
): _obj is TrueType => condition;

// Wrapper Component for dropdown input
const LookFormSelect = forwardRef<BaseSelectRef, LookFormSelectProps<any>>(
  (props, ref) => {
    const {
      searchable = false,
      hasFeedback,
      help,
      label,
      labelAlign,
      labelCol,
      required,
      tooltip,
      validateStatus,
      noStyle,
      status,
      value,
      formItemClassName,
      customDropdownRenderOnTop,
      dropdownRender,
      ...selectProps
    } = props;

    let searchProps: SelectProps<any, LookSelectOptionType> = {};
    if (searchable) {
      // Filter `option.label` match the user type `input`
      searchProps = {
        showSearch: true,
        filterOption: (input: string, option?: LookSelectOptionType) =>
          typeof option?.label === "string" &&
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase()),
      };
    }

    const formItemProps = {
      hasFeedback,
      label,
      labelAlign,
      labelCol,
      tooltip,
      help,
      validateStatus,
      status,
      noStyle,
      className: formItemClassName,
    };

    const renderDropdown = (
      menu: ReactElement<any, string | JSXElementConstructor<any>>
    ) => {
      // If custom dropdownRender is provided, use it
      if (dropdownRender) {
        return dropdownRender(menu);
      }

      // Otherwise, handle customDropdownRenderOnTop
      if (!customDropdownRenderOnTop) {
        return menu;
      }

      return (
        <div>
          {customDropdownRenderOnTop}
          {menu}
        </div>
      );
    };

    return (
      <Form.Item {...formItemProps}>
        <Select
          ref={ref}
          suffixIcon={
            selectProps.loading ? undefined : (
              <CaretDownFilled className="pointer-events-none" />
            )
          }
          {...searchProps}
          {...selectProps}
          value={value || undefined}
          dropdownRender={renderDropdown}
        />
      </Form.Item>
    );
  }
);

type LookHookFormSelectProps<
  ValueType,
  T extends FieldValues
> = LookFormSelectProps<ValueType> &
  UseControllerProps<T> &
  Required<Pick<UseControllerProps<T>, "control">>;

// Wrapper Component for dropdown input using react-hook-form
const LookHookFormSelect = <ValueType, T extends FieldValues>(
  props: LookHookFormSelectProps<ValueType, T>
) => {
  const {
    name,
    control,
    rules,
    defaultValue,
    shouldUnregister,
    validateStatus,
    help,
    disableHookOnChange,
    ...inputProps
  } = props;
  const { field, fieldState } = useController<T>({
    name,
    control,
    defaultValue,
    rules,
    shouldUnregister,
  });

  let errorProps: ErrorProps = {};
  if (fieldState.error) {
    if (Array.isArray(fieldState.error)) {
      const idx = fieldState.error.findIndex((e) => !!e);
      errorProps = {
        error: fieldState.error[idx].message,
        status: "error",
      };
    } else {
      errorProps = {
        error: fieldState.error.message,
        status: "error",
      };
    }
  }

  const otherValidateProps: CustomFormItemProps = errorProps.error
    ? {
        validateStatus: "error",
        help: errorProps.error,
      }
    : {
        validateStatus,
        help,
      };

  return (
    <LookFormSelect
      {...inputProps}
      {...field}
      {...otherValidateProps}
      value={field.value || undefined}
      onChange={(...args) => {
        // disable default hook form change
        if (!disableHookOnChange) {
          field.onChange(...args);
        }
        if (inputProps.onChange) inputProps.onChange(...args);
      }}
      status={errorProps.status}
    />
  );
};

type LookSelectProps<ValueType, FieldValuesType extends FieldValues> = {
  isHookForm?: boolean;
} & (
  | ({ isHookForm?: false } & LookFormSelectProps<ValueType>)
  | ({ isHookForm: true } & LookHookFormSelectProps<ValueType, FieldValuesType>)
);

const LookSelect = <ValueType, FieldValuesType extends FieldValues>(
  props: LookSelectProps<ValueType, FieldValuesType>
) => {
  const { isHookForm = false, ...selectProps } = props;
  // Checking Type if isHookForm true then control prop became mandatory
  if (
    isObjectType<
      LookHookFormSelectProps<ValueType, FieldValuesType>,
      LookFormSelectProps<ValueType>
    >(selectProps, isHookForm)
  ) {
    return <LookHookFormSelect {...selectProps} />;
  }
  return <LookFormSelect {...selectProps} />;
};

export type { LookSelectOptionType, LookSelectGroupTypeString };
export default LookSelect;
