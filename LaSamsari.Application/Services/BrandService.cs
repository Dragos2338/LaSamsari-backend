using LaSamsari.Application.DTOs.Brand;
using LaSamsari.Application.Interfaces;
using LaSamsari.Application.Interfaces.Repositories;
using LaSamsari.Domain.Entities;

namespace LaSamsari.Application.Services;

public class BrandService : IBrandService
{
    private readonly IBrandRepository _brandRepository;

    public BrandService(IBrandRepository brandRepository)
    {
        _brandRepository = brandRepository;
    }

    public async Task<IEnumerable<BrandDto>> GetAllAsync()
    {
        var brands = await _brandRepository.GetAllAsync();

        return brands.Select(b => new BrandDto
        {
            Id = b.Id,
            Name = b.Name
        });
    }

    public async Task<BrandDto> CreateAsync(CreateBrandDto dto)
    {
        var brand = new Brand { Name = dto.Name };
        var created = await _brandRepository.AddAsync(brand);

        return new BrandDto
        {
            Id = created.Id,
            Name = created.Name
        };
    }

    public async Task<BrandDto> PatchAsync(int id, PatchBrandDto dto)
{
    var brand = await _brandRepository.GetByIdAsync(id)
        ?? throw new Exception("Brand not found");

    if (dto.Name != null)
        brand.Name = dto.Name;

    await _brandRepository.UpdateAsync(brand);

    return new BrandDto
    {
        Id = brand.Id,
        Name = brand.Name
    };
}

public async Task DeleteAsync(int id)
{
    await _brandRepository.DeleteAsync(id);
}


}
