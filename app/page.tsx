import { Hero } from "@/components/hero";
import Walkthrough from "@/hooks/user-walkthrough";
import ConnectSupabaseSteps from "@/components/tutorial/connect-supabase-steps";
import SignUpUserSteps from "@/components/tutorial/sign-up-user-steps";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";

export default async function Index() {
  return (
    <>
      {/* <Hero /> */}
      <Walkthrough />
      <main className="bg-green-500"></main>
    </>
  );
}
