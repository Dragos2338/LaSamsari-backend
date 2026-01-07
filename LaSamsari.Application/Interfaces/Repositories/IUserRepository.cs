using LaSamsari.Domain.Entities;

namespace LaSamsari.Application.Interfaces.Repositories;

public interface IUserRepository
{
    Task<UserProfile?> GetByEmailAsync(string email);
    Task<List<UserProfile>> GetAllAsync();
    Task<UserProfile> CreateAsync(UserProfile profile, string passwordHash);
}
