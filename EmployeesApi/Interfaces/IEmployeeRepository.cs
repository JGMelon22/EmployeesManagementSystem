namespace EmployeesApi.Interfaces;

public interface IEmployeeRepository
{
    Task<ServiceResponse<List<GetEmployeeDto>>> GetAllEmployees();
    Task<ServiceResponse<GetEmployeeDto>> GetEmployeeById(int id);
    Task AddEmployee(AddEmployeeDto newEmployee);
    Task<ServiceResponse<GetEmployeeDto>> UpdateEmployee(UpdateEmployeeDto updatedEmployee);
    Task<ServiceResponse<List<GetEmployeeDto>>> RemoveEmployee(int id);
}