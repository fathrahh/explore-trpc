import type { AppRouter } from "../server/server";
import { createTRPCProxyClient,httpBatchLink } from "@trpc/client";

async function main(){
    const trpc = createTRPCProxyClient<AppRouter>({
        links: [
            httpBatchLink({
                url: 'http://localhost:4000/trpc'
            })
        ]
    })
    
    const user = await trpc.userById.query('1');
    console.log(user)
}


main()

