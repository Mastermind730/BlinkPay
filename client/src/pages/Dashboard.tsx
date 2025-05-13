
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend, Cell } from "recharts";
import { useState } from "react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Calendar, CreditCard, User, BarChart2, TrendingUp, ArrowUpRight } from "lucide-react";

const Dashboard = () => {
  // Sample transaction data
  const [transactions] = useState([
    { id: "T-001", recipient: "Jane Cooper", date: "2025-05-12", amount: 145.00, status: "completed" },
    { id: "T-002", recipient: "Michael Foster", date: "2025-05-11", amount: 80.50, status: "completed" },
    { id: "T-003", recipient: "Demi Wilkinson", date: "2025-05-10", amount: 250.00, status: "completed" },
    { id: "T-004", recipient: "Olivia Martin", date: "2025-05-09", amount: 43.25, status: "pending" },
    { id: "T-005", recipient: "Robert Fox", date: "2025-05-08", amount: 122.75, status: "completed" },
  ]);

  // Sample spending data for chart
  const spendingData = [
    { name: 'May 6', amount: 65 },
    { name: 'May 7', amount: 45 },
    { name: 'May 8', amount: 123 },
    { name: 'May 9', amount: 43 },
    { name: 'May 10', amount: 250 },
    { name: 'May 11', amount: 81 },
    { name: 'May 12', amount: 145 },
  ];

  // Chart configuration
  const chartConfig = {
    primary: {
      label: 'Amount',
      theme: {
        light: '#8b5cf6',
        dark: '#a78bfa',
      }
    },
  };

  return (
    <Layout>
      <div className="container max-w-7xl mx-auto px-4 py-6">
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Payment Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor your transactions and payment activity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Card className="overflow-hidden border-none relative bg-gradient-to-br from-purple-50 to-white dark:from-slate-900 dark:to-slate-800 shadow-md hover:shadow-xl transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent" />
            <CardHeader className="relative pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium">Total Spent</CardTitle>
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <CreditCard className="h-4 w-4 text-primary" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="flex items-baseline">
                <div className="text-2xl font-bold">$641.50</div>
                <div className="ml-2 flex items-center text-sm text-emerald-500 font-medium">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>12%</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">from last week</p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-none relative bg-gradient-to-br from-blue-50 to-white dark:from-slate-900 dark:to-slate-800 shadow-md hover:shadow-xl transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent" />
            <CardHeader className="relative pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium">Recipients</CardTitle>
                <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <User className="h-4 w-4 text-blue-500" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="flex items-baseline">
                <div className="text-2xl font-bold">5</div>
                <div className="ml-2 flex items-center text-sm text-emerald-500 font-medium">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>2 new</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">this week</p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-none relative bg-gradient-to-br from-amber-50 to-white dark:from-slate-900 dark:to-slate-800 shadow-md hover:shadow-xl transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent" />
            <CardHeader className="relative pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium">This Month</CardTitle>
                <div className="h-8 w-8 rounded-full bg-amber-500/10 flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-amber-500" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-2xl font-bold">$1,248.25</div>
              <p className="text-xs text-muted-foreground mt-1">May spending</p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-none relative bg-gradient-to-br from-emerald-50 to-white dark:from-slate-900 dark:to-slate-800 shadow-md hover:shadow-xl transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent" />
            <CardHeader className="relative pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium">Analytics</CardTitle>
                <div className="h-8 w-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-emerald-500" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-2xl font-bold">35%</div>
              <p className="text-xs text-muted-foreground mt-1">Higher than average</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <Card className="col-span-1 lg:col-span-2 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Weekly Spending</span>
              </CardTitle>
              <CardDescription>Your transaction trend for the past 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-80">
                <BarChart data={spendingData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip 
                    wrapperClassName="bg-background/95 backdrop-blur-md shadow-xl border border-border/30 rounded-lg px-3 py-2"
                    labelClassName="font-medium text-foreground"
                  />
                  <Legend />
                  <Bar dataKey="amount" name="Amount ($)" fill="url(#colorGradient)" radius={[6, 6, 0, 0]}>
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={1} />
                        <stop offset="100%" stopColor="var(--color-accent)" stopOpacity={0.8} />
                      </linearGradient>
                    </defs>
                    {spendingData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`}
                        className="hover:opacity-80 cursor-pointer transition-opacity"
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Recent Features Used</CardTitle>
              <CardDescription>Usage of BlinkPay features</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-5">
                <li className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-gradient-to-r from-primary to-primary"></div>
                    <span className="font-medium">Face Scanning</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">12</span>
                    <div className="h-2 w-24 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-primary/80 w-full"></div>
                    </div>
                  </div>
                </li>
                <li className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-gradient-to-r from-accent to-accent"></div>
                    <span className="font-medium">Liveness Detection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">8</span>
                    <div className="h-2 w-24 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-accent to-accent/80 w-3/4"></div>
                    </div>
                  </div>
                </li>
                <li className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-500"></div>
                    <span className="font-medium">Cross-Chain Payments</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">3</span>
                    <div className="h-2 w-24 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-blue-500/80 w-1/3"></div>
                    </div>
                  </div>
                </li>
                <li className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-gradient-to-r from-green-500 to-green-500"></div>
                    <span className="font-medium">Split Payments</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">2</span>
                    <div className="h-2 w-24 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-500 to-green-500/80 w-1/4"></div>
                    </div>
                  </div>
                </li>
                <li className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-500"></div>
                    <span className="font-medium">Voice Commands</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">4</span>
                    <div className="h-2 w-24 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-yellow-500 to-yellow-500/80 w-1/2"></div>
                    </div>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Recent Transactions</CardTitle>
              <CardDescription>
                Your payment history and details
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg overflow-hidden border border-border/30">
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow>
                    <TableHead className="font-medium">ID</TableHead>
                    <TableHead className="font-medium">Recipient</TableHead>
                    <TableHead className="font-medium">Date</TableHead>
                    <TableHead className="text-right font-medium">Amount</TableHead>
                    <TableHead className="font-medium">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id} className="hover:bg-muted/40 transition-colors animate-in slide-in-from-left duration-300">
                      <TableCell className="font-mono text-sm">{transaction.id}</TableCell>
                      <TableCell className="font-medium">{transaction.recipient}</TableCell>
                      <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        ${transaction.amount.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <span 
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            transaction.status === "completed" 
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" 
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                          }`}
                        >
                          {transaction.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="mt-6">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" className="hover:bg-muted/50 transition-colors" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive className="bg-primary/10 hover:bg-primary/20 transition-colors">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" className="hover:bg-muted/50 transition-colors">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" className="hover:bg-muted/50 transition-colors">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" className="hover:bg-muted/50 transition-colors" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;

