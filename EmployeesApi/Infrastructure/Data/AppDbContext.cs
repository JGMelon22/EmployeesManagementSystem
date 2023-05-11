using EmployeesApi.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace EmployeesApi.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {

    }

    public DbSet<Employee> Employees { get; set; }
}