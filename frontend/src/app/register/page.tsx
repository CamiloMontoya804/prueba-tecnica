'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RegisterForm } from './register-form'

export default function RegisterClient() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Registro de Cliente</CardTitle>
      </CardHeader>
      <CardContent>
        <RegisterForm />
      </CardContent>
    </Card>
  )
}