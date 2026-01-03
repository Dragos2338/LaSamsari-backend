using LaSamsari.Application.DTOs.CarModel;
using LaSamsari.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LaSamsari.Presentation.Controllers;


[ApiController]
[Route("api/carmodels")]
public class CarModelController : ControllerBase
{
    private readonly ICarModelService _service;

    public CarModelController(ICarModelService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
        => Ok(await _service.GetAllAsync());

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<IActionResult> Create(CreateCarModelDto dto)
    {
        await _service.CreateAsync(dto);
        return Ok();
    }

    [Authorize(Roles = "Admin")]
    [HttpPatch("{id}")]
    public async Task<IActionResult> Update(int id, UpdateCarModelDto dto)
    {
        await _service.UpdateAsync(id, dto);
        return NoContent();
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _service.DeleteAsync(id);
        return NoContent();
    }
}

