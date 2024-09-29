'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { RechargeForm } from './recharge-form'

export default function RechargeClient() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recarga de Billetera</CardTitle>
      </CardHeader>
      <CardContent>
        <RechargeForm />
      </CardContent>
    </Card>
  )
}