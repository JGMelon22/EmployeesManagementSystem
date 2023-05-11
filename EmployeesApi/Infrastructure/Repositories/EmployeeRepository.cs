using Dapper;

namespace EmployeesApi.Infrastructure.Repositories;

public class EmployeeRepository : IEmployeeRepository
{
    private readonly IDbConnection _dbConnection;
    private readonly AppDbContext _dbContext;
    private readonly IMapper _mapper;

    public EmployeeRepository(IDbConnection dbConnection, AppDbContext dbContext, IMapper mapper)
    {
        _dbConnection = dbConnection;
        _dbContext = dbContext;
        _mapper = mapper;
    }

    public async Task AddEmployee(AddEmployeeDto newEmployee)
    {
        var insertEmployeeQuery = @"INSERT INTO employees(name, age, active)
                                    VALUES(@Name, @Age, @Active);";

        _dbConnection.Open();

        var customer = _mapper.Map<Employee>(newEmployee);

        await _dbConnection.ExecuteAsync(insertEmployeeQuery, new
        {
            Name = customer.Name,
            Age = customer.Age,
            Active = customer.Active
        });

        _dbConnection.Close();
    }

    public async Task<ServiceResponse<List<GetEmployeeDto>>> GetAllEmployees()
    {
        var serviceResponse = new ServiceResponse<List<GetEmployeeDto>>();

        var employees = await _dbContext.Employees.AsNoTracking().ToListAsync();

        serviceResponse.Data = employees.Select(x => _mapper.Map<GetEmployeeDto>(x)).ToList();

        return serviceResponse;
    }

    // Compiled Query
    private static readonly Func<AppDbContext, int, Task<Employee>> SingleEmployeeAsync =
        EF.CompileAsyncQuery(
            (AppDbContext context, int id) => context
            .Employees.FirstOrDefault(x => x.Id == id));
    public async Task<ServiceResponse<GetEmployeeDto>> GetEmployeeById(int id)
    {
        var serviceResponse = new ServiceResponse<GetEmployeeDto>();

        try
        {
            var employee = await SingleEmployeeAsync(_dbContext, id);

            if (employee == null)
                throw new Exception("Employee not found!");

            serviceResponse.Data = _mapper.Map<GetEmployeeDto>(employee);
        }
        catch (Exception ex)
        {
            serviceResponse.Success = false;
            serviceResponse.Message = ex.Message;
        }

        return serviceResponse;
    }

    public async Task<ServiceResponse<List<GetEmployeeDto>>> RemoveEmployee(int id)
    {
        var serviceResponse = new ServiceResponse<List<GetEmployeeDto>>();

        var findEmployeeQuery = @"SELECT id,
                                         name,
                                         age, 
                                         active
                                  FROM employees
                                  WHERE id = @Id ;";

        var removeEmployeeQuery = @"DELETE 
                                   FROM employees
                                   WHERE id=@Id;";

        try
        {
            _dbConnection.Open();

            var employee = await _dbConnection.QueryFirstOrDefaultAsync<Employee>(findEmployeeQuery, new { Id = id });

            if (employee == null)
            {
                _dbConnection.Close();
                throw new Exception("Employee not found!");
            }

            await _dbConnection.ExecuteAsync(removeEmployeeQuery, new { Id = id });

            _dbConnection.Close();

            serviceResponse.Data = await _dbContext.Employees.Select(x => _mapper.Map<GetEmployeeDto>(x)).ToListAsync(); // Aqui
        }
        catch (Exception ex)
        {
            serviceResponse.Success = false;
            serviceResponse.Message = ex.Message;
        }

        return serviceResponse;
    }

    public async Task<ServiceResponse<GetEmployeeDto>> UpdateEmployee(UpdateEmployeeDto updatedEmployee)
    {
        var serviceResponse = new ServiceResponse<GetEmployeeDto>();

        var findEmployeeQuery = @"SELECT id,
                                         name,
                                         age, 
                                         active
                                  FROM employees
                                  WHERE id = @Id;";

        var updateEmployeeQuery = @"UPDATE employees
                                    SET name = @Name,
                                        age = @Age,
                                        active = @Active
                                    WHERE id = @Id;";

        try
        {
            _dbConnection.Open();

            var employee = await _dbConnection.QueryFirstOrDefaultAsync<Employee>(findEmployeeQuery, new { Id = updatedEmployee.Id });

            if (employee == null)
            {
                _dbConnection.Close();
                throw new Exception("Employee not found!");
            }

            _mapper.Map(updatedEmployee, employee);

            await _dbConnection.ExecuteAsync(updateEmployeeQuery, new
            {
                Name = updatedEmployee.Name,
                Age = updatedEmployee.Age,
                Active = updatedEmployee.Active,
                Id = updatedEmployee.Id
            });

            _dbConnection.Close();

            serviceResponse.Data = _mapper.Map<GetEmployeeDto>(employee);
        }
        catch (Exception ex)
        {
            serviceResponse.Success = false;
            serviceResponse.Message = ex.Message;
        }

        return serviceResponse;
    }
}