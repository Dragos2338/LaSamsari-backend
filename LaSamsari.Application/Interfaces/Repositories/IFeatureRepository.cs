using LaSamsari.Domain.Entities;

namespace LaSamsari.Application.Interfaces.Repositories;

public interface IFeatureRepository
{
    Task<List<Feature>> GetAllAsync();
    Task<Feature> AddAsync(Feature feature);

    Task<Feature?> GetByIdAsync(int id);
    Task UpdateAsync(Feature feature);
    Task DeleteAsync(int id);

}
