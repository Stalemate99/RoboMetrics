import OtpProps from "../types/otp";

const OtpInput = (props: OtpProps) => {
  const {
    size = 6,
    validationPattern = /[0-9]{1}/,
    value,
    handleChange,
    className,
    ...restProps
  } = props;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const elem = e.target;
    const val = e.target.value;
    // check if the value is valid
    if (!validationPattern.test(val) && val !== "") return;

    // change the value of the upper state using onChange
    const valueArr = value.split("");
    valueArr[index] = val;
    const newVal = valueArr.join("").slice(0, 6);
    handleChange(newVal);

    //focus the next element if there's a value
    if (val) {
      const next = elem.nextElementSibling as HTMLInputElement | null;
      next?.focus();
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const current = e.currentTarget;
    if (e.key === "ArrowLeft" || e.key === "Backspace") {
      const prev = current.previousElementSibling as HTMLInputElement | null;
      prev?.focus();
      prev?.setSelectionRange(0, 1);
      return;
    }

    if (e.key === "ArrowRight") {
      const prev = current.nextSibling as HTMLInputElement | null;
      prev?.focus();
      prev?.setSelectionRange(0, 1);
      return;
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const val = e.clipboardData.getData("text").substring(0, size);
    handleChange(val);
  };

  // Create an array based on the size.
  const arr = new Array(size).fill("-");
  return (
    <div className="flex gap-4 w-1/4 my-6">
      {arr.map((_, index) => {
        return (
          <input
            key={index}
            {...restProps}
            className={
              className ||
              `w-12 px-0 text-center text-sky-800 border-orange-400 border-2 rounded-sm focus:border-orange-300 focus:border-2`
            }
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern={validationPattern.source}
            maxLength={6}
            value={value.at(index) ?? ""}
            onChange={(e) => handleInputChange(e, index)}
            onKeyUp={handleKeyUp}
            onPaste={handlePaste}
          />
        );
      })}
    </div>
  );
};

export default OtpInput;
