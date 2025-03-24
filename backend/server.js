const express = require("express");
const app = express();
const cors = require("cors")
app.use(express.json());
app.use(cors())
const db = require("./models")


const jobsRouter = require("./routes/jobsRoute");
app.use("/jobs", jobsRouter);

const carsRouter = require("./routes/carsRoute");
app.use("/cars", carsRouter);
 
const electronicsRouter = require("./routes/electronicsRoute");
app.use("/electronics", electronicsRouter);

const uploadImagesRouter=require("./routes/uploageImageRoute");
app.use('/upload',uploadImagesRouter);

const productImageRouter=require('./routes/productImageConnectionRoute');
app.use('/productimage',productImageRouter);

const jobsSectorRouter=require("./routes/jobsSectorRoute");
app.use('/jobsSector',jobsSectorRouter)

const registrationRouter=require("./routes/registrationRoute");
app.use('/loginregistration',registrationRouter)

    

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server listening on port 3001")
    })
})
