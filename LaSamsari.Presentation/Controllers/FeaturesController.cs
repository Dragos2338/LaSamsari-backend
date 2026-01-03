using LaSamsari.Application.DTOs.Feature;
using LaSamsari.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LaSamsari.Presentation.Controllers;

[ApiController]
[Route("api/features")]
public class FeaturesController : ControllerBase
{
    private readonly IFeatureService _service;

    public FeaturesController(IFeatureService service)
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
public async Task<IActionResult> Create(CreateFeatureDto dto)
    => Ok(await _service.CreateAsync(dto));

// 🔒 ADMIN – PATCH
[Authorize(Roles = "Admin")]
[HttpPatch("{id}")]
public async Task<IActionResult> Patch(int id, PatchFeatureDto dto)
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
