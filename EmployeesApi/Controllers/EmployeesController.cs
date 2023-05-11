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
}