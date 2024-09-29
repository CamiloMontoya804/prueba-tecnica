import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useForm } from 'react-hook-form';

import { createPayment } from "@/api/payment.api"

interface Payment {
  document: string
  phone: string
  amount: number
}

export function PayForm() {
  const { register, handleSubmit, reset } = useForm<Payment>();
  const { toast } = useToast()

  const onSubmit = handleSubmit(async (data) => {
    try {
      await createPayment(data);

      toast({
        title: "Pago creado exitosamente",
        description: "Pendiente de confirmacion, por favor revise su correo.",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Hubo un problema al realizar el pago.",
        variant: "destructive",
      })
    }
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="document">Documento</Label>
          <Input id="document" { ...register('document') } required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Teléfono</Label>
          <Input id="phone" { ...register('phone') } required />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="amount">Monto</Label>
        <Input id="amount" type="number" step="0.01" { ...register('amount', { valueAsNumber: true }) } required />
      </div>
      <Button type="submit" className="w-full">Pagar</Button>
    </form>
  )
}