using LaSamsari.Application.DTOs.Car;

namespace LaSamsari.Application.Interfaces;

public interface ICarService
{
    Task<IEnumerable<CarDto>> GetAllAsync();
    Task<CarDto> CreateAsync(CreateCarDto dto);

    Task<CarDto> PatchAsync(int id, PatchCarDto dto);
    Task DeleteAsync(int id);
}
