import { useRouter } from "next/router";
import type { NextPage } from "next";

const EnveplopePage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query as { id?: `${string}` };
  return <>Envelope id : {id}</>;
};

export default EnveplopePage;
