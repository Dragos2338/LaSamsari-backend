using LaSamsari.Application.DTOs.CarFeature;
using LaSamsari.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LaSamsari.Presentation.Controllers;

[ApiController]
[Route("api/car-features")]
public class CarFeatureController : ControllerBase
{
    private readonly ICarFeatureService _service;

    public CarFeatureController(ICarFeatureService service)
    {
        _service = service;
    }

    // Oricine poate vedea features la o masina
    [HttpGet("{carId:int}")]
    public async Task<IActionResult> GetByCarId(int carId)
    {
        var result = await _service.GetByCarIdAsync(carId);
        return Ok(result);
    }

    // Admin only: adauga feature pe o masina
    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<IActionResult> Add([FromBody] AddCarFeatureDto dto)
    {
        await _service.AddAsync(dto);   // ✅ 1 argument
        return Ok();
    }

    // Admin only: scoate feature de pe o masina
    [Authorize(Roles = "Admin")]
    [HttpDelete]
    public async Task<IActionResult> Remove([FromBody] AddCarFeatureDto dto)
    {
        await _service.RemoveAsync(dto);  // ✅ 1 argument
        return NoContent();
    }
}
