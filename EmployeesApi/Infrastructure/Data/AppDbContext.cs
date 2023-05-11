using EmployeesApi.Infrastructure.EntityConfiguration.EmployeeMap;

namespace EmployeesApi.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public DbSet<Employee> Employees { get; set; }
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {

    }

    // Using Employee Configuration to map between MySQL and C# names
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new EmployeeMap());
    }
}