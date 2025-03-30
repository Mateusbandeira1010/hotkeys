import { loginUser, registerUser, getProfile, logoutUser, createManageHotkeys, getHotkeys, gethotkeypublic } from '../controllers/userControllers.js';

export default function userRoutes(fastify, options, done) {
  fastify.post('/api/user/login', loginUser);
  fastify.get('/api/user/profile', getProfile);
  fastify.post('/api/user/cad', registerUser);
  fastify.get('/api/user/logout', logoutUser);

  // Corrigi a rota para garantir que bate com o frontend
  fastify.post('/api/user/profile/hotkeys', createManageHotkeys);
  fastify.get('/api/user/profile/hotkeys', getHotkeys);
  fastify.get('/api/hotkeys/public', gethotkeypublic);

  done();
}