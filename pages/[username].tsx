import { GetServerSideProps } from "next";
import { useState } from "react";

interface UsernameProps {
  accountName: string;
  dynamicLink: string;
}

export default function Username({accountName, dynamicLink} : UsernameProps){

  const [dynamicLinkVisibility, setDynamicLinkVisibility] = useState(false);


  return(
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="flex flex-col w-9/12 items-center">
        <h1 className="text-2xl font-bold">{`This page is for ${accountName}`}</h1>
        <button type="button" className="mt-5 border-2 border-solid rounded px-14 py-4 font-bold bg-blue" onClick={()=>setDynamicLinkVisibility(true)}>Share</button>
        {dynamicLinkVisibility && (<a className="mt-5 underline" href={dynamicLink}>{dynamicLink}</a>)}
      </div>
    </div>
  );
}

export const getServerSideProps:GetServerSideProps= async ({params}) => {
  const { username } = params;
  const res = await fetch(`${process.env.API_URL}/${username}`);

  if(res.status > 400) {
    return {
      notFound: true
    }
  }
  const { account: { name }, dynamicLink } = await res.json();

  return { props: { accountName: name, dynamicLink }};
}

