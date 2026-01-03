using LaSamsari.Application.DTOs.Auth;
using LaSamsari.Application.Interfaces;
using LaSamsari.Application.Interfaces.Repositories;
using LaSamsari.Domain.Entities;
using LaSamsari.Domain.Enums;

using Microsoft.Extensions.Configuration;

using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace LaSamsari.Application.Services;

public class AuthService : IAuthService
{
    private readonly IUserRepository _repo;
    private readonly IConfiguration _config;

    public AuthService(IUserRepository repo, IConfiguration config)
    {
        _repo = repo;
        _config = config;
    }

    public async Task<AuthResultDto> RegisterAsync(RegisterDto dto)
    {
        var hash = BCrypt.Net.BCrypt.HashPassword(dto.Password);

        var user = new UserProfile
        {
            Nume = dto.Nume,
            Prenume = dto.Prenume,
            Role = UserRole.User,
            Auth = new UserAuth
            {
                Email = dto.Email,
                PasswordHash = hash
            }
        };

        await _repo.CreateAsync(user, hash);
        return GenerateToken(user);
    }

    public async Task<AuthResultDto> LoginAsync(LoginDto dto)
    {
        var user = await _repo.GetByEmailAsync(dto.Email)
            ?? throw new Exception("Invalid credentials");

        if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.Auth.PasswordHash))
            throw new Exception("Invalid credentials");

        return GenerateToken(user);
    }

    private AuthResultDto GenerateToken(UserProfile user)
    {
        var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Auth.Email),
            new Claim(ClaimTypes.Role, user.Role.ToString())
        };

        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));

        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(
                int.Parse(_config["Jwt:ExpiresMinutes"]!)),
            signingCredentials: creds
        );

        return new AuthResultDto
        {
            Token = new JwtSecurityTokenHandler().WriteToken(token)
        };
    }
}