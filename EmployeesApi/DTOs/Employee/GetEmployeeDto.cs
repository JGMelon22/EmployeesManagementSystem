namespace EmployeesApi.DTOs.Employee;

public record GetEmployeeDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty!;
    public Int16 Age { get; set; }
    public byte Active { get; set; }
}