import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'

export const blogRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string,
	}
}>();

blogRouter.use('/*', async (c, next) => {
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




blogRouter.post('/', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	try {
		const post = await prisma.post.create({
			data: {
				title: body.title,
				content: body.content,
				authorId: '1'
			}
		});

		return c.json({
			id: post.id,
			
		});
	} catch (error) {
		c.status(500);
		return c.json({ error: "Internal Server Error" });
	}
})

blogRouter.put('/', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	try {
		const post = await prisma.post.update({
			where: {
				id: body.id
			},
			data: {
				title: body.title,
				content: body.content,
				
			}
		});

		return c.json({
			id: post.id,
			
		});
	} catch (error) {
		c.status(500);
		return c.json({ error: "Internal Server Error" });
	}

})

blogRouter.get('/', (c) => {
  const id = c.req.param('id')
  //@ts-ignore
	console.log(id);
	return c.text('signin')
})

blogRouter.put('/bulk', (c) => {

	return c.text('Hello Hono!')
})