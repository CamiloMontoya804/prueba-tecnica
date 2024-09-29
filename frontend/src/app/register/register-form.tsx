import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useForm } from 'react-hook-form';

import { createCustomer } from "@/api/customers.api"

interface CustomerData {
  document: string;
  name: string;
  email: string;
  phone: string;
}

export function RegisterForm() {

  const { register, handleSubmit } = useForm<CustomerData>();
  const router = useRouter()
  const { toast } = useToast()

  const onSubmit = handleSubmit(async (data) => {
    try {
      await createCustomer(data);

      toast({
        title: "Cliente registrado",
        description: "El cliente ha sido registrado exitosamente.",
      });
      router.push('/');
      router.refresh();
    } catch (err) {
      console.error("Error al crear el cliente:", err);
      toast({
        title: "Error",
        description: "Hubo un problema al registrar el cliente.",
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
          <Label htmlFor="name">Nombre</Label>
          <Input id="name" { ...register('name') } required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" { ...register('email') } required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Teléfono</Label>
          <Input id="phone" { ...register('phone') } required />
        </div>
      </div>
      <Button type="submit" className="w-full">Registrar Cliente</Button>
    </form>
  )
}