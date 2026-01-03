using LaSamsari.Domain.Entities;
using LaSamsari.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

public class CarFeatureRepository : ICarFeatureRepository
{
    private readonly AppDbContext _context;

    public CarFeatureRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<CarFeature>> GetByCarIdAsync(int carId)
    {
        return await _context.CarFeatures
            .Where(cf => cf.CarId == carId)
            .Include(cf => cf.Feature)
            .ToListAsync();
    }

    public async Task AddAsync(CarFeature carFeature)
    {
        _context.CarFeatures.Add(carFeature);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(CarFeature carFeature)
    {
        _context.CarFeatures.Remove(carFeature);
        await _context.SaveChangesAsync();
    }
}
