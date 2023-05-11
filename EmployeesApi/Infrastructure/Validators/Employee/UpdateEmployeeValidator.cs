namespace EmployeesApi.Infrastructure.Validators.Employee;

public class UpdateEmployeeValidator : AbstractValidator<UpdateEmployeeDto>
{
    public UpdateEmployeeValidator()
    {
        RuleFor(e => e.Id)
           .NotEmpty().WithMessage("A valid Employee Id must be informed!")
           .NotNull().WithMessage("A valid Employee Id must be informed!")
           .GreaterThan(0).WithMessage("Employee Id can not be 0!");

        RuleFor(e => e.Name)
           .NotEmpty().WithMessage("Employee Name must be informed!")
           .NotNull().WithMessage("Employee Name must be informed!")
           .Length(3, 70).WithMessage("Employee Name must be between 3 and 70 characters!");

        RuleFor(e => e.Age)
           .NotEmpty().WithMessage("Employee Age must be informed!")
           .NotNull().WithMessage("Employee Age must be informed!")
           .Must(age => age >= 18).WithMessage("Employee Age must be at least 18 years old!")
           .Must(age => age <= 65).WithMessage("Employee Age can't be greater than 65 years old!");
    }
}