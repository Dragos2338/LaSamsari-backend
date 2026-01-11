using LaSamsari.Application;
using LaSamsari.Domain.Entities;
using LaSamsari.Domain.Enums;
using LaSamsari.Infrastructure;
using LaSamsari.Infrastructure.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// ====================================================
// 1. SERVICES (Configurarea serviciilor)
// ====================================================

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// --- CONFIGURARE CORS (ESENȚIAL PENTRU FRONTEND) ---
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000") // Adresa site-ului tău Next.js
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});
// ---------------------------------------------------

// Adăugăm Layerele aplicației
builder.Services.AddInfrastructure(builder.Configuration);
builder.Services.AddApplication();

// Configurare JWT Authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!))
    };
});

builder.Services.AddAuthorization();

// Configurare Swagger (pentru testare și Auth)
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "La Samsari API", Version = "v1" });

    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Introdu tokenul JWT: Bearer {token}"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

var app = builder.Build();

// ====================================================
// 2. INITIALIZARE BAZĂ DE DATE (Seed Data)
// ====================================================

// Creare automată a bazei de date dacă nu există
// using (var scope = app.Services.CreateScope())
// {
//     var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
//     db.Database.EnsureCreated(); // Asta crează tabelele automat
// }

// Creare automată Admin dacă nu există
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    var adminExists = db.UserProfiles.Any(u => u.Role == UserRole.Admin);

    if (!adminExists)
    {
        var adminProfile = new UserProfile
        {
            Nume = "Admin",
            Prenume = "System",
            Telefon = "0700000000",
            Adresa = "System",
            Role = UserRole.Admin
        };

        var adminAuth = new UserAuth
        {
            Email = "admin@lasamsari.ro",
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin123!"),
            UserProfile = adminProfile
        };

        db.UserProfiles.Add(adminProfile);
        db.UserAuths.Add(adminAuth);

        db.SaveChanges();
    }
}

// Creare automată Brand-uri și Modele dacă nu există
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    if (!db.Brands.Any())
    {
        var brands = new List<Brand>
        {
            new Brand { Name = "BMW", CarModels = new List<CarModel> {
                new CarModel { Name = "Seria 3", LaunchYear = new DateOnly(2019, 1, 1) },
                new CarModel { Name = "Seria 5", LaunchYear = new DateOnly(2020, 1, 1) },
                new CarModel { Name = "X5", LaunchYear = new DateOnly(2021, 1, 1) }
            }},
            new Brand { Name = "Audi", CarModels = new List<CarModel> {
                new CarModel { Name = "A4", LaunchYear = new DateOnly(2018, 1, 1) },
                new CarModel { Name = "A6", LaunchYear = new DateOnly(2019, 1, 1) },
                new CarModel { Name = "Q7", LaunchYear = new DateOnly(2020, 1, 1) }
            }},
            new Brand { Name = "Volkswagen", CarModels = new List<CarModel> {
                new CarModel { Name = "Golf", LaunchYear = new DateOnly(2020, 1, 1) },
                new CarModel { Name = "Passat", LaunchYear = new DateOnly(2019, 1, 1) },
                new CarModel { Name = "Tiguan", LaunchYear = new DateOnly(2021, 1, 1) }
            }},
            new Brand { Name = "Skoda", CarModels = new List<CarModel> {
                new CarModel { Name = "Octavia", LaunchYear = new DateOnly(2020, 1, 1) },
                new CarModel { Name = "Superb", LaunchYear = new DateOnly(2019, 1, 1) },
                new CarModel { Name = "Kodiaq", LaunchYear = new DateOnly(2021, 1, 1) }
            }},
            new Brand { Name = "Mercedes-Benz", CarModels = new List<CarModel> {
                new CarModel { Name = "C-Class", LaunchYear = new DateOnly(2021, 1, 1) },
                new CarModel { Name = "E-Class", LaunchYear = new DateOnly(2020, 1, 1) },
                new CarModel { Name = "GLE", LaunchYear = new DateOnly(2022, 1, 1) }
            }},
            new Brand { Name = "Volvo", CarModels = new List<CarModel> {
                new CarModel { Name = "S60", LaunchYear = new DateOnly(2019, 1, 1) },
                new CarModel { Name = "XC60", LaunchYear = new DateOnly(2020, 1, 1) },
                new CarModel { Name = "XC90", LaunchYear = new DateOnly(2021, 1, 1) }
            }},
            new Brand { Name = "Dacia", CarModels = new List<CarModel> {
                new CarModel { Name = "Logan", LaunchYear = new DateOnly(2021, 1, 1) },
                new CarModel { Name = "Duster", LaunchYear = new DateOnly(2022, 1, 1) },
                new CarModel { Name = "Jogger", LaunchYear = new DateOnly(2023, 1, 1) }
            }},
            new Brand { Name = "Ford", CarModels = new List<CarModel> {
                new CarModel { Name = "Focus", LaunchYear = new DateOnly(2019, 1, 1) },
                new CarModel { Name = "Fiesta", LaunchYear = new DateOnly(2018, 1, 1) },
                new CarModel { Name = "Kuga", LaunchYear = new DateOnly(2020, 1, 1) }
            }}
        };

        db.Brands.AddRange(brands);
        db.SaveChanges();
    }
    }
}

// Creare automată Mașini (pentru a avea date in dashboard)
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    if (!db.Cars.Any())
    {
        // Preluam ID-urile pentru referinta (presupunand ca au fost create mai sus sau exista)
        var bmwSeria3 = db.CarModels.Include(m => m.Brand).FirstOrDefault(m => m.Name == "Seria 3" && m.Brand.Name == "BMW");
        var audiA4 = db.CarModels.Include(m => m.Brand).FirstOrDefault(m => m.Name == "A4" && m.Brand.Name == "Audi");
        var vwGolf = db.CarModels.Include(m => m.Brand).FirstOrDefault(m => m.Name == "Golf" && m.Brand.Name == "Volkswagen");
        
        if (bmwSeria3 != null) {
            db.Cars.Add(new Car {
                CarModelId = bmwSeria3.Id,
                Year = 2019,
                Km = 198000,
                Price = 31000,
                Fuel = "Diesel",
                Transmission = "Automată",
                Status = CarStatus.Available
            });
        }
        
        if (audiA4 != null) {
            db.Cars.Add(new Car {
                CarModelId = audiA4.Id,
                Year = 2020,
                Km = 125000,
                Price = 24500,
                Fuel = "Benzină",
                Transmission = "Automată",
                Status = CarStatus.Available
            });
        }
        
        if (vwGolf != null) {
             db.Cars.Add(new Car {
                CarModelId = vwGolf.Id,
                Year = 2021,
                Km = 45000,
                Price = 19900,
                Fuel = "Hibrid",
                Transmission = "Automată",
                Status = CarStatus.Available
            });
        }

        db.SaveChanges();
    }
}

// ====================================================
// 3. PIPELINE (Ordinea de execuție a cererilor)
// ====================================================

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// --- ACTIVARE CORS (Trebuie să fie înainte de Auth) ---
app.UseCors("AllowFrontend"); 
// -----------------------------------------------------

// app.UseHttpsRedirection(); // Dezactivat pentru dezvoltare locală ca să evităm problemele de certificat SSL (net::ERR_CERT_AUTHORITY_INVALID)

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();