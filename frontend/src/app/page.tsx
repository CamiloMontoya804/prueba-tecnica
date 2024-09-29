import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from "next/link"
import { UserPlus } from "lucide-react"

import SkeletonLoader from "@/components/ui/skeleton-loader"
import { getCustomers } from "@/api/customers.api"

interface Client {
  id?: number
  name: string
  email: string
  phone: string
}

export const dynamic = "force-dynamic";

export default async function ClientList() {
  const { data: clients, loading, error } = await getCustomers({});

  // if (loading) return <SkeletonLoader />
  // if (error) return <p>Error: {error.message}</p>;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Lista de Clientes</CardTitle>
        <Link href="/register">
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Registrar Cliente
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Teléfono</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(clients || []).map((client: Client) => (
              <TableRow key={client.id}>
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{client.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}