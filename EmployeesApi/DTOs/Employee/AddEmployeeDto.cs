namespace EmployeesApi.DTOs.Employee;

public record AddEmployeeDto
{
    public string Name { get; set; } = string.Empty!;
    public Int16 Age { get; set; }
    public bool Active { get; set; }
}