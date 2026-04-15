import { useState } from "react";
import { getExpenses, type Expense } from "@/lib/expense-store";
import ExpenseSummary from "@/components/ExpenseSummary";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseList from "@/components/ExpenseList";
import { Wallet } from "lucide-react";

export default function Index() {
  const [expenses, setExpenses] = useState<Expense[]>(getExpenses);

  const handleAdd = (expense: Expense) => {
    setExpenses((prev) => [expense, ...prev]);
  };

  const handleDelete = (id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gradient-primary text-primary-foreground">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3">
            <div className="bg-primary-foreground/20 rounded-xl p-2.5">
              <Wallet className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight">Track Your PKR</h1>
              <p className="text-primary-foreground/70 text-sm">Apne kharche track karein</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto px-4 -mt-2 pb-12 space-y-5">
        <ExpenseSummary expenses={expenses} />
        <ExpenseForm onAdd={handleAdd} />
        <ExpenseList expenses={expenses} onDelete={handleDelete} />
      </main>
    </div>
  );
}
