import { useState } from "react";

const RadioButton = ({periodState, setPeriodState}) => {
  // const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPeriodState(event.target.value);
  };

  return (
    <div className="flex justify-center">
      <div className="mx-4 my-2">
        <label>
          <input
            type="radio"
            value="weekly"
            checked={periodState === "weekly"}
            onChange={handleOptionChange}
          />
          Week
        </label>
      </div>

      <div className="mx-4 my-2">
        <label>
          <input
            type="radio"
            value="monthly"
            checked={periodState === "monthly"}
            onChange={handleOptionChange}
          />
          Month
        </label>
      </div>

      <div className="mx-4 my-2">
        <label>
          <input
            type="radio"
            value="yearly"
            checked={periodState === "yearly"}
            onChange={handleOptionChange}
          />
          Year
        </label>
      </div>
    </div>
  );
}
export default RadioButton;
