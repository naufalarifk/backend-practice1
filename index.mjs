import express from 'express';
import UserRoutes from './users/routes.mjs'

const app = express();

app.use(express.json());

app.use("/user", UserRoutes)

const port = process.env.PORT || 3000;





app.get('/status', (req, res) => {
    const status = {
        'Status': 'Running'
    };
    res.send(status);
})

app.listen(port, () => {
    console.log("Server Listening on PORT:", port);
});

