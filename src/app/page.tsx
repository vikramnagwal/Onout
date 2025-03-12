import { prisma } from "@/packages/lib/db";

export default async function Home() {
  const users = await prisma.user.findMany();
  return (
   <div>
    <p>Users</p>
    <ol>
      {users.map((user, id) => (
        <li key={id}>{user.name}</li>
      ))}
    </ol>
   </div>
  );
}
