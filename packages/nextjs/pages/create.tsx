import { Dispatch, SetStateAction } from "react";
import { AbiParameter } from "abitype";
import type { NextPage } from "next";
import { InputBase } from "~~/components/scaffold-eth";

type ContractInputProps = {
  setForm: Dispatch<SetStateAction<Record<string, any>>>;
  form: Record<string, any> | undefined;
  stateObjectKey: string;
  paramType: AbiParameter;
};


const Create: NextPage = () => {
  

  return <>
  <div>
    hi
  </div>
  </>;
};

export default Create;
