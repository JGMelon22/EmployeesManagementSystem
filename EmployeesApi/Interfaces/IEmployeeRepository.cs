namespace EmployeesApi.Interfaces;

public interface IEmployeeRepository
{
    Task<ServiceResponse<List<GetEmployeeDto>>> GetAllEmployees();
    Task<ServiceResponse<GetEmployeeDto>> GetEmployeeById(int id);
    Task AddEmployee(AddEmployeeDto newEmployee);
    Task UpdateEmployee(UpdateEmployeeDto updatedEmployee);
    Task RemoveEmployee(int id);
}