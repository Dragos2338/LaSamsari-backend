using LaSamsari.Application.DTOs.Feature;

namespace LaSamsari.Application.Interfaces;

public interface IFeatureService
{
    Task<IEnumerable<FeatureDto>> GetAllAsync();
    Task<FeatureDto> CreateAsync(CreateFeatureDto dto);
    Task<FeatureDto> PatchAsync(int id, PatchFeatureDto dto);
    Task DeleteAsync(int id);

}
