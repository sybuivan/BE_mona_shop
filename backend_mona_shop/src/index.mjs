import express from 'express';
import initAPIRoute from './route/userApi.js'

var app = express();
app.use(express.json());


app.use((req, res, next) => {
    //check => return res.send()
    console.log('>>> run into my middleware')
    console.log(req.method)
    next();
})

// init api route
initAPIRoute(app);

const port= 8080;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
