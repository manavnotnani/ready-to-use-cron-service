import * as express from "express";
import MainService from "../../components/cronHandler/cronMain";

const app: express.Application = express();
// const socketHelper = new SocketHelper();

// Middleware.configure(app);

// Routes.init(app);

// Middleware.initErrorHandler(app);

// handlerejection();

app.set("port", process.env.PORT || 3000);

// app.set("secret", process.env.SECRET || "superSecret");

MainService.getEvents();

// grpcServer.initialize();

export default app;
