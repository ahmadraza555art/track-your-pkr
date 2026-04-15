export interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  createdAt: string;
}

const STORAGE_KEY = "pkr-expenses";

export const CATEGORIES = [
  { value: "food", label: "🍔 Khaana", color: "hsl(25, 80%, 55%)" },
  { value: "transport", label: "🚗 Transport", color: "hsl(210, 70%, 50%)" },
  { value: "shopping", label: "🛍️ Shopping", color: "hsl(300, 60%, 50%)" },
  { value: "bills", label: "💡 Bills", color: "hsl(45, 85%, 50%)" },
  { value: "health", label: "🏥 Health", color: "hsl(0, 65%, 55%)" },
  { value: "education", label: "📚 Education", color: "hsl(190, 70%, 45%)" },
  { value: "entertainment", label: "🎬 Entertainment", color: "hsl(270, 60%, 55%)" },
  { value: "other", label: "📦 Other", color: "hsl(160, 30%, 45%)" },
];

export function getExpenses(): Expense[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveExpense(expense: Omit<Expense, "id" | "createdAt">): Expense {
  const expenses = getExpenses();
  const newExpense: Expense = {
    ...expense,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  expenses.unshift(newExpense);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  return newExpense;
}

export function deleteExpense(id: string): void {
  const expenses = getExpenses().filter((e) => e.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
}

export function formatPKR(amount: number): string {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getCategoryByValue(value: string) {
  return CATEGORIES.find((c) => c.value === value) || CATEGORIES[CATEGORIES.length - 1];
}
