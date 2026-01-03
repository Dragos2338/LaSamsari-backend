using LaSamsari.Application.Interfaces.Repositories;
using LaSamsari.Infrastructure.Data;
using LaSamsari.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace LaSamsari.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        // DbContext
        services.AddDbContext<AppDbContext>(options =>
            options.UseNpgsql(configuration.GetConnectionString("Postgres")));

        // Repositories
        services.AddScoped<IBrandRepository, BrandRepository>();
        // services.AddScoped<ICarRepository, CarRepository>();
        // services.AddScoped<IFeatureRepository, FeatureRepository>();

        services.AddScoped<ICarRepository, CarRepository>();
        services.AddScoped<IFeatureRepository, FeatureRepository>();
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<ICarFeatureRepository, CarFeatureRepository>();
        services.AddScoped<ICarModelRepository, CarModelRepository>();


        return services;
    }
}
