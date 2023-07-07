/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type RobotCreateFormInputValues = {
    name?: string;
    width?: string;
    length?: string;
    height?: string;
    sensorType?: string;
    imageUrl?: string;
};
export declare type RobotCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    width?: ValidationFunction<string>;
    length?: ValidationFunction<string>;
    height?: ValidationFunction<string>;
    sensorType?: ValidationFunction<string>;
    imageUrl?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type RobotCreateFormOverridesProps = {
    RobotCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    width?: PrimitiveOverrideProps<TextFieldProps>;
    length?: PrimitiveOverrideProps<TextFieldProps>;
    height?: PrimitiveOverrideProps<TextFieldProps>;
    sensorType?: PrimitiveOverrideProps<TextFieldProps>;
    imageUrl?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type RobotCreateFormProps = React.PropsWithChildren<{
    overrides?: RobotCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: RobotCreateFormInputValues) => RobotCreateFormInputValues;
    onSuccess?: (fields: RobotCreateFormInputValues) => void;
    onError?: (fields: RobotCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: RobotCreateFormInputValues) => RobotCreateFormInputValues;
    onValidate?: RobotCreateFormValidationValues;
} & React.CSSProperties>;
export default function RobotCreateForm(props: RobotCreateFormProps): React.ReactElement;
