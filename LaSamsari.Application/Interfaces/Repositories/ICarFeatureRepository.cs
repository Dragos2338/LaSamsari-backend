using LaSamsari.Domain.Entities;

public interface ICarFeatureRepository
{
    Task<List<CarFeature>> GetByCarIdAsync(int carId);
    Task AddAsync(CarFeature entity);
    Task DeleteAsync(CarFeature entity);
}
