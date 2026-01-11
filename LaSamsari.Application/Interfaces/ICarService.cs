using LaSamsari.Application.DTOs.Car;

namespace LaSamsari.Application.Interfaces;

public interface ICarService
{
    Task<IEnumerable<CarDto>> GetAllAsync();
    Task<IEnumerable<CarDto>> GetMyCarsAsync(int userId);
    Task<CarDto> CreateAsync(CreateCarDto dto, int? userId = null);

    Task<CarDto> PatchAsync(int id, PatchCarDto dto);
    Task DeleteAsync(int id);
}
