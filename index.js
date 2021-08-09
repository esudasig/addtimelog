import express from 'express';
import projectRoutes from './routes/projects.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use('/projects', projectRoutes);

app.get('/', (req, res) => res.send("Hello from homepage"));

app.listen((process.env.PORT || 4343), () => console.log(`Server Running on port: http://localhost:4343`));
