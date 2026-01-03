using LaSamsari.Application.Interfaces.Repositories;
using LaSamsari.Domain.Entities;
using LaSamsari.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace LaSamsari.Infrastructure.Repositories;

public class UserRepository : IUserRepository
{
    private readonly AppDbContext _db;

    public UserRepository(AppDbContext db)
    {
        _db = db;
    }

    public async Task<UserProfile?> GetByEmailAsync(string email)
    {
        return await _db.UserProfiles
            .Include(u => u.Auth)
            .FirstOrDefaultAsync(u => u.Auth.Email == email);
    }

    public async Task<UserProfile> CreateAsync(UserProfile profile, string passwordHash)
    {
        profile.Auth = new UserAuth
        {
            Email = profile.Auth.Email,
            PasswordHash = passwordHash
        };

        _db.UserProfiles.Add(profile);
        await _db.SaveChangesAsync();
        return profile;
    }
}
