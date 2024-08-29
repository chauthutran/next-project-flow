import Image from "next/image";
import {fetchProjectsByUserId} from "@/lib/db";

export default async function Home() {
  const data = await fetchProjectsByUserId("64f72bf0f1c1b47650cbe8a1");
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     asfasd {JSON.stringify(data)}
    </main>
  );
}
