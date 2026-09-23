import express from "express"
import employeesRoutes from "./routes/employee.js"

const app = express()
const port = 3000

app.use(express.json())

app.use("/api/employees", employeesRoutes)

app.listen(port, () => {
    console.log(`Server runs on port ${port}`)
})