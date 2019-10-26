import React from "react";
import { action } from "@storybook/addon-actions";

import Button from "../src/components/Button/Button";
import SearchSelect from "../src/components/SearchSelect/SearchSelect";
import Chooser from "../src/components/Chooser/Chooser";
import { mockOptions, mockBeerOptions, mockFoodOptions } from "./mockData";
export default {
  title: "Components"
};

export const searchselect = () => {
  return (
    <SearchSelect
      options={mockOptions}
      name="search select"
      handleSelect={action("selection made")}
      isDeployed={false}
      defaultText="make a selection"
      currentSelection={null}
    />
  );
};

export const button = () => {
  return (
    <Button
      onClick={action("clicked")}
      text="Button"
      name="LOVE ME AND DESPAIR"
    />
  );
};

export const chooser = () => {
  return (
    <Chooser
      handleSubmission={action("submission")}
      mockBeerOptions={mockBeerOptions}
      mockFoodOptions={mockFoodOptions}
    />
  );
};
