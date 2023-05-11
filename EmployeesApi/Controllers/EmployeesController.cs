using Microsoft.AspNetCore.Mvc;

namespace EmployeesApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EmployeesController : ControllerBase
{
    private readonly IEmployeeRepository _repository;
    public EmployeesController(IEmployeeRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public async Task<IActionResult> Index()
    {
        var employees = await _repository.GetAllEmployees();
        return employees.Data != null
            ? Ok(employees)
            : NoContent();
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Details(int id)
    {
        var employee = await _repository.GetEmployeeById(id);
        return employee.Data != null
            ? Ok(employee)
            : NotFound(employee);
    }

    [HttpPost]
    public async Task<IActionResult> Create(AddEmployeeDto newEmployee)
    {
        if (!ModelState.IsValid)
            return BadRequest();

        await _repository.AddEmployee(newEmployee);
        return Ok("Employee Successfully Added!");
    }

    [HttpPut]
    public async Task<IActionResult> Edit(UpdateEmployeeDto updatedEmployee)
    {
        if (!ModelState.IsValid)
            return BadRequest();

        var employeeToUpdate = await _repository.UpdateEmployee(updatedEmployee);
        return employeeToUpdate.Data != null
        ? Ok(employeeToUpdate)
        : NotFound(employeeToUpdate);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var employeeToDelete = await _repository.RemoveEmployee(id);
        return employeeToDelete.Data != null
        ? Ok(employeeToDelete)
        : NotFound(employeeToDelete);
    }
}