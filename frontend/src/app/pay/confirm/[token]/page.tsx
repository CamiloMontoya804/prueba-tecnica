import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from 'lucide-react'
import Link from "next/link";

import { confirmPayment } from "@/api/payment.api";
import { formatDate, formatTime } from "@/utils/utils";

interface Payment {
  code: string
  description: string
  amount: number
  status: string
  updated_at: string
}

interface Props {
  params: {
    token: string;
  };
}

async function PaymentConfirmation({ params }: Props) {
  const payment: Payment = await confirmPayment(params.token);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Pago confirmado exitosamente:</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <CheckCircle2 className="text-green-500 w-16 h-16" />
          </div>
          <div className="text-center">
            <Badge variant="secondary" className="text-lg px-3 py-1">
              {payment.status}
            </Badge>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-500">Fecha de pago</p>
            <p className="text-lg font-semibold">{formatDate(payment.updated_at)} {formatTime(payment.updated_at)}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-500">Código de Pago</p>
            <p className="text-lg font-semibold">{payment.code}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-500">Motivo</p>
            <p className="text-lg">Pago</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-500">Monto</p>
            <p className="text-2xl font-bold text-green-600">${(payment.amount || 0).toFixed(2)}</p>
          </div>
          <Link href="/pay" passHref>
            <Button className="w-full">Realizar otro pago</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

export default PaymentConfirmation;
