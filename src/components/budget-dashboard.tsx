'use client';

import { addIncome, createEnvelope, moveToEnvelope, spendFromEnvelope } from "@/actions/budget";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";



interface Envelope{
    id:number;
    name: string;
    amount: string;
}

interface BudgetDashboardProps {
    envelopes: Envelope[];
    income: {
        amount: string;
    }
}

const BudgetDashboard = ({envelopes, income}: BudgetDashboardProps) => {
    const [ incomeAmount, setIncomeAmount] = useState('');
    const [ envelopeName, setEnvelopeName] = useState('');
    const [ moveAmount, setMoveAmount] = useState('');
    const [ spendAmount, setSpendAmount ] = useState('');
     const [ selectedEnvelope, setSelectedEnvelope ] = useState<number | null>(null);

    const handleAddIncome = async () => {
        if(incomeAmount){
            await addIncome(parseFloat(incomeAmount));
            setIncomeAmount('');
        }
    }

    const handleCreateEnvelope = async () => {
        if(envelopeName){
            await createEnvelope(envelopeName);
            setEnvelopeName('');
        }
    }

    const handleMoveToEnvelope = async () => {
        if(selectedEnvelope && moveAmount){
            await moveToEnvelope(selectedEnvelope, parseFloat(moveAmount));
            setMoveAmount('');
            setSelectedEnvelope(null);
        }
    }
    const handleSpendFromEnvelope = async () => {
        if(selectedEnvelope && spendAmount){
            await spendFromEnvelope(selectedEnvelope, parseFloat(spendAmount));
            setSpendAmount('');
            setSelectedEnvelope(null);
        }
    }
  return (
    <div className="space-y-6">
        <Card>
            <CardHeader>
                <CardTitle>Available Income:${income.amount}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex gap-2">
                    <Input type="number" placeholder="Add income amount" value={incomeAmount}
                        onChange={(e) => setIncomeAmount(e.target.value)}
                    />
                    <Button onClick={handleAddIncome}> Add Income</Button>
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Create New Envelope</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex gap-2">
                    <Input  placeholder="Envelope name" value={envelopeName}
                        onChange={(e) => setEnvelopeName(e.target.value)}
                    />
                    <Button onClick={handleCreateEnvelope}> Create  Envelope</Button>
                </div>
            </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {envelopes.map((envelope) => (
                <Card key={envelope.id}>
                    <CardHeader>
                        <CardTitle>
                            {envelope.name}
                        </CardTitle>
                        <p className="text-2xl font-bold text-green-600">${envelope.amount}</p>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <Button 
                            variant='outline'
                            className="w-full"
                            onClick={()=>setSelectedEnvelope(envelope.id)}>
                                Select for Action
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
        {selectedEnvelope && (
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Envelopes Actions
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                           <div className="flex gap-2">
                                <Input
                                    type="number"
                                    placeholder="Amount to move"
                                    value={moveAmount}
                                    onChange={(e) => setMoveAmount(e.target.value)}
                                />
                                <Button onClick={handleMoveToEnvelope}>
                                    Move from Income
                                </Button>
                           </div>
                           <div className="flex gap-2">
                                <Input
                                    type="number"
                                    placeholder="Amount to spend"
                                    value={spendAmount}
                                    onChange={(e) => setSpendAmount(e.target.value)}
                                />
                                <Button onClick={handleSpendFromEnvelope} variant='destructive'>
                                    Spend From Envelope
                                </Button>
                           </div>
                        </div>
                    </CardContent>
                </Card>
            )}
    </div>
  )
}

export default BudgetDashboard
