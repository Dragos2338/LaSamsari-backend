using LaSamsari.Domain.Entities;

namespace LaSamsari.Application.Interfaces.Repositories;

public interface ICarRepository
{
    Task<List<Car>> GetAllAsync();
    Task<Car> AddAsync(Car car);

    Task<Car?> GetByIdAsync(int id);
    Task UpdateAsync(Car car);
    Task DeleteAsync(int id);

}
