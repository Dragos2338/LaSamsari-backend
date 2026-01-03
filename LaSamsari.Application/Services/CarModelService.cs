using LaSamsari.Application.DTOs.CarModel;
using LaSamsari.Application.Interfaces;
using LaSamsari.Application.Interfaces.Repositories;
using LaSamsari.Domain.Entities;

public class CarModelService : ICarModelService
{
    private readonly ICarModelRepository _repo;

    public CarModelService(ICarModelRepository repo)
    {
        _repo = repo;
    }

    public async Task<List<CarModelDto>> GetAllAsync()
    {
        var models = await _repo.GetAllAsync();
        return models.Select(m => new CarModelDto
        {
            Id = m.Id,
            Name = m.Name,
            LaunchYear = m.LaunchYear,
            BrandId = m.BrandId
        }).ToList();
    }

    public async Task CreateAsync(CreateCarModelDto dto)
    {
        var model = new CarModel
        {
            Name = dto.Name,
            LaunchYear = dto.LaunchYear,
            BrandId = dto.BrandId
        };

        await _repo.AddAsync(model);
    }

    public async Task UpdateAsync(int id, UpdateCarModelDto dto)
    {
        var model = await _repo.GetByIdAsync(id);
        if (model == null) return;

        if (dto.Name != null)
            model.Name = dto.Name;

        if (dto.LaunchYear.HasValue)
            model.LaunchYear = dto.LaunchYear.Value;
    }

    public async Task DeleteAsync(int id)
    {
        var model = await _repo.GetByIdAsync(id);
        if (model == null) return;

        await _repo.DeleteAsync(model);
    }
}
