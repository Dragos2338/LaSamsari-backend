using LaSamsari.Domain.Entities;

namespace LaSamsari.Application.Interfaces.Repositories;

public interface IBrandRepository
{
    Task<List<Brand>> GetAllAsync();
    Task<Brand> AddAsync(Brand brand);

    Task<Brand?> GetByIdAsync(int id);
    Task UpdateAsync(Brand brand);
    Task DeleteAsync(int id);

}
