import React from "react";
import { storiesOf } from "@storybook/react";

import Connect from "./Connect";

const stories = storiesOf("MetamaskConnect", module);

stories.add("Connect", () => <Connect />);
