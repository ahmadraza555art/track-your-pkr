import { Expense, formatPKR, getCategoryByValue, deleteExpense } from "@/lib/expense-store";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Props {
  expenses: Expense[];
  onDelete: (id: string) => void;
}

export default function ExpenseList({ expenses, onDelete }: Props) {
  const handleDelete = (id: string) => {
    deleteExpense(id);
    onDelete(id);
    toast.success("Kharcha delete ho gaya");
  };

  if (expenses.length === 0) {
    return (
      <div className="bg-card rounded-xl p-10 shadow-card border border-border/50 text-center">
        <p className="text-4xl mb-3">💸</p>
        <p className="text-muted-foreground font-medium">Koi kharcha nahi hai abhi</p>
        <p className="text-sm text-muted-foreground">Upar form se add karein</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl shadow-card border border-border/50 overflow-hidden">
      <div className="p-4 border-b border-border/50">
        <h2 className="font-bold text-lg">Kharche ({expenses.length})</h2>
      </div>
      <ul className="divide-y divide-border/50">
        {expenses.slice(0, 50).map((expense) => {
          const cat = getCategoryByValue(expense.category);
          return (
            <li
              key={expense.id}
              className="flex items-center gap-4 px-4 py-3.5 hover:bg-muted/50 transition-colors group"
            >
              <span className="text-2xl flex-shrink-0">{cat.label.split(" ")[0]}</span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">
                  {expense.description || cat.label.split(" ").slice(1).join(" ")}
                </p>
                <p className="text-xs text-muted-foreground">
                  {cat.label.split(" ").slice(1).join(" ")} · {new Date(expense.date).toLocaleDateString("en-PK", { day: "numeric", month: "short" })}
                </p>
              </div>
              <span className="font-bold text-sm text-destructive whitespace-nowrap">
                -{formatPKR(expense.amount)}
              </span>
              <button
                onClick={() => handleDelete(expense.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
                aria-label="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
