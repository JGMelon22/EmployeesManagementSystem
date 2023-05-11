namespace EmployeesApi.DTOs.Employee;

public record UpdateEmployeeDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty!;
    public Int16 Age { get; set; }
    public bool Active { get; set; }
}