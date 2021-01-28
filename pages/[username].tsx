import { GetServerSideProps } from "next";

export default function Username({username}){

  const generateDeepLink = async () => {
    const link = `link/${username}`;
    await navigator.clipboard.writeText(link);
    alert('Link coppied to clipboard');
  };

  return(
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="flex flex-col w-9/12 items-center">
        <h1 className="text-2xl font-bold">{`This page is for ${username}`}</h1>
        <button type="button" className="mt-5 border-2 border-solid rounded px-14 py-4 font-bold bg-blue" onClick={generateDeepLink}>Share</button>
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
  return { props: { username }};
}

