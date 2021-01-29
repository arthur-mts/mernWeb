import { GetServerSideProps } from "next";
import { useState } from "react";
import { isAndroid } from "react-device-detect";

interface UsernameProps {
  accountName: string;
  dynamicLink: string;
  showDownloadLinks: boolean;
}

const androidUrl = 'https://play.google.com/store/apps/details?id=com.instagram.android&hl=pt_BR';
const iosUrl = 'https://apps.apple.com/br/app/instagram/id389801252';

export default function Username({accountName, dynamicLink, showDownloadLinks } : UsernameProps){

  const [dynamicLinkVisibility, setDynamicLinkVisibility] = useState(false);


  return(
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="flex flex-col w-9/12 items-center text-center">
        <h1 className="text-2xl font-bold">{`This page is for ${accountName}`}</h1>
        <button type="button" className="mt-5 border-2 border-solid rounded px-14 py-4 font-bold bg-blue" onClick={()=>setDynamicLinkVisibility(true)}>Share</button>
        {dynamicLinkVisibility && (<a className="break-all mt-5 underline" href={dynamicLink}>{dynamicLink}</a>)}
        {showDownloadLinks && (
          <a className="break-all mt-5 underline" href={isAndroid ? androidUrl : iosUrl}>{isAndroid ? androidUrl : iosUrl}</a>
        )}
      </div>
    </div>
  );
}

export const getServerSideProps:GetServerSideProps= async ({params, query}) => {
  const { username } = params;

  const showDownloadLinks = query.showDownloadLinks === 'true';

  const res = await fetch(`${process.env.API_URL}/${username}`);

  if(res.status > 400) {
    return {
      notFound: true
    }
  }
  const { account: { name }, dynamicLink } = await res.json();

  return { props: { accountName: name, dynamicLink ,showDownloadLinks }};
}

