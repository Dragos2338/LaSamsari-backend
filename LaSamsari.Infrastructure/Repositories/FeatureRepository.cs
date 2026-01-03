using LaSamsari.Application.Interfaces.Repositories;
using LaSamsari.Domain.Entities;
using LaSamsari.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace LaSamsari.Infrastructure.Repositories;

public class FeatureRepository : IFeatureRepository
{
    private readonly AppDbContext _db;

    public FeatureRepository(AppDbContext db)
    {
        _db = db;
    }

    public async Task<List<Feature>> GetAllAsync()
    {
        return await _db.Features.ToListAsync();
    }

    public async Task<Feature> AddAsync(Feature feature)
    {
        _db.Features.Add(feature);
        await _db.SaveChangesAsync();
        return feature;
    }

    public async Task<Feature?> GetByIdAsync(int id)
{
    return await _db.Features.FindAsync(id);
}

    public async Task UpdateAsync(Feature feature)
    {
        _db.Features.Update(feature);
        await _db.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var feature = await _db.Features.FindAsync(id);
        if (feature != null)
        {
            _db.Features.Remove(feature);
            await _db.SaveChangesAsync();
        }
    }

    


}
