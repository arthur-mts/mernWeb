import { FormEvent, useCallback, useState } from "react"
import Router from 'next/router';
import axios from 'axios';

export default function Home() {
  const [ name, setName ] = useState('');

  const submit = useCallback(async(e : FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.API_URL}`, { name });
      Router.push(`${name}`);
    }
    catch(err) {
      console.log(err)
      if(err.response && err.response.status >= 400) {
        alert(err.response.data.message);
      }
    }
  },[name, setName]);

  return (
    <main className="flex justify-center items-center w-screen h-screen">
      <form onSubmit={submit} className="flex flex-col w-9/12 items-center">
        <input type="text" className="border border-solid rounded py-4 px-3 w-3/4 md:w-6/12" value={name} onChange={(e)=> setName(e.target.value)}/>
        <button type="submit" className="mt-5 border-2 border-solid rounded px-14 py-4 font-bold bg-blue">Create</button>
      </form>
    </main>
  )
}
