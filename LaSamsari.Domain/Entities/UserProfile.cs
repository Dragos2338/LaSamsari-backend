using LaSamsari.Domain.Enums;

namespace LaSamsari.Domain.Entities;

public class UserProfile
{
    public int Id { get; set; }

    public required string Nume { get; set; } = null!;
    public string Prenume { get; set; } = null!;
    public string? Telefon { get; set; } = null!;
    public string? Adresa { get; set; } = null!;

    public UserRole Role { get; set; }

    // navigare 1-1
    public UserAuth Auth { get; set; } = null!;
}
