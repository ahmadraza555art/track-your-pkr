import { Expense, formatPKR, CATEGORIES } from "@/lib/expense-store";
import { TrendingDown, Calendar, PieChart } from "lucide-react";

interface Props {
  expenses: Expense[];
}

export default function ExpenseSummary({ expenses }: Props) {
  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);

  const now = new Date();
  const thisMonth = expenses.filter((e) => {
    const d = new Date(e.date);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });
  const monthlyTotal = thisMonth.reduce((sum, e) => sum + e.amount, 0);

  const today = now.toISOString().split("T")[0];
  const todayTotal = expenses
    .filter((e) => e.date === today)
    .reduce((sum, e) => sum + e.amount, 0);

  const topCategory = Object.entries(
    expenses.reduce<Record<string, number>>((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + e.amount;
      return acc;
    }, {})
  ).sort((a, b) => b[1] - a[1])[0];

  const topCat = topCategory
    ? CATEGORIES.find((c) => c.value === topCategory[0])
    : null;

  const stats = [
    {
      label: "Aaj ka Kharcha",
      value: formatPKR(todayTotal),
      icon: Calendar,
      accent: "bg-primary/10 text-primary",
    },
    {
      label: "Is Mahine",
      value: formatPKR(monthlyTotal),
      icon: TrendingDown,
      accent: "bg-destructive/10 text-destructive",
    },
    {
      label: "Total Kharche",
      value: formatPKR(totalExpense),
      icon: PieChart,
      accent: "bg-accent/30 text-accent-foreground",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-card rounded-xl p-5 shadow-card border border-border/50 flex items-center gap-4"
        >
          <div className={`rounded-lg p-2.5 ${stat.accent}`}>
            <stat.icon className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="text-xl font-bold tracking-tight">{stat.value}</p>
          </div>
        </div>
      ))}
      {topCat && (
        <div className="sm:col-span-3 bg-card rounded-xl p-4 shadow-card border border-border/50">
          <p className="text-sm text-muted-foreground">
            Sabse zyada kharcha: <span className="font-semibold text-foreground">{topCat.label}</span>{" "}
            — {formatPKR(topCategory![1])}
          </p>
        </div>
      )}
    </div>
  );
}
