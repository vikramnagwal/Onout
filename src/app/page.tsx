import { AnomSpinner } from "@/packages/ui/loaders/anom-spinner";
import { Verify } from "./(auth)/register/page-client";

export default async function Home() {
  return (
      <div>
        <h1>home</h1>
        <Verify />
        <AnomSpinner />
      </div>
  );
}
