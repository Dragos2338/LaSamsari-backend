using LaSamsari.Application.Interfaces.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LaSamsari.Presentation.Controllers;

[ApiController]
[Route("api/stats")]
[Authorize(Roles = "Admin")]
public class StatsController : ControllerBase
{
    private readonly ICarRepository _carRepo;
    private readonly IUserRepository _userRepo;

    public StatsController(ICarRepository carRepo, IUserRepository userRepo)
    {
        _carRepo = carRepo;
        _userRepo = userRepo;
    }

    [HttpGet]
    public async Task<IActionResult> GetStats()
    {
        var cars = await _carRepo.GetAllAsync();
        var users = await _userRepo.GetAllAsync();

        var stats = new
        {
            TotalCars = cars.Count,
            TotalUsers = users.Count,
            ActiveListings = cars.Count, // For now, all cars are active
            TotalSalesValue = cars.Sum(c => c.Price)
        };

        return Ok(stats);
    }
}
