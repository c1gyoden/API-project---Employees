import express from "express"
import employeesRoutes from "./routes/employee.js"

const app = express()
const port = 3000

app.use(express.json())

app.use("/api/employees", employeesRoutes)
app.use((req, res) => res.json({message: "Page not found"}))

app.listen(port, () => {
    console.log(`Server runs on port ${port}`)
})