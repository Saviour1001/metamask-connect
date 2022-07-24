import React from "react";
import { storiesOf } from "@storybook/react";

import Button from "./Connect";

const stories = storiesOf("MetamaskConnect", module);

stories.add("Connect", () => <Button label="Connect" />);
