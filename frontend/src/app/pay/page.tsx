'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { PayForm } from './pay-form'

export default function PayClient() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Realizar pago</CardTitle>
      </CardHeader>
      <CardContent>
        <PayForm />
      </CardContent>
    </Card>
  )
}