import employeeRouter from "@modules/employees/routes/employee.routes";
import serviceRouter from "@modules/services/routes/service.routes";
import sessionsRouter from "@modules/sessions/routes/sessions.routes";
import usersRouter from "@modules/users/routes/users.routes";
import { Router } from "express";

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/employees', employeeRouter);
routes.use('/services', serviceRouter);

routes.get('/', (request, response) => {
 response.json({ message: 'Hello Dev!' });
 return;
});

export default routes;