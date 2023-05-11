using System.Data;
using EmployeesApi.Infrastructure.Repositories;
using EmployeesApi.Infrastructure.Validators.Employee;
using Microsoft.EntityFrameworkCore;
using MySql.Data.MySqlClient;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Adding CORS service
builder.Services.AddCors();

// AutoMapper
builder.Services.AddAutoMapper(typeof(Program).Assembly);

// FluentValidation
builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddScoped<IValidator<AddEmployeeDto>, AddEmployeeValidator>();
builder.Services.AddScoped<IValidator<UpdateEmployeeDto>, UpdateEmployeeValidator>();

// MySQL Data
builder.Services.AddScoped<IDbConnection>(x =>
    new MySqlConnection(builder.Configuration.GetConnectionString("Default")));

// DbContext
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySQL(builder.Configuration.GetConnectionString("Default")));

// Repository and Interface 
builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Adding CORS 
app.UseCors(c =>
{
    c.WithOrigins("http://localhost:3000");
    c.AllowAnyHeader();
    c.AllowAnyMethod();
});

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
