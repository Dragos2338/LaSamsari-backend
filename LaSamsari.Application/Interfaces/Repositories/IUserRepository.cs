using LaSamsari.Domain.Entities;

namespace LaSamsari.Application.Interfaces.Repositories;

public interface IUserRepository
{
    Task<UserProfile?> GetByEmailAsync(string email);
    Task<UserProfile> CreateAsync(UserProfile profile, string passwordHash);
}
