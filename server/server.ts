import { inferAsyncReturnType,initTRPC } from "@trpc/server";
import express from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import { z } from "zod";

interface User{
    id: string;
    name:string;
}

const userList: User[] = [
    {
        id: '1',
        name: 'fathur'
    }
];

const createContext = ({
    req,
    res
} : trpcExpress.CreateExpressContextOptions) => ({})

type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();

const appRouter = t.router({
    userById: t.procedure
        .input((val: unknown) =>{
            if(typeof val === "string") return val;
            throw new Error(`invalid input: ${typeof val}`)
        })
        .query((req)=>{
            const { input } = req;

            const user = userList.find((u) => u.id === input);
            return user;
        }),
    userCreate: t.procedure
        .input(z.object({name: z.string()}))
        .query((req)=>{
            const id = `${Math.random()}`;
            const user: User = {
                id,
                name: req.input.name
            }
            userList.push(user);
            return user;
        })
})

const app = express()

app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext,
    })
)

app.listen(4000)
export type AppRouter = typeof appRouter