import {
  Form,
  Input,
  InputNumber,
  type InputNumberProps,
  type InputProps,
} from "antd";
import { type InputRef, type TextAreaProps } from "antd/es/input";
import {
  type UseControllerProps,
  useController,
  type FieldValues,
} from "react-hook-form";
import { type OTPProps } from "antd/es/input/OTP";
import PhoneInput, { type PhoneInputProps } from "react-phone-input-2";
import { type TextAreaRef } from "antd/es/input/TextArea";
import { type CustomFormItemProps, type ErrorProps } from "./types";
// import { isObjectType, trimStart } from "utils/functions";
import { forwardRef } from "react";

const isObjectType = <TrueType, FalseType>(
  _obj: TrueType | FalseType, // Rename or use an unused variable convention
  condition: boolean
): _obj is TrueType => condition;

const trimStart = (
  value: string | number | bigint | readonly string[] | null | undefined
) =>
  value &&
  typeof value === "string" &&
  (value.charAt(0) === " " || value.charAt(value.length - 1) === " ")
    ? value.trimStart()
    : value;

const LookPhoneInput = (props: PhoneInputProps & { ref: any }) => {
  const { ref, ...restProps } = props;
  return (
    <PhoneInput
      {...restProps}
      inputProps={{ ref }}
      containerClass="look-phone-input-lib"
    />
  );
};

const Inputs = {
  text: Input,
  email: Input,
  password: Input.Password,
  number: InputNumber,
  textarea: Input.TextArea,
  otp: Input.OTP,
  phone: LookPhoneInput,
};

type InputType = keyof typeof Inputs;

type TextInputProps = Omit<InputProps, "type"> & {
  type?: "text" | "email" | "password";
};

type NumberInputProps = Omit<InputNumberProps, "type"> & {
  type?: "number";
  currency?: boolean;
};

type TextAreaInputProps = Omit<TextAreaProps, "type"> & {
  type?: "textarea";
};

type OTPInputProps = Omit<OTPProps, "type"> & {
  type?: "otp";
};

type LookPhoneInputProps = Omit<PhoneInputProps, "type"> & {
  type?: "phone";
};

type LookFormInputProps = CustomFormItemProps & {
  type?: InputType;
  error?: string;
  autoComplete?: string;
  trimValue?: boolean;
} & (
    | NumberInputProps
    | TextAreaInputProps
    | TextInputProps
    | OTPInputProps
    | LookPhoneInputProps
  );

const LookFormInput = forwardRef<InputRef | TextAreaRef, LookFormInputProps>(
  (props, ref) => {
    const {
      type = "text",
      hasFeedback,
      help,
      label,
      labelAlign,
      labelCol,
      required,
      tooltip,
      error = "",
      validateStatus,
      noStyle,
      formItemClassName,
      autoComplete,
      trimValue,
      ...restProps
    } = props;

    const finalLabel = required ? (
      <>
        {label} <span className="error-message">*</span>
      </>
    ) : (
      label
    );

    const otherValidateProps: CustomFormItemProps = error
      ? {
          validateStatus: "error",
          help: error,
        }
      : {
          validateStatus,
          help,
        };

    const formItemProps = {
      hasFeedback,
      label: finalLabel,
      labelAlign,
      labelCol,
      tooltip,
      noStyle,
      className: formItemClassName,
      ...otherValidateProps,
    };

    const RenderInput: any = Inputs[type];

    if (
      isObjectType<
        NumberInputProps,
        Exclude<LookFormInputProps, NumberInputProps>
      >(restProps, type === "number") &&
      restProps.currency
    ) {
      const { currency, type: inputType, ...otherProps } = restProps;

      return (
        <Form.Item status={props.status} {...formItemProps}>
          <RenderInput
            formatter={(input: number) =>
              `${input}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(input: string) =>
              input?.replace(/\$\s?|(,*)/g, "") as unknown as number
            }
            {...otherProps}
            ref={ref}
          />
        </Form.Item>
      );
    }

    const { value } = restProps;

    const trimProps = {
      value: trimStart(value),
    };

    return (
      <Form.Item status={props.status} {...formItemProps}>
        <RenderInput
          ref={ref}
          type={type}
          autoComplete={autoComplete ?? "off"}
          {...restProps}
          {...(trimValue ? trimProps : {})}
        />
      </Form.Item>
    );
  }
);

type LookHookFormInputProps<T extends FieldValues> = LookFormInputProps &
  UseControllerProps<T> &
  Required<Pick<UseControllerProps<T>, "control">> & {
    ref?: React.LegacyRef<InputRef | TextAreaRef>;
  };

const LookHookFormInput = <T extends FieldValues>(
  props: LookHookFormInputProps<T>
) => {
  const {
    name,
    control,
    rules,
    defaultValue,
    shouldUnregister,
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
    errorProps = {
      error: fieldState.error.message,
      status: "error",
    };
  }

  return (
    <LookFormInput
      {...field}
      {...inputProps}
      status={errorProps.status}
      error={errorProps.error}
    />
  );
};

export type LookInputProps<T extends FieldValues> = { isHookForm?: boolean } & (
  | ({ isHookForm?: false } & LookFormInputProps)
  | ({ isHookForm: true } & LookHookFormInputProps<T>)
);

const LookInput = <T extends FieldValues>(
  props: LookInputProps<T>
  // ref: React.LegacyRef<InputRef | TextAreaRef>,
) => {
  const { isHookForm = false, ...inputProps } = props;

  // Checking Type if isHookForm true then controll prop became mandatory
  if (
    isObjectType<LookHookFormInputProps<T>, LookFormInputProps>(
      inputProps,
      isHookForm
    )
  ) {
    return <LookHookFormInput {...inputProps} />;
  }

  return <LookFormInput {...inputProps} />;
};

export default LookInput;
