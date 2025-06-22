'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatPrice } from "@/utils"
import { useState } from "react"

const currentYear = new Date().getFullYear()
const years = Array.from({ length: 5 }, (_, i) => (currentYear + 1 - i).toString())
const months = [
  { value: 'all', label: 'All months' },
  { value: '1', label: 'January' },
  { value: '2', label: 'February' },
  { value: '3', label: 'March' },
  { value: '4', label: 'April' },
  { value: '5', label: 'May' },
  { value: '6', label: 'June' },
  { value: '7', label: 'July' },
  { value: '8', label: 'August' },
  { value: '9', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' }
]

const spendTypes = [
  { value: 'all', label: 'All spend' },
  { value: 'campaigns', label: 'Campaign spend' },
  { value: 'services', label: 'Services' }
]

export default function BillingPage() {
  const [selectedSpendType, setSelectedSpendType] = useState('all')
  const [selectedYear, setSelectedYear] = useState(years[0])
  const [selectedMonth, setSelectedMonth] = useState('all')

  // TODO: Replace with real data and add API integration
  const totalSpend = 15000
  const totalPending = 2500
  const balance = 7500
  const transactions = []

  // Filter transactions based on selected filters
  const filteredTransactions = transactions.filter(transaction => {
    const matchesType = selectedSpendType === 'all' || transaction?.type === selectedSpendType
    const matchesYear = transaction?.date?.includes(selectedYear)
    const matchesMonth = selectedMonth === 'all' || transaction?.date?.includes(`-${selectedMonth}-`)
    return matchesType && matchesYear && matchesMonth
  })

  return (
    <div className="container py-8 space-y-8">
      <h1 className="text-2xl font-semibold text-white">Billing</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
        <Card className="p-4 bg-transparent border-[0.5px] border-[#e9e9e9]/60 md:pr-0 md:border-0  rounded-md md:rounded-none  md:shadow-none gap-2">
          <p className="text-[#e9e9e9] font-normal">Total Spend ({selectedYear})</p>
          <p className="text-2xl font-semibold text-white mt-1">{formatPrice(totalSpend)}</p>
        </Card>

        <Card className="p-4 bg-transparent border-[0.5px] border-[#e9e9e9]/60 md:pr-0 md:border-0   rounded-md md:rounded-none md:shadow-none gap-2">
          <p className="text-[#e9e9e9] font-normal">Total Pending ({selectedYear})</p>
          <p className="text-2xl font-semibold text-white mt-1">{formatPrice(totalPending)}</p>
        </Card>

        <Card className="p-4 bg-transparent border-[0.5px] border-[#e9e9e9]/60 md:pr-0 md:border-0   rounded-md md:rounded-none md:shadow-none gap-2">
          <div className="flex items-center gap-2">
            <p className="text-[#e9e9e9] font-normal text-base ">Balance</p>
            <Button variant="link" className="text-primary p-0 h-auto text-sm font-light">
              Add funds
            </Button>
          </div>
          <p className="text-2xl font-semibold text-white mt-1">{formatPrice(balance)}</p>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 sm:gap-4">
        <Select value={selectedSpendType} onValueChange={setSelectedSpendType}>
          <SelectTrigger className="w-fit bg-transparent rounded-full border-[0.5px] border-[#CDCDCD] text-[#e9e9e9]">
            <SelectValue placeholder="Select spend type" />
          </SelectTrigger>
          <SelectContent>
            {spendTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-fit bg-transparent rounded-full border-[0.5px] border-[#CDCDCD] text-[#e9e9e9]">
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
          <SelectTrigger className="w-fit border-[0.5px] border-[#CDCDCD] bg-transparent rounded-full text-[#e9e9e9]">
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent>
            {months.map((month) => (
              <SelectItem key={month.value} value={month.value}>
                {month.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Transactions Table */}
      <div className="rounded-md border-0">
        <Table>
          <TableHeader className="border-0 border-b-0">
            <TableRow className="border-0 hover:bg-transparent">
             { ["Date","Details","Status","Amount"].map(item=> <TableHead className={`text-neutral-white font-medium text-base ${item=="Amount" && "text-right"}`} key={item}>{item}</TableHead>)}

            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={4}
                  className="h-24 text-center text-neutral-400"
                >
                  You have no payments for the time period selected
                </TableCell>
              </TableRow>
            ) : (
              filteredTransactions.map((transaction) => (
                <TableRow
                  key={transaction.id}
                  className="border-0"
                >
                  <TableCell className="font-medium">
                    {transaction.date}
                  </TableCell>
                  <TableCell>{transaction.details}</TableCell>
                  <TableCell>{transaction.status}</TableCell>
                  <TableCell className="text-right">
                    {formatPrice(transaction.amount)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
