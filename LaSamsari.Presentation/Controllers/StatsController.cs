using LaSamsari.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LaSamsari.Presentation.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StatsController : ControllerBase
{
    private readonly AppDbContext _context;

    public StatsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetStats()
    {
        var totalUsers = await _context.UserProfiles.CountAsync();
        var totalCars = await _context.Cars.CountAsync();
        var totalInventoryValue = await _context.Cars
            .Where(c => c.Status == Domain.Entities.CarStatus.Available)
            .SumAsync(c => c.Price);
        
        // Calculăm distribuția pe brand-uri
        var carsByBrand = await _context.Cars
            .Include(c => c.CarModel)
            .ThenInclude(m => m.Brand)
            .GroupBy(c => c.CarModel.Brand.Name)
            .Select(g => new { Brand = g.Key, Count = g.Count() })
            .ToListAsync();

        return Ok(new
        {
            TotalUsers = totalUsers,
            TotalCars = totalCars,
            TotalInventoryValue = totalInventoryValue,
            CarsByBrand = carsByBrand
        });
    }
}
