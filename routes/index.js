import home from "./home";
import api from "./api";
import users from "./users";
import resume from './resume';

export default app => {
  app.use('/', home);
  app.use('/api', api);
  app.use('/users', users);
  app.use('/resume', resume);
}