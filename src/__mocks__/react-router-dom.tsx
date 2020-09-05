/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import rrd from "react-router-dom";

// Just render plain div with its children
// rrd.BrowserRouter = ({ children }: any) => <div>{children}</div>;
rrd.Link = ({ children }: any) => <>{children}</>;

module.exports = rrd;
