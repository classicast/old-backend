import path from 'path';
import { readAll } from './label.controller';

const resource = 'label';

export default function route(server) {
  server.get({ path: path.join(resource, '/'), version: '1.0.0' }, readAll);
  // server.get({ path: path.join(resource, '/:id'), version: '1.0.0'}, ctrl.read);
  // server.post({ path: path.join(resource, '/'), version: '1.0.0'}, ctrl.create);
  // server.put({ path: path.join(resource, '/:id'), version: '1.0.0'}, ctrl.update);
  // server.del({ path: path.join(resource, '/:id'), version: '1.0.0'}, ctrl.delete);
}
