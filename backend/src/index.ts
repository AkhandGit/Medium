import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'

type Variables = {
  userId: string
}

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string,
  },
  Variables: Variables
}>()

app.get('/', (c) => c.text('API is running 🚀'))

app.use('/api/v1/blog/*', async (c, next) => {
  const header = c.req.header('Authorization') || ''
  const token = header.replace('Bearer ', '')
  try {
    const payload = await verify(token, c.env.JWT_SECRET)
    if (payload && payload.id) {
      c.set('userId', String(payload.id))
      return await next()
    }
  } catch (err) {
    // fall through
  }
  c.status(403)
  return c.json({ error: 'Unauthorized' })
})


app.post('/api/v1/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json()
  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
    })
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET)
    return c.json({ jwt })
  } catch (e) {
    c.status(403)
    return c.json({ error: 'Error while signing up' })
  }
})


app.post('/api/v1/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json()
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  })

  if (!user) {
    c.status(403)
    return c.json({ error: 'User not found' })
  }

  const jwt = await sign({ id: user.id }, c.env.JWT_SECRET)
  return c.json({ jwt })
})


app.post('/api/v1/blog', (c) => {
  const userId = c.get('userId')
  return c.json({ message: `Blog created by user ${userId}` })
})

app.put('/api/v1/blog', (c) => {
  const userId = c.get('userId')
  return c.json({ message: `Blog updated by user ${userId}` })
})

app.get('/api/v1/blog/:id', (c) => {
  const blogId = c.req.param('id')
  const userId = c.get('userId')
  return c.json({ message: `Blog ${blogId} accessed by user ${userId}` })
})

export default app
