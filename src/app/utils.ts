import { NewLambda } from "@0xpass/passport";

export const eip712Data = {
  types: {
    EIP712Domain: [
      {
        name: "name",
        type: "string",
      },
      {
        name: "version",
        type: "string",
      },
      {
        name: "chainId",
        type: "uint256",
      },
      {
        name: "verifyingContract",
        type: "address",
      },
    ],
    Person: [
      {
        name: "name",
        type: "string",
      },
      {
        name: "wallet",
        type: "address",
      },
    ],
    Mail: [
      {
        name: "from",
        type: "Person",
      },
      {
        name: "to",
        type: "Person",
      },
      {
        name: "contents",
        type: "string",
      },
    ],
  },
  primaryType: "Mail",
  domain: {
    name: "Ether Mail",
    version: "1",
    chainId: 1,
    verifyingContract: "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC",
  },
  message: {
    from: {
      name: "Cow",
      wallet: "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826",
    },
    to: {
      name: "Bob",
      wallet: "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
    },
    contents: "Hello, Bob!",
  },
};

export const lambdaData: NewLambda = {
  authorization: {
    type: "none",
  },
  verifications: {
    count: 1,
  },
  max_executions: 1,
  triggers: [
    { type: "hook" }
  ],
  envs: [],
  conditions: [
    {
      type: "code",
      code: "return 3;",
      output_type: "integer",
      substitution: false,
    },
    {
      type: "code",
      code: "return true;",
      output_type: "integer",
      substitution: false,
    },
  ],
  actions: {
    type: "personal_sign",
    check: "",
    data: "0x000000",
    substitution: true,
  },
  postHook: [],
};
