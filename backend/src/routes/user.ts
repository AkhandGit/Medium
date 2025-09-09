import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { signupInput } from '@akhandnpm/medium-common';

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string,
  }
}>();

// ---------------- SIGNUP ----------------
userRouter.post('/signup', async (c) => {
	//@ts-ignore
  console.log("Signup route hit"); // <- Add this
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  //@ts-ignore
  console.log("Request body:", body);
  const { success } = signupInput.safeParse(body);//@ts-ignore
  console.log("Zod validation success:", success);
  if (!success) {
    c.status(411);
    return c.json({ error: "Invalid input" });
  }

  try {
    const user = await prisma.user.create({
      data: {
        email: body.username,   // ✅ map frontend username → DB email
        password: body.password,
        name: body.name
      }
    });
	//@ts-ignore
	console.log("User created:", user);

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt });
  } catch (e) {
	//@ts-ignore
    console.error("Error in signup:", e);
    c.status(500);
    return c.json({ error: "Error while signing up" });
  }
});

// ---------------- SIGNIN ----------------
userRouter.post('/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const user = await prisma.user.findUnique({
    where: { email: body.username }   // ✅ map username → email
  });

  if (!user || user.password !== body.password) {
    c.status(403);
    return c.json({ error: "Invalid credentials" });
  }

  const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
  return c.json({ jwt });
});
