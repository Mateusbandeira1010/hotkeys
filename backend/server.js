import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import userRoutes from './routes/routes.js';

const fastify = Fastify({ logger: true });

fastify.register(fastifyCors, {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'] 
});

fastify.register(userRoutes);

fastify.get('/api/mensagem', async (request, reply) => {
  return { mensagem: 'Olá sou do backend!' };
});


const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    console.log('Backend rodando em http://localhost:3000');
  } catch (error) {
    fastify.log.error(error); 
    process.exit(1);
  }
};

start();
