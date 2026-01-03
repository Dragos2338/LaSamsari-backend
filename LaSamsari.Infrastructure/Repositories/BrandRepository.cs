using LaSamsari.Application.Interfaces.Repositories;
using LaSamsari.Domain.Entities;
using LaSamsari.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace LaSamsari.Infrastructure.Repositories;

public class BrandRepository : IBrandRepository
{
    private readonly AppDbContext _db;

    public BrandRepository(AppDbContext db)
    {
        _db = db;
    }

    public async Task<List<Brand>> GetAllAsync()
    {
        return await _db.Brands.ToListAsync();
    }

    public async Task<Brand> AddAsync(Brand brand)
    {
        _db.Brands.Add(brand);
        await _db.SaveChangesAsync();
        return brand;
    }


    public async Task<Brand?> GetByIdAsync(int id)
{
    return await _db.Brands.FindAsync(id);
}

public async Task UpdateAsync(Brand brand)
{
    _db.Brands.Update(brand);
    await _db.SaveChangesAsync();
}

public async Task DeleteAsync(int id)
{
    var brand = await _db.Brands.FindAsync(id);
    if (brand != null)
    {
        _db.Brands.Remove(brand);
        await _db.SaveChangesAsync();
    }
}


}
