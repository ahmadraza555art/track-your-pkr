import { useState } from "react";
import { CATEGORIES, saveExpense, type Expense } from "@/lib/expense-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { toast } from "sonner";

interface Props {
  onAdd: (expense: Expense) => void;
}

export default function ExpenseForm({ onAdd }: Props) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = Number(amount);
    if (!numAmount || numAmount <= 0) {
      toast.error("Amount daalna zaroori hai");
      return;
    }
    if (!category) {
      toast.error("Category select karein");
      return;
    }
    const expense = saveExpense({
      amount: numAmount,
      category,
      description: description.trim().slice(0, 200),
      date,
    });
    onAdd(expense);
    setAmount("");
    setDescription("");
    setCategory("");
    toast.success("Kharcha add ho gaya! ✅");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-card rounded-xl p-5 shadow-card border border-border/50 space-y-4">
      <h2 className="font-bold text-lg">Naya Kharcha</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="amount">Amount (PKR)</Label>
          <Input
            id="amount"
            type="number"
            placeholder="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min={1}
            max={99999999}
            className="text-lg font-semibold"
          />
        </div>
        <div className="space-y-2">
          <Label>Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Category chunein" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="desc">Description</Label>
          <Input
            id="desc"
            placeholder="Kya kharcha kiya?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={200}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>
      <Button type="submit" className="w-full gradient-primary text-primary-foreground font-semibold">
        <Plus className="w-4 h-4 mr-2" /> Kharcha Add Karein
      </Button>
    </form>
  );
}
