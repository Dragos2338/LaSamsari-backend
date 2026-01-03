using LaSamsari.Domain.Entities;

public interface ICarModelRepository
{
    Task<List<CarModel>> GetAllAsync();
    Task<CarModel?> GetByIdAsync(int id);
    Task AddAsync(CarModel model);
    Task DeleteAsync(CarModel model);
}
