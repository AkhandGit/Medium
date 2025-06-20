import { Hono } from 'hono';

import { sign, verify } from 'hono/jwt'

export const blogRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string,
	}
}>();

blogRouter.use('/api/v1/blog/*', async (c, next) => {
	const header = c.req.header('Authorization') || "";
	const response =await verify(header, c.env.JWT_SECRET);
	if (response.id) {
		next()
	} else {
		c.status(403);
		return c.json({ error: "Unauthorized" });
	}
  await next()
})




blogRouter.post('/api/v1/blog', (c) => {
	return c.text('Hello Hono!')
})

blogRouter.put('/api/v1/blog', (c) => {

	return c.text('Hello Hono!')
})

blogRouter.get('/api/v1/blog/:id', (c) => {
  const id = c.req.param('id')
  //@ts-ignore
	console.log(id);
	return c.text('signin')
})