using LaSamsari.Application.Interfaces;
using LaSamsari.Application.Services;
using Microsoft.Extensions.DependencyInjection;

namespace LaSamsari.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddScoped<IBrandService, BrandService>();
        services.AddScoped<ICarService, CarService>();
        services.AddScoped<IFeatureService, FeatureService>();
        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<ICarFeatureService, CarFeatureService>();
        services.AddScoped<ICarModelService, CarModelService>();


        return services;
    }
}
