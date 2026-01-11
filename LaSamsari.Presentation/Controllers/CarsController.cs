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

    // 🔒 USER / ADMIN
    [Authorize]
    [HttpGet("my-cars")]
    public async Task<IActionResult> GetMyCars()
    {
        var userId = int.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)!.Value);
        return Ok(await _service.GetMyCarsAsync(userId));
    }

    // 🔒 USER / ADMIN
    [Authorize]
    [HttpPost]
    public async Task<IActionResult> Create(CreateCarDto dto)
    {
        int? userId = null;
        var claim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier);
        if (claim != null) userId = int.Parse(claim.Value);

        return Ok(await _service.CreateAsync(dto, userId));
    }

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
