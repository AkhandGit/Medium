import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'
import { signupInput } from '@akhandnpm/medium-common';

export const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string,
	}
}>();


userRouter.post('/signup', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const {success} = signupInput.safeParse(body);
	if (!success) {
		c.status(411);
		return c.json({ error: "Invalid input" });
	}
	try {
		const user = await prisma.user.create({
			data: {
				email: body.email,
				password: body.password,
				name: body.name
			}
		});
		const jwt = await sign(
			{ 
				id: user.id
			 }, c.env.JWT_SECRET);
		return c.text(jwt);
	} catch(e) {
        // @ts-ignore
    console.log(e);
		c.status(403);
		return c.text("error while signing up");
	}
})



userRouter.post('/api/v1/signin', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const user = await prisma.user.findUnique({
		where: {
			email: body.email,
      password: body.password,
      name: body.name,
		}
	});

	if (!user) {
		c.status(403);
		return c.json({ error: "user not found" });
	}

	const jwt = await sign({ 
    id: user.id },
     c.env.JWT_SECRET);
	return c.json({ jwt });
})