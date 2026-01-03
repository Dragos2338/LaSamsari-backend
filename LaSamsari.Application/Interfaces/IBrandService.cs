using LaSamsari.Application.DTOs.Brand;

namespace LaSamsari.Application.Interfaces;

public interface IBrandService
{
    Task<IEnumerable<BrandDto>> GetAllAsync();
    Task<BrandDto> CreateAsync(CreateBrandDto dto);

    Task<BrandDto> PatchAsync(int id, PatchBrandDto dto);
    Task DeleteAsync(int id);

}
