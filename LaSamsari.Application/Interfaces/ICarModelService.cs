using LaSamsari.Application.DTOs.CarModel;

public interface ICarModelService
{
    Task<List<CarModelDto>> GetAllAsync();
    Task CreateAsync(CreateCarModelDto dto);
    Task UpdateAsync(int id, UpdateCarModelDto dto);
    Task DeleteAsync(int id);
}
