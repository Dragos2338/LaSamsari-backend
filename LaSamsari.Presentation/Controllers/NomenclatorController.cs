using LaSamsari.Domain.Entities;
using LaSamsari.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LaSamsari.Presentation.Controllers;

[ApiController]
[Route("api/nomenclators")]
public class NomenclatorController : ControllerBase
{
    private readonly AppDbContext _db;

    public NomenclatorController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet("fuels")]
    public async Task<ActionResult<IEnumerable<FuelType>>> GetFuels()
    {
        return await _db.FuelTypes.ToListAsync();
    }

    [HttpGet("transmissions")]
    public async Task<ActionResult<IEnumerable<TransmissionType>>> GetTransmissions()
    {
        return await _db.TransmissionTypes.ToListAsync();
    }
}
