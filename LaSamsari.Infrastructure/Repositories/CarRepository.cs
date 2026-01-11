using LaSamsari.Application.Interfaces.Repositories;
using LaSamsari.Domain.Entities;
using LaSamsari.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace LaSamsari.Infrastructure.Repositories;

public class CarRepository : ICarRepository
{
    private readonly AppDbContext _db;

    public CarRepository(AppDbContext db)
    {
        _db = db;
    }

    public async Task<List<Car>> GetAllAsync()
    {
        return await _db.Cars
            .Include(c => c.CarModel)
                .ThenInclude(m => m.Brand)
            .Include(c => c.FuelType)
            .Include(c => c.TransmissionType)
            .ToListAsync();
    }

    public async Task<Car> AddAsync(Car car)
    {
        _db.Cars.Add(car);
        await _db.SaveChangesAsync();
        return car;
    }

    public async Task<Car?> GetByIdAsync(int id)
{
    return await _db.Cars
        .Include(c => c.CarModel)
            .ThenInclude(m => m.Brand)
        .Include(c => c.FuelType)
        .Include(c => c.TransmissionType)
        .FirstOrDefaultAsync(c => c.Id == id);
}

    public async Task UpdateAsync(Car car)
    {
        _db.Cars.Update(car);
        await _db.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var car = await _db.Cars.FindAsync(id);
        if (car != null)
        {
            _db.Cars.Remove(car);
            await _db.SaveChangesAsync();
        }
    }



}
