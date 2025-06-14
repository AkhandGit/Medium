import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const app = new Hono<{
	
	Bindings: {
		DATABASE_URL: string;
	}
	
}>()

app.post('/api/v1/signup', async (c) => {
	const prisma = new PrismaClient({
    	datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate())

	const body = await c.req.json();

	await prisma.user.create({
		data: {
			email: c.body('email'),
			password: c.body('password'),
			name: c.body('name'),
			
		},

	return c.text('signup route')
})

app.post('/api/v1/signin', (c) => {
	return c.text('signin route')
})

app.post('/api/v1/blog', (c) => {
	return c.text('Hello Hono!')
})

app.put('/api/v1/blog', (c) => {

	return c.text('Hello Hono!')
})

app.get('/api/v1/blog/:id', (c) => {
  const id = c.req.param('id')
  //@ts-ignore
	console.log(id);
	return c.text('signin route')
})

export default app;
