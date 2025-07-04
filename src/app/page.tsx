import BudgetDashboard from "@/components/budget-dashboard";
import { getEnvelopes, getIncome } from "@/actions/budget";


export default async function Home() {
  const envelopes = await getEnvelopes();
  const income = await getIncome();
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Envelope Budget</h1>
      <BudgetDashboard envelopes={envelopes} income={income}/>
    </div>
  );
}
