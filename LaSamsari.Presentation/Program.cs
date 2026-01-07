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
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated(); // Asta crează tabelele automat
}

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

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();