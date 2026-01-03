namespace LaSamsari.Application.DTOs.Auth;

public class RegisterDto
{
    public string Email { get; set; } = null!;
    public string Password { get; set; } = null!;
    public string Nume { get; set; } = null!;
    public string Prenume { get; set; } = null!;
}
