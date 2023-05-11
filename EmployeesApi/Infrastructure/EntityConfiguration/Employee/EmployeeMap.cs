namespace EmployeesApi.Infrastructure.EntityConfiguration.EmployeeMap;

public class EmployeeMap : IEntityTypeConfiguration<Employee>
{
    public void Configure(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<Employee> builder)
    {
        builder.ToTable("employees");

        builder.HasKey(e => e.Id);

        builder.Property(e => e.Id)
            .HasColumnType("INT")
            .HasColumnName("id")
            .ValueGeneratedOnAdd();

        builder.HasIndex(e => e.Id);

        builder.Property(e => e.Name)
            .HasColumnType("VARCHAR")
            .HasColumnName("name")
            .IsRequired()
            .HasMaxLength(70);

        builder.Property(e => e.Age)
            .HasColumnType("SMALLINT")
            .HasColumnName("age")
            .IsRequired()
            .IsRequired();

        builder.Property(e => e.Active)
            .HasColumnType("BIT")
            .HasColumnName("active")
            .HasDefaultValue(0);
    }
}