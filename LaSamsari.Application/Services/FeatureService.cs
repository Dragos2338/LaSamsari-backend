using LaSamsari.Application.DTOs.Feature;
using LaSamsari.Application.Interfaces;
using LaSamsari.Application.Interfaces.Repositories;
using LaSamsari.Domain.Entities;

namespace LaSamsari.Application.Services;

public class FeatureService : IFeatureService
{
    private readonly IFeatureRepository _featureRepository;

    public FeatureService(IFeatureRepository featureRepository)
    {
        _featureRepository = featureRepository;
    }

    public async Task<IEnumerable<FeatureDto>> GetAllAsync()
    {
        var features = await _featureRepository.GetAllAsync();

        return features.Select(f => new FeatureDto
        {
            Id = f.Id,
            Name = f.Name
        });
    }

    public async Task<FeatureDto> CreateAsync(CreateFeatureDto dto)
    {
        var feature = new Feature { Name = dto.Name };
        var created = await _featureRepository.AddAsync(feature);

        return new FeatureDto
        {
            Id = created.Id,
            Name = created.Name
        };
    }

    public async Task<FeatureDto> PatchAsync(int id, PatchFeatureDto dto)
    {
        var feature = await _featureRepository.GetByIdAsync(id)
            ?? throw new Exception("Feature not found");

        if (dto.Name != null)
            feature.Name = dto.Name;

        await _featureRepository.UpdateAsync(feature);

        return new FeatureDto
        {
            Id = feature.Id,
            Name = feature.Name
        };
    }

    public async Task DeleteAsync(int id)
    {
        await _featureRepository.DeleteAsync(id);
    }


}
