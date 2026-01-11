using LaSamsari.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace LaSamsari.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<UserProfile> UserProfiles => Set<UserProfile>();
    public DbSet<UserAuth> UserAuths => Set<UserAuth>();
    public DbSet<Brand> Brands => Set<Brand>();
    public DbSet<CarModel> CarModels => Set<CarModel>();
    public DbSet<Car> Cars => Set<Car>();
    public DbSet<Feature> Features => Set<Feature>();
    public DbSet<CarFeature> CarFeatures => Set<CarFeature>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {

        modelBuilder.Entity<UserAuth>()
        .HasKey(a => a.UserProfileId);


        // UserProfile <-> UserAuth (1-1)
        modelBuilder.Entity<UserProfile>()
            .HasOne(u => u.Auth)
            .WithOne(a => a.UserProfile)
            .HasForeignKey<UserAuth>(a => a.UserProfileId);

        // Brand -> CarModel (1-N)
        modelBuilder.Entity<CarModel>()
        .HasOne(cm => cm.Brand)
        .WithMany(b => b.CarModels)
        .HasForeignKey(cm => cm.BrandId)
        .OnDelete(DeleteBehavior.Restrict);


        // CarModel -> Car (1-N)
        modelBuilder.Entity<Car>()
            .HasOne(c => c.CarModel)
            .WithMany(m => m.Cars)
            .HasForeignKey(c => c.CarModelId);

        // UserProfile -> Car (1-N)
        modelBuilder.Entity<Car>()
            .HasOne(c => c.User)
            .WithMany(u => u.Cars)
            .HasForeignKey(c => c.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        // Car <-> Feature (N-N)
        modelBuilder.Entity<CarFeature>()
            .HasKey(cf => new { cf.CarId, cf.FeatureId });

        modelBuilder.Entity<CarFeature>()
            .HasOne(cf => cf.Car)
            .WithMany(c => c.CarFeatures)
            .HasForeignKey(cf => cf.CarId);

        modelBuilder.Entity<CarFeature>()
            .HasOne(cf => cf.Feature)
            .WithMany(f => f.CarFeatures)
            .HasForeignKey(cf => cf.FeatureId);

        // Email unic
        modelBuilder.Entity<UserAuth>()
            .HasIndex(a => a.Email)
            .IsUnique();
    }
}
