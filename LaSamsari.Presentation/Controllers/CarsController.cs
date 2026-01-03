using LaSamsari.Application.DTOs.Car;
using LaSamsari.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LaSamsari.Presentation.Controllers;

[ApiController]
[Route("api/cars")]
public class CarsController : ControllerBase
{
    private readonly ICarService _service;

    public CarsController(ICarService service)
    {
        _service = service;
    }

    // 🔓 PUBLIC
[HttpGet]
public async Task<IActionResult> GetAll()
    => Ok(await _service.GetAllAsync());

// 🔒 ADMIN
[Authorize(Roles = "Admin")]
[HttpPost]
public async Task<IActionResult> Create(CreateCarDto dto)
    => Ok(await _service.CreateAsync(dto));

// 🔒 ADMIN – PATCH
[Authorize(Roles = "Admin")]
[HttpPatch("{id}")]
public async Task<IActionResult> Patch(int id, PatchCarDto dto)
    => Ok(await _service.PatchAsync(id, dto));

// 🔒 ADMIN – DELETE
[Authorize(Roles = "Admin")]
[HttpDelete("{id}")]
public async Task<IActionResult> Delete(int id)
{
    await _service.DeleteAsync(id);
    return NoContent();
}

}
