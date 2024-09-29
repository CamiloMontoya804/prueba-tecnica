'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import { useForm } from 'react-hook-form';

import { getCustomerBalance } from '@/api/customers.api'
import { formatDate, formatTime } from '@/utils/utils'

interface BalanceData {
  balance: number
  payments: Array<{
    id: number
    updated_at: string
    description: string
    amount: number
  }>
}

interface QueryData {
  document: string;
  phone: string;
}

export default function BalanceCheck() {
  const { register, handleSubmit, reset } = useForm<QueryData>();
  const [balanceData, setBalanceData] = useState<BalanceData>({
    balance: -1,
    payments: []
  })
  const [showBalance, setShowBalance] = useState<boolean>(false)
  const { toast } = useToast()
  
  const onSubmit = handleSubmit(async (data) => {
    try {
      const query = await getCustomerBalance(data);

      if (query && query.balance >= 0) {
        setBalanceData(query);
        setShowBalance(true);
      } else {
        toast({
          title: "Error",
          description: "No existe ningun cliente con ese documento y telefono.",
          variant: "destructive",
        });
        setShowBalance(false);
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Hubo un problema al registrar el cliente.",
        variant: "destructive",
      });
    }
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Consulta de Saldo</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="document">Documento</Label>
                <Input
                  id="document"
                  { ...register('document') }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  { ...register('phone') }
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full">
              Consultar Saldo
            </Button>
          </form>
        </CardContent>
      </Card>
      {showBalance ? (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Saldo Actual</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">${balanceData.balance.toFixed(2)}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Últimos Movimientos</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Hora</TableHead>
                    <TableHead>Motivo</TableHead>
                    <TableHead>Monto</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(balanceData.payments || []).map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>{formatDate(payment.updated_at)}</TableCell>
                      <TableCell>{formatTime(payment.updated_at)}</TableCell>
                      <TableCell>{payment.description}</TableCell>
                      <TableCell className={payment.amount > 0 ? "text-green-600" : "text-red-600"}>
                        ${Math.abs(payment.amount).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      ) : null}
    </div>
  )
}