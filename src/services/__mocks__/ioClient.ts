import { Client } from "sails.io.js";

export const ioClient = jest.genMockFromModule<Record<"default", Client>>(
  "../ioClient"
);

export default ioClient.default;
