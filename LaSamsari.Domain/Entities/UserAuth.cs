namespace LaSamsari.Domain.Entities;

public class UserAuth
{
    public int UserProfileId { get; set; }   // PK + FK

    public string Email { get; set; } = null!;
    public string PasswordHash { get; set; } = null!;

    public UserProfile UserProfile { get; set; } = null!;
}
