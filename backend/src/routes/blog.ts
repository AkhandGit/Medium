import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'

export const blogRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string,
	},
	Variables: {
		userId: string
	}
}>();

blogRouter.use('/*', async (c, next) => {
	const header = c.req.header('Authorization') || "";
	const response =await verify(header, c.env.JWT_SECRET);
	if (response.id) {
		c.set("userId", String(response.id));
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
	const authorId = c.get("userId");
	
	try {
		const post = await prisma.post.create({
			data: {
				title: body.title,
				content: body.content,
				authorId: authorId,
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

blogRouter.get('/',async (c) => {
  const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const id = c.req.param("id");
	try {
		const post = await prisma.post.findFirst({
			where: {
				id: id
			}
		});

		return c.json({
			post
			
		}); 
	} catch (error) {
		c.status(500);
		return c.json({ error: "Internal Server " });
	}
})

blogRouter.put('/bulk',async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const post = await prisma.post.findFirst();

	return c.json({
		post
	});
})