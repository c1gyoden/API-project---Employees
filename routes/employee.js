import {Router} from "express"
import * as controller from "../controllers/employeeController.js"

const router = Router()

router.get("/", controller.getAllEmployees)

router.get("/statistics", controller.getStatistics)

router.get("/:id", controller.getEmployeeById)

router.post("/", controller.saveEmployee)

router.delete("/:id", controller.deleteEmployee)

router.put("/:id", controller.updateEmployee)

router.get("/company/:company", controller.getEmployeesByCompany)

router.get("/department/:department", controller.getEmployeesByDepartment)



export default router