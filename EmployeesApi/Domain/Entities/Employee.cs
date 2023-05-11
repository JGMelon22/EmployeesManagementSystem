namespace EmployeesApi.Domain.Entities
{
    public class Employee
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty!;
        public Int16 Age { get; set; }
        public byte Active { get; set; }
    }
}