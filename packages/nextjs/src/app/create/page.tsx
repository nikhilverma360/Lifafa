"use client";

import type { NextPage } from "next";
import { Header } from "../components/Header";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { usePrepareContractWrite, useContractWrite } from "wagmi";
import { abi } from "../utils/abi";
import { Sepolia } from "@thirdweb-dev/chains";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { Web3Button } from "@thirdweb-dev/react";

// If used on the FRONTEND pass your 'clientId'
const sdk = new ThirdwebSDK(Sepolia, {
  clientId: "39291f863f2eedae363823464b346226",
});

const Create: NextPage = () => {
  const { address, isConnected } = useAccount();
  const { config, error } = usePrepareContractWrite({
    address: "0x9A5d31eC9C1587c9259e07f42260D9968cFFAeFf",
    abi: [
      {
        inputs: [
          {
            internalType: "enum RedEnvelope.EnvelopeType",
            name: "_type",
            type: "uint8",
          },
          {
            internalType: "address",
            name: "_contractAddress",
            type: "address",
          },
          {
            internalType: "string",
            name: "_name",
            type: "string",
          },
          {
            internalType: "string",
            name: "_messasge",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "_noOfUsers",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_amountPerUsers",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_tokenId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_expiry",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "_gameMode",
            type: "bool",
          },
        ],
        name: "createEnvelope",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    functionName: "createEnvelope",
    args: [
      0,
      "0xDF11fC9D4Cc9296758fDD422472d5E3430dbAF1E",
      "nikhil",
      "hello_world",
      1,
      2,
      0,
      95848384853545,
      false,
    ],
  });

  // const { config, error } = usePrepareContractWrite({
  //   address: '0xDF11fC9D4Cc9296758fDD422472d5E3430dbAF1E',
  //   abi: abi,
  //   functionName: 'mint',
  //   args : ["0xDF11fC9D4Cc9296758fDD422472d5E3430dbAF1E", 1000]
  // })

  // const { config , error} = usePrepareContractWrite({
  //   address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  //   abi: [
  //     {
  //       name: 'mint',
  //       type: 'function',
  //       stateMutability: 'nonpayable',
  //       inputs: [],
  //       outputs: [],
  //     },
  //   ],
  //   functionName: 'mint',
  // })

  const { write } = useContractWrite(config);

  const createEnveplope = async () => {
    const contract = await sdk.getContract("0x9A5d31eC9C1587c9259e07f42260D9968cFFAeFf");
    const data = await contract.call("createEnvelope", [
      0,
      "0xDF11fC9D4Cc9296758fDD422472d5E3430dbAF1E",
      "nikhil",
      "hello_world",
      1,
      2,
      0,
      95848384853545,
      false,
    ]);
  };

  //render
  const RenderCreate = () => {
    return (
      <>
        {/* <button disabled={!write} onClick={() => write?.()}>
        Create
      </button>
      {error && (
        <div>An error occurred preparing the transaction: {error.message}</div>
      )} */}
        {/* <button onClick={createEnveplope}> Create </button> */}

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Name
          </label>
          <input
            width={100}
            type="text"
            id="small-input"
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your message
          </label>
          <textarea
            id="message"
            rows="4"
            className="block mb-6 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your thoughts here..."
          ></textarea>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Token Contract Address
          </label>
          <input
            width={100}
            type="text"
            id="small-input"
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            No of User to Claim
          </label>
          <input
            width={100}
            type="text"
            id="small-input"
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Amout per user
          </label>
          <input
            width={100}
            type="text"
            id="small-input"
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Data Group IDs
          </label>
          <input
            width={100}
            type="text"
            id="small-input"
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <Web3Button
          className="justify-center"
          contractAddress="0x9A5d31eC9C1587c9259e07f42260D9968cFFAeFf"
          action={(contract) => {
            contract.call("createEnvelope", [
              0,
              "0xDF11fC9D4Cc9296758fDD422472d5E3430dbAF1E",
              "nikhil",
              "hello_world",
              1,
              2,
              0,
              95848384853545,
              false,
            ]);
          }}
        >
          Create Envelope
        </Web3Button>
      </>
    );
  };
  return (
    <>
      <Header />
      <div className="m-32">
        <div className="m-auto">
          <RenderCreate />
        </div>
        {/* <div className="m-auto">{isConnected ? <RenderCreate /> : <ConnectButton />}</div> */}
      </div>
    </>
  );
};

export default Create;
