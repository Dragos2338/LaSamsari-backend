using LaSamsari.Application.Interfaces.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LaSamsari.Presentation.Controllers;

[ApiController]
[Route("api/users")]
[Authorize(Roles = "Admin")]
public class UsersController : ControllerBase
{
    private readonly IUserRepository _userRepo;

    public UsersController(IUserRepository userRepo)
    {
        _userRepo = userRepo;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var users = await _userRepo.GetAllAsync();
        var result = users.Select(u => new
        {
            u.Id,
            u.Nume,
            u.Prenume,
            Email = u.Auth.Email,
            Role = u.Role.ToString(),
            u.Telefon
        });
        return Ok(result);
    }
}
