namespace LaSamsari.Application.DTOs.Auth;

using LaSamsari.Domain.Enums;

public class UserResponseDto
{
    public string Email { get; set; } = null!;
    public string Role { get; set; } = null!;
    public string Nume { get; set; } = null!;
    public string Prenume { get; set; } = null!;
}

public class AuthResultDto
{
    public string Token { get; set; } = null!;
    public UserResponseDto User { get; set; } = null!;
}
