using LaSamsari.Application.DTOs.CarFeature;
using LaSamsari.Application.Interfaces;
using LaSamsari.Application.Interfaces.Repositories;
using LaSamsari.Domain.Entities;

public class CarFeatureService : ICarFeatureService
{
    private readonly ICarFeatureRepository _repo;

    public CarFeatureService(ICarFeatureRepository repo)
    {
        _repo = repo;
    }

    public async Task<List<CarFeatureDto>> GetByCarIdAsync(int carId)
    {
        var list = await _repo.GetByCarIdAsync(carId);
        return list.Select(cf => new CarFeatureDto
        {
            FeatureId = cf.FeatureId,
            FeatureName = cf.Feature.Name
        }).ToList();
    }

    public async Task AddAsync(AddCarFeatureDto dto)
    {
        var entity = new CarFeature
        {
            CarId = dto.CarId,
            FeatureId = dto.FeatureId
        };

        await _repo.AddAsync(entity);
    }

    public async Task RemoveAsync(AddCarFeatureDto dto)
    {
        var list = await _repo.GetByCarIdAsync(dto.CarId);
        var entity = list.FirstOrDefault(x => x.FeatureId == dto.FeatureId);
        if (entity != null)
            await _repo.DeleteAsync(entity);
    }
}
