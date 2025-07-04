'use server'

import { db } from "@/db/drizzle"
import { envelopes, income } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getEnvelopes() {
    return await db.select().from(envelopes);
}

export async function getIncome() {
    const result = await db.select().from(income);
    return result[0] || { amount: '0'};
}

export async function addIncome(amount: number){
    const current  = await getIncome();
    const newAmount = parseFloat(current.amount) + amount;

    if(current.id){
        await db.update(income).set({ amount: newAmount.toString()}).where(eq(income.id, current.id));
    }else{
        await db.insert(income).values({ amount: amount.toString()});
    }

    revalidatePath('/')
}


export async function createEnvelope(name: string){
    await db.insert(envelopes).values({ name, amount: '0'});
    revalidatePath('/');
}


export async function moveToEnvelope(envelopeId:number, amount:number){
    const currentIncome = await getIncome();
    const incomeAmount = parseFloat(currentIncome.amount);

    if(incomeAmount>= amount){
        await db.update(income).set({
            amount: (incomeAmount - amount).toString()
        }).where(eq(income.id, currentIncome.id));

        const envelope = await db.select().from(envelopes).where(eq(envelopes.id, envelopeId));
        const envelopeAmount = parseFloat(envelope[0].amount);

        await db.update(envelopes).set({amount: (envelopeAmount + amount).toString()}).where(eq(envelopes.id,envelopeId));
    }

    revalidatePath('/');
}

export async function spendFromEnvelope(envelopeId: number, amount: number){
    const envelope = await db.select().from(envelopes).where(eq(envelopes.id, envelopeId));
    const envelopeAmount = parseFloat(envelope[0].amount);
    if(envelopeAmount >= amount){
        await db.update(envelopes).set({
            amount: (envelopeAmount - amount).toString()
        }).where(eq(envelopes.id, envelopeId));
    }

    revalidatePath('/');
}
