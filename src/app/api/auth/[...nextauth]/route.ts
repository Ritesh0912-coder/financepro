import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth-options"

const handler = NextAuth(authOptions)

const combinedHandler = async (req: Request, props: { params: Promise<{ nextauth: string[] }> }) => {
    const params = await props.params;
    return handler(req, { params });
}

export { combinedHandler as GET, combinedHandler as POST }
export const dynamic = "force-dynamic"
export const revalidate = 0
