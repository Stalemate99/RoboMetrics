type PartialInputProps = Pick<
  React.ComponentPropsWithoutRef<"input">,
  "className" | "style"
>;

type OtpProps = {
  /**
   * full value of the otp input, up to {size} characters
   */
  value: string;
  handleChange(value: string): void;
  /**
   * Number of characters/input for this component
   */
  size?: number;
  /**
   * Validation pattern for each input.
   * e.g: /[0-9]{1}/ for digits only or /[0-9a-zA-Z]{1}/ for alphanumeric
   */
  validationPattern?: RegExp;
} & PartialInputProps;

export default OtpProps;
