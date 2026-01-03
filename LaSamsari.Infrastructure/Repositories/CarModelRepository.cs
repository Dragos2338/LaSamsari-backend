using LaSamsari.Application.Interfaces.Repositories;
using LaSamsari.Domain.Entities;
using LaSamsari.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace LaSamsari.Infrastructure.Repositories;




public class CarModelRepository : ICarModelRepository
{
    private readonly AppDbContext _db;

    public CarModelRepository(AppDbContext db)
    {
        _db = db;
    }

    public async Task<List<CarModel>> GetAllAsync()
        => await _db.CarModels
            .Include(x => x.Brand)
            .ToListAsync();

    public async Task<CarModel?> GetByIdAsync(int id)
        => await _db.CarModels.FindAsync(id);

    public async Task AddAsync(CarModel model)
    {
        _db.CarModels.Add(model);
        await _db.SaveChangesAsync();
    }

    public async Task DeleteAsync(CarModel model)
    {
        _db.CarModels.Remove(model);
        await _db.SaveChangesAsync();
    }
}
